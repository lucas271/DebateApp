-- +goose Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table vote (
    id UUID primary key DEFAULT uuid_generate_v4(),
    isUp boolean not null,

    voter_id UUID not null,
    reply_id UUID,
    post_id UUID,

    CONSTRAINT fk_writer FOREIGN KEY(voter_id) REFERENCES users(id),
    CONSTRAINT fk_reply FOREIGN KEY(reply_id) REFERENCES post_reply(id),
    CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES post(id),

    CHECK (reply_id IS NOT NULL AND post_id IS NULL OR post_id IS NOT NULL AND reply_id IS NULL),

    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- +goose Down

drop table vote;