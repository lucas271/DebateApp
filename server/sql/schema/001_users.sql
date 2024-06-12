-- +goose Up
create table users(
    id varchar(200) primary key default(uuid()),
    name varchar(60) not null,
    email varchar(120) not null,
    password varchar(60) not null,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- +goose Down

drop table users;