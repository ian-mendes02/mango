"use server";
import { sql, createPool } from "@vercel/postgres";

//const pool = createPool({connectionString: process.env.POSTGRES_URL});

var tables = `
    CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL,
        title VARCHAR(64),
        price VARCHAR(8),
        description TEXT,
        categories VARCHAR(64),
        options TEXT
    );
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL,
        name VARCHAR(32),
        role VARCHAR(16),
        password VARCHAR(32)
    )
`;

async function create_tables () {
    await pool.sql`${tables}`;
}

//create_tables();

console.log(process.env.POSTGRES_URL);