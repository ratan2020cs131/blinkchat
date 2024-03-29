// import mongoose from "mongoose";
// import dotenv from 'dotenv'
// dotenv.config({path:'./env'})
// const DB_URL = process.env.DB_URL

// mongoose.connect(DB_URL).
//     then(() => {
//         console.log("Database Connected")
//     }).
//     catch((err) => {
//         console.log(err)
//     })

import Postgre from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' })
const { Pool } = Postgre;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;