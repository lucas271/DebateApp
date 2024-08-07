// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: getUser.sql

package database

import (
	"context"
)

const getUser = `-- name: GetUser :one
select id, name, email, password, created_at, updated_at from users where email = $1
`

func (q *Queries) GetUser(ctx context.Context, email string) (User, error) {
	row := q.db.QueryRowContext(ctx, getUser, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Email,
		&i.Password,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}
