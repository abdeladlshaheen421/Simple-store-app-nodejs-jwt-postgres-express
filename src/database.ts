import dotenv from 'dotenv'
import {Pool} from 'pg'
dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    ENV
} = process.env

  ENV === 'dev'
    ? new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
      })
    : new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
      })
const  client:Pool = 
      ENV === 'dev'?
         new Pool({
            host: POSTGRES_HOST,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
            database: POSTGRES_DB
        })
        : 
            new Pool({
            host: POSTGRES_HOST,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
            database: POSTGRES_TEST_DB
        })

export default client