CREATE DATABASE boilerplate_db;

USE boilerplate_db;


CREATE TABLE snippets(
	id INTEGER NOT NULL,
	type VARCHAR(50),
	snippet_text TEXT NOT NULL,
	marker TEXT NOT NULL,
	PRIMARY KEY(id)

);
