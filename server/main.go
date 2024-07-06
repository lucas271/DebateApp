package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"regexp"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/lucas271/DebateApp/internal/database"
	"github.com/lucas271/DebateApp/utils"
	"github.com/rs/cors"
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
}

func main() {
	//load dotenv
	err := godotenv.Load(".env")

	if err != nil {
		println("It was not possible to get enviroment variables, this is the error: ", err.Error())
		return
	}

	apiCfg, err := connectToDB()
	mux := http.NewServeMux()

	if err != nil {
		fmt.Println(err.Error())
		return
	}
	mux.HandleFunc("POST /createUser", apiCfg.createUser)
	mux.HandleFunc("POST /loginUser", apiCfg.loginUser)
	mux.HandleFunc("GET /test", apiCfg.test)

	corsRules := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173",
		},
		AllowCredentials: true,
	})

	handler := corsRules.Handler(mux)

	if err := http.ListenAndServe(":37650", handler); err != nil {
		fmt.Printf("%s", err.Error())
	}
}

func connectToDB() (apiCfg apiConfig, err error) {

	DBUrl := os.Getenv("DB_URL")
	if DBUrl == "" {
		return apiConfig{}, errors.New("empty database URL")
	}

	conn, err := sql.Open("postgres", os.Getenv("DB_URL"))

	if err != nil {
		return apiConfig{}, errors.New(err.Error())
	}

	println(conn)
	queries := database.New(conn)

	apiCfg = apiConfig{
		DB: queries,
	}

	return apiCfg, err
}
func (apiCfg *apiConfig) test(w http.ResponseWriter, r *http.Request) {
	utils.JsonResp(w, 200, defaultResp{
		response:  "it worked",
		isSuccess: true,
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
		utils.JsonErr(w, 400, []error{errors.New("could not check user")})
		return
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

	queryResp := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		Name:     user.Name,
		Email:    user.Email,
		Password: string(hashedPassword),
	})
	if queryResp != nil {

		println(queryResp.Error())
		utils.JsonErr(w, 500, []error{errors.New("error creating user")})
		return
	}
	createdUser, err := apiCfg.DB.GetUser(r.Context(), user.Email)
	if err != nil {
		utils.JsonErr(w, 500, []error{errors.New("user Was created but we were unable to get its info")})
		return
	}

	utils.JsonResp(w, 200, defaultResp{
		response: userResp{
			email: createdUser.Email,
			name:  createdUser.Name,
		},
		isSuccess: true,
	})
}

func validatePassword(password string) (passwordErrs []error) {
	if password == "" {
		passwordErrs = append(passwordErrs, errors.New("password must not be empty"))
		return passwordErrs
	}
	if len(password) < 6 {
		passwordErrs = append(passwordErrs, errors.New("password must have at least 6 characters"))
		return passwordErrs
	} else if len(password) > 120 {
		passwordErrs = append(passwordErrs, errors.New("password must have at maximum 120 characters"))
		return passwordErrs
	}

	containsSpecialChars := regexp.MustCompile("[^a-zA-Z0-9]").MatchString(password)
	containsUpperCase := regexp.MustCompile("[A-Z]").MatchString(password)
	containsLowerCase := regexp.MustCompile("[a-z]").MatchString(password)
	containsNumber := regexp.MustCompile("[0-9]+").MatchString(password)

	if !containsNumber {
		passwordErrs = append(passwordErrs, errors.New("password must have a number character"))
	}
	if !containsLowerCase {
		passwordErrs = append(passwordErrs, errors.New("password must have a lowercase character"))
	}
	if !containsUpperCase {
		passwordErrs = append(passwordErrs, errors.New("password must have a uppercase character"))
	}
	if !containsSpecialChars {
		passwordErrs = append(passwordErrs, errors.New("password must have a special character"))
	}
	if !containsLowerCase || !containsSpecialChars || !containsUpperCase || !containsNumber {
		return passwordErrs
	}

	return nil
}

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
		response: userResp{
			email: queryResp.Email,
			name:  queryResp.Name,
		},
		isSuccess: true,
	})
}
