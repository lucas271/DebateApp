package handler

import (
	"net/http"

	"github.com/gorilla/csrf"
	"github.com/gorilla/mux"
	utils "github.com/lucas271/DebateApp/pkg/jsonParser"
)

func main() {
	mux.HandleFunc("/createUser", apiCfg.createUser).Methods("POST")
	mux.HandleFunc("/loginUser", apiCfg.loginUser).Methods("POST")
	mux.HandleFunc("/getAllUsers", apiCfg.getAllUsers).Methods("GET")
	mux.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("ofdsofkoasdfas", csrf.Token(r))
		utils.JsonResp(w, 200, defaultResp{
			Response:  csrf.Token(r),
			IsSuccess: true,
		})
	})
}
