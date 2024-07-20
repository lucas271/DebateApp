package generateJwt

import (
	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT() (string, error) {
	token := jwt.New(jwt.SigningMethodEdDSA)
}
