package user_handler

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/lucas271/DebateApp/api/middleware"
	"github.com/lucas271/DebateApp/internal/database"
	validations "github.com/lucas271/DebateApp/pkg/validations"

	"golang.org/x/crypto/bcrypt"
)

// it is better to define it directly than infering from the DB PACKAGE to avoid exposing sensitive data.
type User struct {
	Data       userSentInfo
	StatusCode int
}
type Users struct {
	Data       []userSentInfo
	StatusCode int
}

type userSentInfo struct {
	Email string    `json:"email"`
	Name  string    `json:"name"`
	ID    uuid.UUID `json:"id"`
}

type userParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

func (resp *Users) GetAllUsers(r *http.Request, apiCfg middleware.ApiConfig) (users Users, err []error) {
	queries := r.URL.Query() // this is not going to be used for now, might be used later on for pagination/filtering.
	fmt.Printf("%v", queries)

	queryResp, queryErr := apiCfg.DB.GetAllUsers(r.Context())

	if queryErr != nil {
		return Users{Data: []userSentInfo{}, StatusCode: 500}, []error{errors.New("error fetching users data")}
	}

	for i := 0; i < len(queryResp); i++ {
		// we will not be checking for empty fields RN.
		users.Data = append(users.Data,
			userSentInfo{
				Email: queryResp[i].Email,
				Name:  queryResp[i].Name,
				ID:    queryResp[i].ID,
			})
	}

	return Users{
		Data:       users.Data,
		StatusCode: 200,
	}, nil //explicit declaration just to make things clearer
}

func (resp *User) LoginUser(r *http.Request, apiCfg middleware.ApiConfig) (user User, err []error) {
	userParams := userParams{}

	queryErr := json.NewDecoder(r.Body).Decode(&userParams)

	if queryErr != nil {
		return User{Data: userSentInfo{}, StatusCode: 400}, []error{errors.New("invalid request values")}
	}

	isValidPass := validations.ValidatePassword(userParams.Password)

	if isValidPass != nil {
		return User{Data: userSentInfo{}, StatusCode: 400}, isValidPass
	}
	queryResp, queryErr := apiCfg.DB.GetUser(r.Context(), userParams.Email)

	if queryErr != nil {
		if queryErr == sql.ErrNoRows {
			return User{Data: userSentInfo{}, StatusCode: 400}, []error{errors.New("User does not exist")}
		} // this might benefit from a switch case and more patterned responses for code reusability.
		return User{Data: userSentInfo{}, StatusCode: 400}, []error{errors.New(queryErr.Error())}
	}

	passwordErr := bcrypt.CompareHashAndPassword([]byte(queryResp.Password), []byte(userParams.Password))
	if passwordErr != nil {

		return User{Data: userSentInfo{}, StatusCode: 400}, []error{errors.New("password is not valid")}
	}

	return User{
		Data: userSentInfo{
			Email: queryResp.Email,
			Name:  queryResp.Name,
			ID:    queryResp.ID,
		},
		StatusCode: 200,
	}, nil
}

func (resp *User) CreateUser(r *http.Request, apiCfg middleware.ApiConfig) (user User, err []error) {
	//get info here
	userParams := userParams{}
	JSON_err := json.NewDecoder(r.Body).Decode(&userParams)

	if JSON_err != nil {
		return User{Data: userSentInfo{}, StatusCode: 400}, []error{errors.New("invalid request body")}
	}

	isValidPassword := validations.ValidatePassword(userParams.Password)

	if isValidPassword != nil {
		return User{Data: userSentInfo{}, StatusCode: 400}, isValidPassword
	}

	isUser, queryErr := apiCfg.DB.GetUser(r.Context(), userParams.Email)

	if queryErr != nil {
		if queryErr == sql.ErrNoRows {
			err = nil
		} else {
			return User{Data: userSentInfo{}, StatusCode: 500}, []error{errors.New("sERVER ERROR")}
		}
	}

	if isUser.Email == userParams.Email {
		return User{Data: userSentInfo{}, StatusCode: 400}, []error{errors.New("email already registered")}
	}

	hashedPassword, hashErr := bcrypt.GenerateFromPassword([]byte(userParams.Password), 12)

	if hashErr != nil {
		return User{Data: userSentInfo{}, StatusCode: 500}, []error{errors.New("it was not possible to protect your password, user not created")}
	}

	queryResp, queryErr := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Name:     userParams.Name,
		Email:    userParams.Email,
		Password: string(hashedPassword),
	})
	if queryErr != nil {
		return User{Data: userSentInfo{}, StatusCode: 500}, []error{errors.New("error creating user")}
	}

	return User{
		Data: userSentInfo{
			Email: queryResp.Email,
			Name:  queryResp.Name,
			ID:    queryResp.ID,
		},
		StatusCode: 200,
	}, nil
}
