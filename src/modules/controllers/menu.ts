"use server";
import {QueryResult, createPool} from "@vercel/postgres";
import {MenuItem} from "./class-menu-item";

const pool = createPool( {connectionString: process.env.POSTGRES_URL} );

/**
 * Retrieves all menu items from database.
 * @returns {Promise<MenuItem[]>} Array of row objects on success or empty array on failure
 */
export async function getMenuItems( reduced: boolean = false ): Promise<MenuItem[]> {
    let data: QueryResult, results: MenuItem[];
    try {
        reduced
            ? data = await pool.sql`SELECT * FROM menu_items WHERE showinreduced = TRUE ORDER BY title ASC`
            : data = await pool.sql`SELECT * FROM menu_items ORDER BY title ASC`;
        results = data.rows;
    }
    catch {
        results = [];
    }
    return results;
}

/**
 * Create new menu item
 */
export async function createMenuItem( item: string ): Promise<StatusMessage> {
    const res: StatusMessage = {status: undefined, message: ''}
        , menuItem: MenuItem = JSON.parse( item );
    try {
        await pool.sql`
            INSERT INTO menu_items ( 
                title, 
                price,
                description,
                options,
                categories,
                showinreduced
            ) VALUES ( 
                ${menuItem.title}, 
                ${menuItem.price}, 
                ${menuItem.description}, 
                ${menuItem.options}, 
                ${menuItem.categories}, 
                ${menuItem.showinreduced} 
            );`;
        res.status = true;
    }
    catch ( err: unknown ) {
        res.status = err?.toString();
    }
    return res;
}

/**
 * Updates existing menu data in database.
 */
export async function updateMenuItem( item: string ): Promise<StatusMessage> {
    const res: StatusMessage = {status: undefined, message: ''}
        , menuItem: MenuItem = JSON.parse( item );
    try {
        await pool.sql`   
            UPDATE menu_items SET 
                title = ${menuItem.title}, 
                price = ${menuItem.price}, 
                description = ${menuItem.description}, 
                options = ${menuItem.options}, 
                showinreduced = ${menuItem.showinreduced} 
            WHERE id = ${menuItem.id};
        `;
        res.status = true;
    }
    catch ( err: unknown ) {
        res.status = err?.toString();
    }
    return res;
}

/**
 * Remove menu item by id
 */
export async function removeMenuItem( id: number ): Promise<StatusMessage> {
    const res: StatusMessage = {status: undefined};
    try {
        await pool.sql`DELETE FROM menu_items WHERE id = ${id}`;
        res.status = true;
    }
    catch ( err: unknown ) {
        res.status = err?.toString();
    }
    return res;
}

/**
 * Toggle an item.
 * @returns {Promise<StatusMessage>} status message object
 */
export async function toggleMenuItem( id: number, status: boolean ): Promise<StatusMessage> {
    const res: StatusMessage = {status: undefined};
    try {
        await pool.sql`UPDATE menu_items SET showinreduced = ${status} WHERE id = ${id};`;
        res.status = true;
    }
    catch ( err: unknown ) {
        res.status = err?.toString();
    }
    return res;
}
