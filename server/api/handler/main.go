package routes_handler

import (
	"fmt"
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

	// subroutes
	noAuthSubroute := mux.NewRoute().Subrouter()
	authSubroute := mux.NewRoute().Subrouter()

	authSubroute.Use(middleware.WithJWTauth)
	noAuthSubroute.Use(middleware.WithOutJWTauth)

	noAuthRoutes(noAuthSubroute, userInst, &apiCfg)
}
func authRoutes(authSubroute *mux.Router, userInst *user_handler.User, apiCfg *middleware.ApiConfig) {

}

func noAuthRoutes(noAuthSubroute *mux.Router, userInst *user_handler.User, apiCfg *middleware.ApiConfig) {
	noAuthSubroute.HandleFunc("/createUser", func(w http.ResponseWriter, r *http.Request) {
		userResp, handlerErr := userInst.CreateUser(r, *apiCfg)

		if handlerErr != nil {
			jsonparser.JsonErr(w, userResp.StatusCode, handlerErr)
			return
		}

		jsonparser.JsonResp(w, userResp.StatusCode, DefaultResp{
			Response:  userResp.Data,
			IsSuccess: true,
		})

	}).Methods("POST")
	noAuthSubroute.HandleFunc("/loginUser", func(w http.ResponseWriter, r *http.Request) {
		userResp, handlerErr := userInst.LoginUser(r, *apiCfg)
		if handlerErr != nil {
			jsonparser.JsonErr(w, userResp.StatusCode, handlerErr)
			return
		}
		fmt.Printf("%v", userResp.Headers)

		w.Header().Add("JWTtoken", userResp.Headers)
		jsonparser.JsonResp(w, userResp.StatusCode, DefaultResp{
			Response:  userResp.Data,
			IsSuccess: true,
		})
	}).Methods("POST")
}
