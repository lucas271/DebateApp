package utils

import (
	"encoding/json"
	"net/http"
)

func JsonResp(w http.ResponseWriter, statusCode int, payload interface{}) {

	dat, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("Error converting data to JSON."))
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	w.Write(dat)
}

func JsonErr(w http.ResponseWriter, statusCode int, errMsg []error) {

	type errResponse struct {
		Error []string `json:"errors"`
	}

	stringErrs := errorsToString(errMsg)
	JsonResp(w, statusCode, errResponse{
		Error: stringErrs,
	})
}

func errorsToString(errorsToConvert []error) []string {
	stringErrors := []string{}

	for _, error := range errorsToConvert {
		stringErrors = append(stringErrors, error.Error())
	}

	return stringErrors
}
