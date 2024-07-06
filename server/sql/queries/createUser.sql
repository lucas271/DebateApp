-- name: CreateUser :one
INSERT INTO users(name, email, password)values($1, $2, $3) RETURNING *;

