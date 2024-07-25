export function list( ...classes: string[] ): string {
    return classes.join( ' ' ).trim();
};

export function url( str = 'img/placeholder.webp' ): string {
    return `url('/${str}')`;
};

export function sanitize( str: string = '' ): string {
    return str
        .trim()
        .toLowerCase()
        .normalize( "NFD" )
        .replace( /[\u0300-\u036f]/g, "" );
}