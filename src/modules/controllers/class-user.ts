import {PasswordHash, CRYPT_BLOWFISH} from "./password-hash";

export default class User {

    public id?: number;
    public name: string;
    public password: string;
    public role: string;
    public email: string;
    public slug: string;

    private static hasher: PasswordHash;
    private static _instance: User;

    constructor( data: UserData ) {
        this.id = data.id || undefined;
        this.name = data.name || '';
        this.role = data.role || '';
        this.email = data.email;
        this.slug = this.sanitizeName( this.name );
        this.password = data.password;
    }

    private sanitizeName( str: string ): string {
        return str.trim().toLowerCase().replace( /[\s-]/, '_' );
    }

    public matchPassword( pswd: string ) {
        return User.getHasher().CheckPassword( pswd, this.password );
    }

    public static getHasher(): PasswordHash {
        if ( !this.hasher ) {
            this.hasher = new PasswordHash( 8, true, 7 );
        }
        return this.hasher;
    }

    public static async instance( data: UserData ): Promise<User> {
        if ( !this._instance ) {
            let hasher = User.getHasher()
                , hash = await hasher.HashPassword( data.password, CRYPT_BLOWFISH )
                , _data = data;
            _data.password = hash;
            this._instance = new User( _data );
        }
        return this._instance;
    }

    public toJson(): string {
        return JSON.stringify( this );
    }

}
