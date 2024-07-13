-- name: CreatePost :one
insert into post(title, content, writer_id)VALUES($1, $2, $3) RETURNING *;