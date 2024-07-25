/* eslint-disable */
let {createPool} = require( '@vercel/postgres' )
    , fs = require( 'fs' )
    , pool = createPool( {connectionString: 'postgres://default:un3FiJIerO2s@ep-purple-violet-a46sw9d9-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'} )
    , menu = {
        default: require( './json/cardapio.json' ),
        reduced: require( './json/cardapio_reduzido.json' ),
        backup: '/var/www/html/projects/mango/src/modules/json/cardapio_backup.json'
    }
    , tables = {
        users: `CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(32) UNIQUE NOT NULL,
            slug VARCHAR(32) UNIQUE NOT NULL,
            email VARCHAR(64) UNIQUE NOT NULL,
            role VARCHAR(32) NOT NULL DEFAULT 'employee',
            password VARCHAR(36) NOT NULL
        )`,
        menu_items: `CREATE TABLE menu_items (
            id SERIAL PRIMARY KEY,
            title VARCHAR(72) NOT NULL,
            price VARCHAR(8) NOT NULL DEFAULT '',
            description TEXT NOT NULL DEFAULT '',
            categories VARCHAR(28) NOT NULL,
            options TEXT NOT NULL DEFAULT '',
            showinreduced BOOLEAN NOT NULL DEFAULT TRUE
        )`
    }
    , createTable = async name => await pool.query( tables[name] );


function restoreMenuFromBackup() {
    let sql = 'INSERT INTO menu_items ( title, price, description, categories, options, showinreduced ) VALUES ($1, $2, $3, $4, $5, $6);'
        , backup = require( menu.backup );
    pool.query( 'DROP TABLE IF EXISTS menu_items' )
        .then( () => createTable( 'menu_items' ) )
        .then( () => {
            for ( let {title, price, description, categories, options, showinreduced} of backup ) {
                pool.query( sql, [title, price, description, categories, options, showinreduced] )
                    .catch( err => console.log( err ) );
            }
        } );
}

function backupMenu() {
    pool.query( 'SELECT * FROM menu_items' ).then( res =>
        fs.writeFile( menu.backup, JSON.stringify( res.rows, null, '\t' ), 'utf8', () => {} )
    );
}