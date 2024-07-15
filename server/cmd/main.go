package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	routes_handler "github.com/lucas271/DebateApp/api/handler"
	"github.com/lucas271/DebateApp/api/middleware"
	"github.com/lucas271/DebateApp/internal/database"
)

type ApiConfig struct {
	DB *database.Queries
}

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		println("It was not possible to get enviroment variables, this is the error: ", err.Error())
		return
	}
	apiCfg, err := middleware.ConnectToDB()
	if err != nil {
		return
	}
	router := mux.NewRouter()

	routes_handler.MainHandler(router, apiCfg)
	handler := middleware.MainMiddleware(router)

	if err := http.ListenAndServe(":37650", handler); err != nil {
		fmt.Printf("%s", err.Error())
	}
}
