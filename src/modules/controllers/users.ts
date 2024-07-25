"use server";
import {QueryResult, QueryResultRow, createPool} from "@vercel/postgres";
import {User, UserType} from "controllers/class-user";
import {compare, hash} from "bcrypt";

const pool = createPool( {connectionString: process.env.POSTGRES_URL} );

export async function getUsers(): Promise<QueryResultRow[]> {
    let res: QueryResultRow[];
    try {
        const {rows} = await pool.sql`SELECT * FROM users ORDER BY id ASC;`;
        res = rows;
    }
    catch {
        res = [];
    }
    return res;
}

export async function getUser( email: string ): Promise<string> {
    let res: QueryResult, user: UserType | null = null;
    try {
        res = await pool.sql`SELECT * FROM users WHERE email = ${email}`;
        user = res.rows[0];
    }
    catch ( e: unknown ) {
        console.log( e?.toString() );
    }
    return JSON.stringify( user );
}

export async function createUser( userJson: string ): Promise<StatusMessage> {
    const user: User = JSON.parse( userJson )
        , res: StatusMessage = {status: undefined, message: ''};
    user.password = await hash( user.password, 10 );
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
    catch ( err: unknown ) {
        res.status = err?.toString();
    }
    return res;
}

export async function updateUser( userJson: string ): Promise<StatusMessage> {
    const user: User = JSON.parse( userJson )
        , res: StatusMessage = {status: undefined, message: ''};
    user.password = await hash( user.password, 10 );
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
    catch ( err: unknown ) {
        res.status = err?.toString();
    }
    return res;
}

export async function deleteUser( id: number ): Promise<StatusMessage> {
    const res: StatusMessage = {status: undefined, message: ''};
    try {
        await pool.sql`DELETE FROM users WHERE id = ${id}`;
        res.status = true;
    }
    catch ( err: unknown ) {
        res.status = err?.toString();
    }
    return res;
}

export async function createDefaultUser() {
    let user = new User( {
        name: 'Gustavo Mendes',
        role: 'admin',
        password: '@Mango2024',
        email: 'recadosmartin@gmail.com'
    } );
    return await createUser( user.toJson() );
}

export async function verifyUser( data: UserType ) {
    const userData = await getUser( data.email )
        , user: UserType = JSON.parse( userData )
        , auth = await compare( data.password, user.password )
        , response: StatusMessage = {};

    if ( user && user.password ) {
        response.status = 'ok';
        response.data = {
            auth: auth,
            user: user,
            data: data,
        };
    } else {
        response.status = 'error';
        response.message = 'user not found';
    }

    return JSON.stringify( response );
}