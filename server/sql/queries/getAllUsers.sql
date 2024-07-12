-- name: GetAllUsers :many
select name, email, id, created_at, updated_at from users;