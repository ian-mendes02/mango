var cardapio = require( './cardapio.json' );
var fs = require( 'fs' );
var new_cardapio = [];
for ( let item of cardapio ) {
    if ( item.options ) item.options = item.options.join( ',' );
    new_cardapio.push( item );
}

new_cardapio = JSON.stringify( new_cardapio, null, '\t' );

fs.writeFile( '/var/www/html/projects/mango/src/modules/json/cardapio_new.json', new_cardapio, 'utf8', () => {} );