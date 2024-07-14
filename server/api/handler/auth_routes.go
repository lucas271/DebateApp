package handler

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/lucas271/DebateApp/internal/database"
	utils "github.com/lucas271/DebateApp/pkg/jsonParser"
	"golang.org/x/crypto/bcrypt"
)

func (apiCfg *apiConfig) loginUser(w http.ResponseWriter, r *http.Request) {
	user := userParams{}

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		utils.JsonErr(w, 400, []error{errors.New("invalid request")})
		return
	}

	isValidPass := validatePassword(user.Password)

	if isValidPass != nil {
		utils.JsonErr(w, 400, isValidPass)
		return
	}
	queryResp, err := apiCfg.DB.GetUser(r.Context(), user.Email)

	if err != nil {
		utils.JsonErr(w, 400, []error{errors.New(err.Error())})
		return
	}

	passwordErr := bcrypt.CompareHashAndPassword([]byte(queryResp.Password), []byte(user.Password))
	if passwordErr != nil {
		utils.JsonErr(w, 400, []error{errors.New("password is not valid")})
		return
	}

	utils.JsonResp(w, 200, defaultResp{
		Response: userResp{
			Email: queryResp.Email,
			Name:  queryResp.Name,
			ID:    queryResp.ID,
		},
		IsSuccess: true,
	})
}

func (apiCfg *apiConfig) createUser(w http.ResponseWriter, r *http.Request) {
	//get info here
	user := userParams{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		utils.JsonErr(w, 400, []error{errors.New("invalid request body")})
		return
	}

	isValidPassword := validatePassword(user.Password)

	if isValidPassword != nil {
		utils.JsonErr(w, 400, isValidPassword)
		return
	}

	isUser, err := apiCfg.DB.GetUser(r.Context(), user.Email)

	if err != nil {
		if err == sql.ErrNoRows {
			err = nil
		} else {
			utils.JsonErr(w, 400, []error{errors.New("could not check user")})
			return
		}
	}

	if isUser.Email == user.Email {
		utils.JsonErr(w, 400, []error{errors.New("email already registered")})
		return
	}

	hashedPassword, hashErr := bcrypt.GenerateFromPassword([]byte(user.Password), 12)

	if hashErr != nil {
		utils.JsonErr(w, 500, []error{errors.New("it was not possible to protect your password")})
		return
	}

	queryResp, err := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Name:     user.Name,
		Email:    user.Email,
		Password: string(hashedPassword),
	})
	if err != nil {

		println(err.Error())
		utils.JsonErr(w, 500, []error{errors.New("error creating user")})
		return
	}

	utils.JsonResp(w, 200, defaultResp{
		Response: userResp{
			Email: queryResp.Email,
			Name:  queryResp.Name,
			ID:    queryResp.ID,
		},
		IsSuccess: true,
	})
}
