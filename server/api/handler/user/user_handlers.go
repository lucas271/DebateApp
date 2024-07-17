package user_handler

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/google/uuid"
	routes_handler "github.com/lucas271/DebateApp/api/handler"
	"github.com/lucas271/DebateApp/api/middleware"
	"github.com/lucas271/DebateApp/internal/database"
	jsonparser "github.com/lucas271/DebateApp/pkg/json_parser"
	validations "github.com/lucas271/DebateApp/pkg/validations"

	"golang.org/x/crypto/bcrypt"
)

type userResp struct {
	Email string    `json:"email"`
	Name  string    `json:"name"`
	ID    uuid.UUID `json:"id"`
}

type userParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

func GetAllUsers(w http.ResponseWriter, r *http.Request, apiCfg middleware.ApiConfig) {
	queries := r.URL.Query()
	fmt.Printf("%v", queries)

	queryResp, _ := apiCfg.DB.GetAllUsers(r.Context())

	jsonparser.JsonResp(w, 200, routes_handler.DefaultResp{
		Response:  queryResp,
		IsSuccess: true,
	})
}

func LoginUser(w http.ResponseWriter, r *http.Request, apiCfg middleware.ApiConfig) {
	user := userParams{}

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		jsonparser.JsonErr(w, 400, []error{errors.New("invalid request")})
		return
	}

	isValidPass := validations.ValidatePassword(user.Password)

	if isValidPass != nil {
		jsonparser.JsonErr(w, 400, isValidPass)
		return
	}
	queryResp, err := apiCfg.DB.GetUser(r.Context(), user.Email)

	if err != nil {
		jsonparser.JsonErr(w, 400, []error{errors.New(err.Error())})
		return
	}

	passwordErr := bcrypt.CompareHashAndPassword([]byte(queryResp.Password), []byte(user.Password))
	if passwordErr != nil {
		jsonparser.JsonErr(w, 400, []error{errors.New("password is not valid")})
		return
	}

	jsonparser.JsonResp(w, 200, routes_handler.DefaultResp{
		Response: userResp{
			Email: queryResp.Email,
			Name:  queryResp.Name,
			ID:    queryResp.ID,
		},
		IsSuccess: true,
	})
}

func CreateUser(w http.ResponseWriter, r *http.Request, apiCfg middleware.ApiConfig) {
	//get info here
	user := userParams{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		jsonparser.JsonErr(w, 400, []error{errors.New("invalid request body")})
		return
	}

	isValidPassword := validations.ValidatePassword(user.Password)

	if isValidPassword != nil {
		jsonparser.JsonErr(w, 400, isValidPassword)
		return
	}

	isUser, err := apiCfg.DB.GetUser(r.Context(), user.Email)

	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
		} else {
			jsonparser.JsonErr(w, 400, []error{errors.New("could not check user")})
			return
		}
	}

	if isUser.Email == user.Email {
		jsonparser.JsonErr(w, 400, []error{errors.New("email already registered")})
		return
	}

	hashedPassword, hashErr := bcrypt.GenerateFromPassword([]byte(user.Password), 12)

	if hashErr != nil {
		jsonparser.JsonErr(w, 500, []error{errors.New("it was not possible to protect your password")})
		return
	}

	queryResp, err := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Name:     user.Name,
		Email:    user.Email,
		Password: string(hashedPassword),
	})
	if err != nil {

		println(err.Error())
		jsonparser.JsonErr(w, 500, []error{errors.New("error creating user")})
		return
	}

	jsonparser.JsonResp(w, 200, routes_handler.DefaultResp{
		Response: userResp{
			Email: queryResp.Email,
			Name:  queryResp.Name,
			ID:    queryResp.ID,
		},
		IsSuccess: true,
	})
}
