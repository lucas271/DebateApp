package middleware

import (
	"errors"
	"net/http"

	jsonparser "github.com/lucas271/DebateApp/pkg/json_parser"
	internalJwt "github.com/lucas271/DebateApp/pkg/jwt"
)

func WithJWTauth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString, err := readJWTHeader(r)

		if tokenString == "" || err != nil {
			invalidJWT(w)
			return
		}

		token, err := internalJwt.ValidateJWT(tokenString)

		if err != nil || !token.Valid {
			invalidJWT(w)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func WithOutJWTauth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authErr, _ := readJWTHeader(r)

		if authErr != "" {
			jsonparser.JsonErr(w, 400, []error{errors.New("bad request: You can not be an authenticated user to do this")})
			return
		}

		next.ServeHTTP(w, r)
	})
}

func invalidJWT(w http.ResponseWriter) {
	jsonparser.JsonErr(w, 400, []error{errors.New("bad request: PERMISION DENIED")})
}

func readJWTHeader(r *http.Request) (string, error) {
	jwtToken := r.Header.Get("Authorization_jwt")

	if jwtToken == "" {
		return "", errors.New("could not get authorization token")
	}

	return jwtToken, nil
}
