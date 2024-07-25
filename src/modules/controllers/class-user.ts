export type UserType = {
    id?: number;
    name: string;
    password: string;
    role: string;
    email: string;
};

export class User {

    id?: number;
    name: string;
    password: string;
    role: string;
    email: string;
    slug: string;

    constructor( data?: UserType ) {
        this.id = data?.id;
        this.name = data?.name ?? '';
        this.role = data?.role ?? '';
        this.email = data?.email ?? '';
        this.password = data?.password ?? '';
        this.slug = this.name && this.sanitizeName( this.name );
    }

    private sanitizeName( str: string ): string {
        return str.trim().toLowerCase().replace( /[\s-]/, '_' );
    }

    public toJson(): string {
        return JSON.stringify( this );
    }
}
