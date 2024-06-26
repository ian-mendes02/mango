import {createPool} from '@vercel/postgres';
import {User} from './index';

const pool = createPool( {connectionString: 'postgres://default:un3FiJIerO2s@ep-purple-violet-a46sw9d9-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'} );

async function tables() {
    await pool.query( `DROP TABLE users;` ).then( async () => {
        await pool.query( `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(32) UNIQUE NOT NULL,
        roles VARCHAR(32) NOT NULL DEFAULT 'employee',
        password VARCHAR(36) NOT NULL
    )`);
    } );
}