CREATE DATABASE boilerplate_db;

USE boilerplate_db;

CREATE TABLE snippets(
	id INTEGER NOT NULL,
	type VARCHAR(50),
	BundleId INTEGER NOT NULL,
	snippet_text TEXT NOT NULL,
	directory_path TEXT NOT NULL,
	file_name TEXT NOT NULL,
	marker TEXT NOT NULL,
	PRIMARY KEY(id),
    FOREIGN KEY(BundleId) references bundles(id)
);

SELECT * FROM bundles;
