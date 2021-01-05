CREATE DATABASE test_db;
\c test_db

CREATE TABLE users(id SERIAL PRIMARY KEY, email TEXT, password_digest TEXT);
