package middleware

import (
	"database/sql"
	"errors"
	"os"

	"github.com/lucas271/DebateApp/internal/database"
)

type ApiConfig struct {
	DB *database.Queries
}

func ConnectToDB() (apiCfg ApiConfig, err error) {

	DBUrl := os.Getenv("DB_URL")
	if DBUrl == "" {
		return ApiConfig{}, errors.New("empty database URL")
	}

	conn, err := sql.Open("postgres", os.Getenv("DB_URL"))

	if err != nil {
		return ApiConfig{}, errors.New(err.Error())
	}

	queries := database.New(conn)

	apiCfg = ApiConfig{
		DB: queries,
	}

	return apiCfg, err
}
