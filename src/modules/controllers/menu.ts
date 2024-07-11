"use server";
import {QueryResult, QueryResultRow, sql} from "@vercel/postgres";

/**
 * Retrieves all menu items from database.
 * @returns {Promise<QueryResultRow[]|[]>} Array of row objects on success or empty array on failure
 */
export async function getMenuItems( reduced: boolean = false ): Promise<QueryResultRow[] | []> {
    var data: QueryResult, results: QueryResultRow[];
    try {
        reduced
            ? data = await sql`SELECT * FROM menu_items WHERE showinreduced = TRUE ORDER BY id ASC`
            : data = await sql`SELECT * FROM menu_items ORDER BY id ASC`;
        results = data.rows;
    }
    catch {
        results = [];
    }
    return results;
}

/**
 * Create new menu item
 * @returns {Promise<object>} status message object
 */
export async function createMenuItem( values: MenuItemData ): Promise<StatusMessage> {
    var res: StatusMessage = {status: undefined, message: ''};
    try {
        await sql`
            INSERT INTO menu_items ( 
                title, 
                price, 
                description, 
                options, 
                showinreduced, 
                categories 
            )
            VALUES ( 
                ${values.title}, 
                ${parseFloat( values.price )}, 
                ${values.description || null}, 
                ${values.options || null}, 
                ${values.showinreduced}, 
                ${values.categories} 
            );`;
        res.status = true;
    }
    catch ( err: any ) {
        res.status = err.toString();
    }
    return res;
}

/**
 * Updates existing menu data in database.
 * @returns {Promise<object>} status message object
 */
export async function updateMenuItem( values: MenuItemData ): Promise<StatusMessage> {
    var res: StatusMessage = {status: undefined, message: ''};
    try {
        await sql`   
                UPDATE menu_items SET 
                    title = ${values.title}, 
                    price = ${parseFloat( values.price )}, 
                    description = ${values.description || null}, 
                    options = ${values.options || null}, 
                    showinreduced = ${values.showinreduced} 
                WHERE id = ${values.id};
            `;
        res.status = true;
    }
    catch ( err: any ) {
        res.status = err.toString();
    }
    return res;
}

/**
 * Remove menu item by id
 * @returns {Promise<object>} status message object
 */
export async function removeMenuItem( id: number ): Promise<object> {
    var res: {status: any;} = {status: undefined};
    try {
        await sql`DELETE FROM menu_items WHERE id = ${id}`;
        res.status = true;
    }
    catch ( err: any ) {
        res.status = err.toString();
    }
    return res;
}

/**
 * Toggle an item.
 * @returns {Promise<object>} status message object
 */
export async function toggleMenuItem( id: number, status: boolean ): Promise<object> {
    var res: {status: any;} = {status: undefined};
    try {
        await sql`UPDATE menu_items SET showinreduced = ${status} WHERE id = ${id};`;
        res.status = true;
    }
    catch ( err: any ) {
        res.status = err.toString();
    }
    return res;
}
