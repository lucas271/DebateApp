package internalJwt

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(userID string) (string, error) {
	jwtSecret := []byte("enviroment variable")

	expiration := time.Second * time.Duration(3600*24)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID":     userID,
		"expired_at": time.Now().Add(expiration).Unix(),
	})

	tokenStr, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", errors.New("invalid user")
	}

	return tokenStr, nil
}

func ValidateJWT(tokenString string) (*jwt.Token, error) {
	jwtSecret := []byte("enviroment variable")

	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("internal error, unexpected jwt signing method")
		}

		return []byte(jwtSecret), nil
	})
}
