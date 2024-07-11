const {createPool} = require( '@vercel/postgres' );
const menu = require( '../json/cardapio.json' );
const menu_reduced = require( '../json/cardapio_reduzido.json' );

const pool = createPool( {connectionString: 'postgres://default:un3FiJIerO2s@ep-purple-violet-a46sw9d9-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'} );

async function createTables() {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(32) UNIQUE NOT NULL,
            slug VARCHAR(32) UNIQUE NOT NULL,
            email VARCHAR(64) UNIQUE NOT NULL,
            role VARCHAR(32) NOT NULL DEFAULT 'employee',
            password VARCHAR(36) NOT NULL
        )`
    );
    /* await pool.query(
        `CREATE TABLE menu_items (
            id SERIAL PRIMARY KEY,
            title VARCHAR(72) NOT NULL,
            price NUMERIC(5,2) NULL DEFAULT NULL,
            description TEXT NULL DEFAULT NULL,
            categories VARCHAR(28) NOT NULL,
            options TEXT NULL DEFAULT NULL,
            showinreduced BOOLEAN NOT NULL DEFAULT TRUE
        )`
    ); */
}

async function resetMenus() {
    await pool.query( 'DROP TABLE users' );
    await createTables();
    /* for ( let {title, price, description, options, category} of menu ) {
        var showinreduced = category.includes( 'drinks' ) || menu_reduced.filter( o => o.title == title ).length > 0;
        var item_price = price !== '' ? parseFloat( price.replace( ',', '.' ) ) : null;
        try {
            await pool.query( 'INSERT INTO menu_items ( title, price, description, categories, options, showinreduced ) VALUES ($1, $2, $3, $4, $5, $6);',
                [title, item_price, description, category, options, showinreduced]
            );
        } catch ( err ) {
            console.log( err );
        }
    } */
}
