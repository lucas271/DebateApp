package routes_handler

import (
	"net/http"

	"github.com/gorilla/csrf"
	"github.com/gorilla/mux"
	"github.com/lucas271/DebateApp/api/middleware"
	jsonparser "github.com/lucas271/DebateApp/pkg/json_parser"
)

type DefaultResp struct {
	Response  any  `json:"response"`
	IsSuccess bool `json:"isSuccess"`
}

func MainHandler(mux *mux.Router, apiCfg middleware.ApiConfig) {
	//get
	mux.HandleFunc("/getAllUsers", func(w http.ResponseWriter, r *http.Request) {
		GetAllUsers(w, r, apiCfg)
	}).Methods("GET")

	mux.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("ofdsofkoasdfas", csrf.Token(r))
		jsonparser.JsonResp(w, 200, DefaultResp{
			Response:  csrf.Token(r),
			IsSuccess: true,
		})
	})
	//POST
	mux.HandleFunc("/createUser", func(w http.ResponseWriter, r *http.Request) {
		CreateUser(w, r, apiCfg)
	}).Methods("POST")
	mux.HandleFunc("/loginUser", func(w http.ResponseWriter, r *http.Request) {
		LoginUser(w, r, apiCfg)
	}).Methods("POST")
}
