USE boilerplate_db;

INSERT INTO bundles (name, dependency)
VALUES ("html", null)

INSERT INTO bundles (name, dependency)
VALUES ("css", "html");

INSERT INTO bundles (name, dependency)
VALUES ("bootstrap", "css");

INSERT INTO bundles (name, dependency)
VALUES ("js", "html");

INSERT INTO bundles (name, dependency)
VALUES ("jquery", "js");

INSERT INTO bundles (name, dependency)
VALUES ("node", "js");

INSERT INTO bundles (express, dependency)
VALUES ("express", "node");

INSERT INTO bundles (express, dependency)
VALUES ("express-handlebars", "node");