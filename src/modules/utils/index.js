var Utils = require( '.' );

Utils.list = function( ...classes ) {
    return classes.join( ' ' ).trim();
};

Utils.mobile = function( classes ) {
    var cls = classes.split( ' ' );
    for ( let i = 0; i < cls.length; i++ ) {
        cls[i] = 'max-[820px]:' + cls[i];
    };
    return cls.join( ' ' ).trim();
};

Utils.before = function( classes ) {
    var cls = classes.split( ' ' );
    for ( let i = 0; i < cls.length; i++ ) {
        cls[i] = 'before:' + cls[i];
    };
    return cls.join( ' ' ).trim();
};

Utils.after = function( classes ) {
    var cls = classes.split( ' ' );
    for ( let i = 0; i < cls.length; i++ ) {
        cls[i] = 'after:' + cls[i];
    };
    return cls.join( ' ' ).trim();
};

Utils.url = function( str = 'img/placeholder.webp' ) {
    return `url('/${str}')`;
};

Utils.scrollToCenter = function( el ) {
    var n = typeof el === 'string' ? document.querySelector( el ) : el;
    n?.scrollIntoView( {block: 'center', behavior: 'smooth'} );
};

Utils.scrollToTop = function( el ) {
    var n = typeof el === 'string' ? document.querySelector( el ) : el;
    n?.scrollIntoView( {block: 'start', behavior: 'smooth'} );
};

Utils.log = function( msg, debug = true, type = undefined ) {
    let print = {
        success: () => console.log( "%c" + "☑ - " + msg, "color: #B0C4DE" ),
        info: () => console.log( "%c" + "⚠ - " + msg, "color: #F0E68C" ),
        error: () => console.error( msg ),
        warning: () => console.warn( msg ),
        default: () => console.log( msg )
    };
    debug && print[type || 'default']();
};