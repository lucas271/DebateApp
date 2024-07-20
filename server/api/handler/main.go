package routes_handler

import (
	"net/http"

	"github.com/gorilla/csrf"
	"github.com/gorilla/mux"
	user_handler "github.com/lucas271/DebateApp/api/handler/user"
	"github.com/lucas271/DebateApp/api/middleware"
	jsonparser "github.com/lucas271/DebateApp/pkg/json_parser"
)

type DefaultResp struct {
	Response  any  `json:"response"`
	IsSuccess bool `json:"isSuccess"`
}

// it might be cool to consider creating controllers and modules, but i'm pretty new to GOLANG folder structures so i'm just testing stuff.
func MainHandler(mux *mux.Router, apiCfg middleware.ApiConfig) {
	//get handlers instances

	userInst := &user_handler.User{}
	usersInst := &user_handler.Users{}

	mux.HandleFunc("/getAllUsers", func(w http.ResponseWriter, r *http.Request) {
		usersResp, handlerErr := usersInst.GetAllUsers(r, apiCfg)
		if handlerErr != nil {
			jsonparser.JsonErr(w, usersResp.StatusCode, handlerErr)
			return
		}

		jsonparser.JsonResp(w, usersResp.StatusCode, DefaultResp{
			Response:  usersResp.Data,
			IsSuccess: true,
		})
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
		userResp, handlerErr := userInst.CreateUser(r, apiCfg)

		if handlerErr != nil {
			jsonparser.JsonErr(w, userResp.StatusCode, handlerErr)
			return
		}

		jsonparser.JsonResp(w, userResp.StatusCode, DefaultResp{
			Response:  userResp.Data,
			IsSuccess: true,
		})

	}).Methods("POST")
	mux.HandleFunc("/loginUser", func(w http.ResponseWriter, r *http.Request) {
		userResp, handlerErr := userInst.LoginUser(r, apiCfg)
		if handlerErr != nil {
			jsonparser.JsonErr(w, userResp.StatusCode, handlerErr)
			return
		}

		jsonparser.JsonResp(w, userResp.StatusCode, DefaultResp{
			Response:  userResp.Data,
			IsSuccess: true,
		})
	}).Methods("POST")
}
