package middleware

import "github.com/rs/cors"

func MainMiddleware() {
	//AUTH RULES
	corsRules := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173",
		},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Content-Type", "X-CSRF-Token"},
	})
	handler := corsRules.Handler(mux)
	//ROUTES
	apiCfg, err := connectToDB()
	if err != nil {
		return
	}

}
