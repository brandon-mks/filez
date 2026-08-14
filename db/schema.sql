-- TODO
DROP TABLE IF EXISTS folders CASCADE;
DROP TABLE IF EXISTS files;

CREATE TABLE folders (
    id SERIAL UNIQUE PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE files (
    id serial PRIMARY KEY,
    name TEXT NOT NULL,
    size INT NOT NULL,
    folder_id INT NOT NULL,
    UNIQUE (name, folder_id),
    FOREIGN KEY (folder_id)
    REFERENCES folders(id)
    ON DELETE CASCADE
);
