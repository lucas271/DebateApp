package middleware

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func MainMiddleware(mux *mux.Router) (handler http.Handler) {
	//AUTH RULES
	corsRules := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173",
		},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Content-Type", "X-CSRF-Token"},
	})

	handler = corsRules.Handler(mux)

	return handler
}

func MainWAuth(mux *mux.Router) {
	mux.Use(WithJWTauth)
}

func MainWOutAuth(mux *mux.Router) {
	mux.Use(WithOutJWTauth)
}
