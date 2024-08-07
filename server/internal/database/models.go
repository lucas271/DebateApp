// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package database

import (
	"database/sql"
	"database/sql/driver"
	"fmt"
	"time"

	"github.com/google/uuid"
)

type PostTypes string

const (
	PostTypesVanilla PostTypes = "vanilla"
	PostTypesPool    PostTypes = "pool"
)

func (e *PostTypes) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = PostTypes(s)
	case string:
		*e = PostTypes(s)
	default:
		return fmt.Errorf("unsupported scan type for PostTypes: %T", src)
	}
	return nil
}

type NullPostTypes struct {
	PostTypes PostTypes
	Valid     bool // Valid is true if PostTypes is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullPostTypes) Scan(value interface{}) error {
	if value == nil {
		ns.PostTypes, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.PostTypes.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullPostTypes) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.PostTypes), nil
}

type Post struct {
	ID        uuid.UUID
	Title     string
	Content   sql.NullString
	PostType  NullPostTypes
	WriterID  uuid.UUID
	CreatedAt time.Time
	UpdatedAt time.Time
}

type PostReply struct {
	ID        uuid.UUID
	Content   string
	WriterID  uuid.UUID
	ReplyID   uuid.NullUUID
	PostID    uuid.UUID
	CreatedAt time.Time
	UpdatedAt time.Time
}

type User struct {
	ID        uuid.UUID
	Name      string
	Email     string
	Password  string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Vote struct {
	ID        uuid.UUID
	Isup      bool
	VoterID   uuid.UUID
	ReplyID   uuid.NullUUID
	PostID    uuid.NullUUID
	CreatedAt time.Time
	UpdatedAt time.Time
}
