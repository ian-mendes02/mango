"use server";
import {QueryResultRow, createPool} from "@vercel/postgres";
import User from "./class-user";

const pool = createPool( {connectionString: process.env.POSTGRES_URL} );

export async function getUsers(): Promise<QueryResultRow[]> {
    var res: QueryResultRow[];
    try {
        var {rows} = await pool.sql`SELECT * FROM users ORDER BY id ASC;`;
        res = rows;
    }
    catch {
        res = [];
    }
    return res;
}

export async function getUser( email: string ): Promise<QueryResultRow | null> {
    var res: QueryResultRow | null;
    try {
        var {rows} = await pool.sql`SELECT * FROM users WHERE email = ${email}`;
        res = rows[0] || null;
    }
    catch {
        res = null;
    }
    return res;
}

export async function createUser( userJson: string ): Promise<StatusMessage> {
    let user: User = JSON.parse( userJson );
    var res: StatusMessage = {status: undefined, message: ''};
    try {
        await pool.sql`
            INSERT INTO users ( name, slug, email, role, password )
            VALUES ( 
                ${user.name},
                ${user.slug},
                ${user.email},
                ${user.role}, 
                ${user.password} 
            );
        `; res.status = true;
    }
    catch ( err: any ) {
        res.status = err.toString();
    }
    return res;
}

export async function updateUser( userJson: string ): Promise<StatusMessage> {
    let user: User = JSON.parse( userJson );
    var res: StatusMessage = {status: undefined, message: ''};
    try {
        await pool.sql`
            UPDATE users SET 
                name = ${user.name}, 
                slug = ${user.slug},
                email = ${user.email},
                role = ${user.role},
                password = ${user.password}
            WHERE id = ${user.id};
        `; res.status = true;
    }
    catch ( err: any ) {
        res.status = err.toString();
    }
    return res;
}

export async function deleteUser( id: number ): Promise<StatusMessage> {
    var res: StatusMessage = {status: undefined, message: ''};
    try {
        await pool.sql`DELETE FROM users WHERE id = ${id}`;
        res.status = true;
    }
    catch ( err: any ) {
        res.status = err.toString();
    }
    return res;
}

export async function createDefaultUser() {
    let user = new User( {
        name: 'admin',
        role: 'admin',
        password: '@Mango2024',
        email: 'ianlucamendes02@gmail.com'
    } );
    await createUser( JSON.stringify( user ) );
}

export async function verifyUser( data: UserData ) {
        let hasher = User.getHasher()
        , response: StatusMessage = {}
        , __user = await getUser( data.email );

    if ( __user && __user.password ) {
        response.status = 'ok';
        response.data = {
            auth: hasher.CheckPassword(data.password, __user.password),
            user: __user
        }
    } else {
        response.status = 'error';
        response.message = 'user not found';
    }
    return response;
}