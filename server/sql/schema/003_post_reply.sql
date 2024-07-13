-- +goose Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table post_reply(
    id UUID primary key DEFAULT uuid_generate_v4(),
    content varchar(3500) not null,

    writer_id UUID not null,
    reply_id UUID,
    post_id UUID not null,

    CONSTRAINT fk_reply FOREIGN KEY(reply_id) REFERENCES post_reply(id),
    CONSTRAINT fk_writer FOREIGN KEY(writer_id) REFERENCES users(id),
    CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES post(id),

    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- +goose Down

drop table post_reply;