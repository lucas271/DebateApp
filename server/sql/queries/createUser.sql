-- name: CreateUser :exec
INSERT INTO users(name, email, password)values($1, $2, $3);

