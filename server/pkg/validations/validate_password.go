package validations

import (
	"errors"
	"regexp"
)

func ValidatePassword(password string) (passwordErrs []error) {
	if password == "" {
		passwordErrs = append(passwordErrs, errors.New("password must not be empty"))
		return passwordErrs
	}
	if len(password) < 6 {
		passwordErrs = append(passwordErrs, errors.New("password must have at least 6 characters"))
		return passwordErrs
	} else if len(password) > 120 {
		passwordErrs = append(passwordErrs, errors.New("password must have at maximum 120 characters"))
		return passwordErrs
	}

	containsSpecialChars := regexp.MustCompile("[^a-zA-Z0-9]").MatchString(password)
	containsUpperCase := regexp.MustCompile("[A-Z]").MatchString(password)
	containsLowerCase := regexp.MustCompile("[a-z]").MatchString(password)
	containsNumber := regexp.MustCompile("[0-9]+").MatchString(password)

	if !containsNumber {
		passwordErrs = append(passwordErrs, errors.New("password must have a number character"))
	}
	if !containsLowerCase {
		passwordErrs = append(passwordErrs, errors.New("password must have a lowercase character"))
	}
	if !containsUpperCase {
		passwordErrs = append(passwordErrs, errors.New("password must have a uppercase character"))
	}
	if !containsSpecialChars {
		passwordErrs = append(passwordErrs, errors.New("password must have a special character"))
	}
	if !containsLowerCase || !containsSpecialChars || !containsUpperCase || !containsNumber {
		return passwordErrs
	}

	return nil
}
