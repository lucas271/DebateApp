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
)

type apiConfig struct {
	DB *database.Queries
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
	http.HandleFunc("POST /testing", apiCfg.addUser)

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

	return
}

func (apiCfg *apiConfig) addUser(w http.ResponseWriter, r *http.Request) {
	//get info here

	type userParams struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}

	user := userParams{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		utils.JsonErr(w, 400, "invalid request body")
	}
	fmt.Printf("user %s", user.Email)

	queryResp := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Name:     user.Name,
		Email:    user.Email,
		Password: user.Password,
	})

	if queryResp != nil {

		println(queryResp.Error())
		utils.JsonErr(w, 500, "Error creating user")
	}

}
