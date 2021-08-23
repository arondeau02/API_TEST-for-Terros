# API_TEST

internship test

## Download

Postgres.APP server -> https://www.postgresql.org/download/

AdonisJS FrameWork -> https://docs.adonisjs.com/guides/installation

Postman to test API routes -> https://www.postman.com/downloads/canary/


## Install

Create one db.

Inside this db create two tables one for local development and one for test.

Go inside the repo:

1. Create and edit `.env` and `.env.testing` file with the db credential, Look at the variables that start with `PG_`. You can take example from the `.env.example` file.

2. `yarn` -> To install project.

3. `node ace migration:run` -> To create table in DB.

4. `node ace db:seed` -> to seed DB with users.

5. `yarn dev` -> To start API.

6. `yarn tests` -> To ensure project work.
