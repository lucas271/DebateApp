-- name: GetUser :one
select * from users where email = ?