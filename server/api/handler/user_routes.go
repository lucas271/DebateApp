package handler

import (
	"fmt"
	"net/http"

	utils "github.com/lucas271/DebateApp/pkg/jsonParser"
)

func (apiCfg *apiConfig) getAllUsers(w http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()
	fmt.Printf("%v", queries)

	queryResp, _ := apiCfg.DB.GetAllUsers(r.Context())

	utils.JsonResp(w, 200, defaultResp{
		Response:  queryResp,
		IsSuccess: true,
	})
}

func (apiCfg *apiConfig) validateUserTokens(w http.ResponseWriter, r *http.Request) {

}