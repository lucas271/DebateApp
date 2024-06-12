package utils

import (
	"encoding/json"
	"net/http"
)

func JsonResp(w http.ResponseWriter, statusCode int, payload interface{}) {
	dat, err := json.Marshal(payload)

	if err != nil {
		w.WriteHeader(500)
		return
	}

	w.Header().Add("Content-Type", "application/json")

	w.WriteHeader(statusCode)
	w.Write(dat)
}

func JsonErr(w http.ResponseWriter, statusCode int, errMsg string) {

	println("Doasdoaskd")

	type errResponse struct {
		Error string `json:"error"`
	}
	JsonResp(w, statusCode, errResponse{
		Error: errMsg,
	})
}
