#Storefront Backend Project
-------------------------------------------

## DataBase 

* open teraminal and enter psql command line `sudo -u postgres psql`

* create user with name `node` password `node`

* create database for developing `CREATE DATABASE store;`

* create database for testing `CREAtE DATABASE store_test;`

* then run `db-migrate up`
------------------------------------------------------
* config your .env with following :
- PORT = 3000
- POSTGRES_HOST = 127.0.0.1
- POSTGRES_USER =### here you can write your postgres user
- POSTGRES_PASSWORD =### here too write your postgres password
- POSTGRES_DB = store
- ENV = dev
- POSTGRES_TEST_DB = store_test
- BCRYPT_PASSWORD =### here you can write you joined string to encrypt
- SECRET_KEY =### here you can writer your secret key
- SALT_ROUNDS = 10
--- 
## Server

- The server will listen on port 3000 if Port existed in `.env` else will listen in port 8080

- To run server successfully

** first run `npm i` to install all required packages

** run server `npm s`

---
## For testing 
- run `npm run test`
npm `npm run test` will run `npm run build && jasmine`
- you can build with `npm run build`

---## Scripts

* install `npm install`
* watch `npm run watch`
* test `npm run test`
* make migration up `db-migrate up`
* make migration down `db-migrate down`
* run server `npm start`
* run jasmine `npm run jasmine`