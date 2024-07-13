-- +goose Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TYPE IF EXISTS POST_TYPES;
CREATE TYPE POST_TYPES AS ENUM ('vanilla', 'pool');

CREATE TABLE post (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(1000) NOT NULL,
  content VARCHAR(3500),


  post_type POST_TYPES,
  writer_id UUID NOT NULL,
  
  CONSTRAINT fk_writer FOREIGN KEY (writer_id) REFERENCES users(id),

  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);


-- +goose Down
drop table post;
drop type POST_TYPES