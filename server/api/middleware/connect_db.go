package middleware

import (
	"database/sql"
	"errors"
	"os"

	"github.com/lucas271/DebateApp/internal/database"
)

func ConnectToDB() (apiCfg apiConfig, err error) {

	DBUrl := os.Getenv("DB_URL")
	if DBUrl == "" {
		return apiConfig{}, errors.New("empty database URL")
	}

	conn, err := sql.Open("postgres", os.Getenv("DB_URL"))

	if err != nil {
		return apiConfig{}, errors.New(err.Error())
	}

	queries := database.New(conn)

	apiCfg = apiConfig{
		DB: queries,
	}

	return apiCfg, err
}
