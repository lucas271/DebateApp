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

type UserResp struct {
	data       userSentInfo
	statusCode int
}
type UsersResp struct {
	data       []userSentInfo
	statusCode int
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

func (resp *UserResp) GetAllUsers(r *http.Request, apiCfg middleware.ApiConfig) (users UsersResp, err []error) {
	queries := r.URL.Query() // this is not going to be used for now, might be used later on for pagination/filtering.
	fmt.Printf("%v", queries)

	queryResp, queryErr := apiCfg.DB.GetAllUsers(r.Context())

	if queryErr != nil {
		return UsersResp{data: []userSentInfo{}, statusCode: 500}, []error{errors.New("error fetching users data")}
	}

	for i := 0; i < len(queryResp); i++ {
		// we will not be checking for empty fields RN.
		users.data = append(users.data,
			userSentInfo{
				Email: queryResp[i].Email,
				Name:  queryResp[i].Name,
				ID:    queryResp[i].ID,
			})
	}

	return UsersResp{
		data:       users.data,
		statusCode: 200,
	}, nil //explicit declaration just to make things clearer
}

func (resp *UserResp) LoginUser(r *http.Request, apiCfg middleware.ApiConfig) (users UserResp, err []error) {
	user := userParams{}

	queryErr := json.NewDecoder(r.Body).Decode(&user)

	if queryErr != nil {
		return UserResp{data: userSentInfo{}, statusCode: 400}, []error{errors.New("invalid request values")}
	}

	isValidPass := validations.ValidatePassword(user.Password)

	if isValidPass != nil {
		return UserResp{data: userSentInfo{}, statusCode: 400}, isValidPass
	}
	queryResp, queryErr := apiCfg.DB.GetUser(r.Context(), user.Email)

	if queryErr != nil {
		return UserResp{data: userSentInfo{}, statusCode: 400}, []error{errors.New(queryErr.Error())}
	}

	passwordErr := bcrypt.CompareHashAndPassword([]byte(queryResp.Password), []byte(user.Password))
	if passwordErr != nil {

		return UserResp{data: userSentInfo{}, statusCode: 400}, []error{errors.New("password is not valid")}
	}

	return UserResp{
		data: userSentInfo{
			Email: queryResp.Email,
			Name:  queryResp.Name,
			ID:    queryResp.ID,
		},
		statusCode: 200,
	}, nil
}

func (resp *UserResp) CreateUser(r *http.Request, apiCfg middleware.ApiConfig) (users UserResp, err []error) {
	//get info here
	user := userParams{}
	JSON_err := json.NewDecoder(r.Body).Decode(&user)

	if JSON_err != nil {
		return UserResp{data: userSentInfo{}, statusCode: 400}, []error{errors.New("invalid request body")}
	}

	isValidPassword := validations.ValidatePassword(user.Password)

	if isValidPassword != nil {
		return UserResp{data: userSentInfo{}, statusCode: 400}, isValidPassword
	}

	isUser, queryErr := apiCfg.DB.GetUser(r.Context(), user.Email)

	if queryErr != nil {
		if queryErr == sql.ErrNoRows {
			err = nil
		} else {
			return UserResp{data: userSentInfo{}, statusCode: 500}, []error{errors.New("sERVER ERROR")}
		}
	}

	if isUser.Email == user.Email {
		return UserResp{data: userSentInfo{}, statusCode: 400}, []error{errors.New("email already registered")}
	}

	hashedPassword, hashErr := bcrypt.GenerateFromPassword([]byte(user.Password), 12)

	if hashErr != nil {
		return UserResp{data: userSentInfo{}, statusCode: 500}, []error{errors.New("it was not possible to protect your password, user not created")}
	}

	queryResp, queryErr := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Name:     user.Name,
		Email:    user.Email,
		Password: string(hashedPassword),
	})
	if queryErr != nil {
		return UserResp{data: userSentInfo{}, statusCode: 500}, []error{errors.New("error creating user")}
	}

	return UserResp{
		data: userSentInfo{
			Email: queryResp.Email,
			Name:  queryResp.Name,
			ID:    queryResp.ID,
		},
	}, nil
}
