-- +goose Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table users(
    id UUID primary key DEFAULT uuid_generate_v4(),
    name varchar(60) not null UNIQUE,
    email varchar(120) not null UNIQUE,
    password varchar(60) not null,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- +goose Down

drop table users;