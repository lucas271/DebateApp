-- name: CreateUser :exec
INSERT INTO users(name, email, password)values(?, ?, ?);

