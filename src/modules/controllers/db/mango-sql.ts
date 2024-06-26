"use server";

import {QueryResult, QueryResultRow, VercelPool, createPool} from "@vercel/postgres";

function pool(): VercelPool {
    return createPool( {connectionString: 'postgres://default:un3FiJIerO2s@ep-purple-violet-a46sw9d9-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'} );
}

/**
 * Returns a QueryResult object or null on failure.
 */
export async function query( query_string: string ): Promise<QueryResult | null> {
    try {
        var results = await pool().query( query_string );
        return results;
    }
    catch {return null;}
}

/**
 * Retrieves an user from the database.
 * @returns {Promise<QueryResultRow|null>} Row object on success or null on failure
 */
export async function get_user( param: number | string ): Promise<QueryResultRow | null> {
    var query = 'number' === typeof param
        ? 'SELECT * FROM users WHERE id = $1'
        : 'SELECT * FROM users WHERE name = $1';
    try {
        var {rows} = await pool().query( query, [param] );
        return rows[0] || null;
    }
    catch {return null;}
}

/**
 * Retrieves all menu items from database.
 * @returns {Promise<QueryResultRow[]|any[]>} Array of row objects on success or empty array on failure
 */
export async function get_menu_items(): Promise<QueryResultRow[] | []> {
    try {
        var {rows} = await pool().query( 'SELECT * FROM menu_items' );
        return rows || [];
    }
    catch {return [];}
}

/**
 * Retrieves a menu item from the database.
 * @returns {Promise<QueryResultRow|null>} Row object on success or null on failure
 */
export async function get_menu_item( param: number | string ): Promise<QueryResultRow | null> {
    var query = 'number' === typeof param
        ? 'SELECT * FROM users WHERE id = $1'
        : 'SELECT * FROM users WHERE name = $1';
    try {
        var {rows} = await pool().query( query, [param] );
        return rows[0] || null;
    }
    catch {return null;}
}

/**
 * Inserts a new user into the database.
 * @returns {Promise<boolean>} true on success or false on failure
 */
export async function insert( table_name: string, columns: string[], values: any[] ): Promise<boolean> {
    var placeholders: string[] = [];
    for ( let i = 1; i < values.length + 1; i++ ) placeholders.push( `$${i}` );
    var query = `INSERT INTO ${table_name} (${columns.join( ',' )}) VALUES (${placeholders.join( ',' )})`;
    try {
        await pool().query( query, values );
        return true;
    }
    catch {return false;}
}

/**
 * Updates existing user data in database.
 * @returns {Promise<boolean>} true on success or false on failure
 */
export async function update( table_name: string, id: number, columns: string[], values: any[] ): Promise<boolean> {
    var placeholders: string[] = [];
    for ( let i = 2; i < values.length + 2; i++ ) placeholders.push( `$${i}` );
    var query = `UPDATE ${table_name} SET (${columns.join( ',' )}) VALUES (${placeholders.join( ',' )}) WHERE id = $1`;
    try {
        await pool().query( query, [id].concat( values ) );
        return true;
    }
    catch {return false;}
}