package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/lucas271/DebateApp/internal/database"
	"github.com/lucas271/DebateApp/utils"
	"golang.org/x/crypto/bcrypt"
)

type apiConfig struct {
	DB *database.Queries
}

type userParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

type defaultResp struct {
	response  any
	isSuccess bool
}

type userResp struct {
	email string
	name  string
	id    string
}

func main() {
	//load dotenv
	err := godotenv.Load(".env")

	if err != nil {
		println("It was not possible to get enviroment variables, this is the error: ", err.Error())
		return
	}

	apiCfg, err := connectToDB()

	if err != nil {
		fmt.Println(err.Error())
		return
	}
	http.HandleFunc("POST /createUser", apiCfg.createUser)
	http.HandleFunc("POST /loginUser", apiCfg.loginUser)

	if err := http.ListenAndServe(":37650", nil); err != nil {
		fmt.Println(err.Error())
	}
}

func connectToDB() (apiCfg apiConfig, err error) {

	DBUrl := os.Getenv("DB_URL")
	if DBUrl == "" {
		return apiConfig{}, errors.New("empty database URL")
	}

	conn, err := sql.Open("mysql", os.Getenv("DB_URL"))

	if err != nil {
		return apiConfig{}, errors.New(err.Error())
	}

	queries := database.New(conn)

	apiCfg = apiConfig{
		DB: queries,
	}

	return apiCfg, err
}

func (apiCfg *apiConfig) createUser(w http.ResponseWriter, r *http.Request) {
	//get info here

	user := userParams{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		utils.JsonErr(w, 400, "invalid request body")
	}

	hashedPassword, hashErr := bcrypt.GenerateFromPassword([]byte(user.Password), 12)

	if hashErr != nil {
		utils.JsonErr(w, 400, "invalid password")
	}

	queryResp := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Name:     user.Name,
		Email:    user.Email,
		Password: string(hashedPassword),
	})
	if queryResp != nil {

		println(queryResp.Error())
		utils.JsonErr(w, 500, "Error creating user")
	}
	createdUser, err := apiCfg.DB.GetUser(r.Context(), user.Email)
	if err != nil {
		utils.JsonErr(w, 500, "User Was created but we were unable to get its info")
	}

	utils.JsonResp(w, 200, defaultResp{
		response: userResp{
			email: createdUser.Email,
			name:  createdUser.Name,
			id:    createdUser.ID,
		},
		isSuccess: true,
	})
}

func (apiCfg *apiConfig) loginUser(w http.ResponseWriter, r *http.Request) {
	user := userParams{}

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		utils.JsonErr(w, 400, "invalid request")
	}

	queryResp, err := apiCfg.DB.GetUser(r.Context(), user.Email)

	if err != nil {
		println(queryResp.Password)
		println(err.Error())
		utils.JsonErr(w, 400, err.Error())
	}

	passwordErr := bcrypt.CompareHashAndPassword([]byte(queryResp.Password), []byte(user.Password))
	if passwordErr != nil {
		utils.JsonErr(w, 400, "Password is not valid")
	}

	utils.JsonResp(w, 200, defaultResp{
		response: userResp{
			email: queryResp.Email,
			name:  queryResp.Name,
			id:    queryResp.ID,
		},
		isSuccess: true,
	})
}
