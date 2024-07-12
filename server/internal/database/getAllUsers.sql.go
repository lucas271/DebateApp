// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: getAllUsers.sql

package database

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const getAllUsers = `-- name: GetAllUsers :many
select name, email, id, created_at, updated_at from users
`

type GetAllUsersRow struct {
	Name      string
	Email     string
	ID        uuid.UUID
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (q *Queries) GetAllUsers(ctx context.Context) ([]GetAllUsersRow, error) {
	rows, err := q.db.QueryContext(ctx, getAllUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetAllUsersRow
	for rows.Next() {
		var i GetAllUsersRow
		if err := rows.Scan(
			&i.Name,
			&i.Email,
			&i.ID,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
