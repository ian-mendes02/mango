import {PasswordHash, CRYPT_BLOWFISH, mangosql} from ".";
type response = {status: string, data?: boolean | string;};

export default class User {

    private name: string;
    private password: string;
    private roles?: string;
    private hasher: PasswordHash;

    constructor( name: string, password: string, roles?: string | string[] ) {
        this.hasher = new PasswordHash( 8, true, 7 );
        this.name = name;
        this.password = password;
        if ( roles ) {
            if ( typeof roles === 'string' ) this.roles = roles;
            else this.roles = roles.join( ',' );
        }
    }

    private hash_password( password: string ): string | undefined {
        this.hasher.HashPassword( password, CRYPT_BLOWFISH ).then( hash => {
            return hash;
        } );
        return undefined;
    }

    /**
     * Registers a new user in database
     */
    public async register(): Promise<boolean> {
        var password: string | undefined = this.hash_password( this.password );
        if ( password ) try {
            await mangosql.insert( 'users',
                ['name', 'roles', 'password'],
                [this.name, this.roles, password]
            ); return true;
        } catch {return false;}
        else {return false;}
    }

    /** 
     * Verifies an existing user 
     */
    public async verify(): Promise<response> {
        var response: response = {
            status: '',
            data: undefined
        };
        var user = await mangosql.get_user( this.name );
        if ( user && user.password ) {
            response.status = 'ok';
            response.data = this.hasher.CheckPassword( this.password, user.password );
        } else {
            response.status = 'error';
            response.data = 'user not found';
        }
        return response;
    }
}
