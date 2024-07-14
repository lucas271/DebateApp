package main

import (
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/lucas271/DebateApp/internal/database"
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
	Response  any  `json:"response"`
	IsSuccess bool `json:"isSuccess"`
}

type userResp struct {
	Email string    `json:"email"`
	Name  string    `json:"name"`
	ID    uuid.UUID `json:"id"`
}

func Main() {
	err := godotenv.Load(".env")

	if err != nil {
		println("It was not possible to get enviroment variables, this is the error: ", err.Error())
		return
	}

	if err := http.ListenAndServe(":37650", handler); err != nil {
		fmt.Printf("%s", err.Error())
	}
}
