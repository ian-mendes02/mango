var Utils = require('./utils');
Utils.list = function(...classes) {
    return classes.join(' ').trim();
};
Utils.mobile = function(classes) {
    var cls = classes.split(' ');
    for (let i = 0; i < cls.length; i++) {
        cls[i] = 'max-[820px]:' + cls[i];
    };
    return cls.join(' ').trim();
};
Utils.before = function(classes) {
    var cls = classes.split(' ');
    for (let i = 0; i < cls.length; i++) {
        cls[i] = 'before:' + cls[i];
    };
    return cls.join(' ').trim();
};
Utils.after = function(classes) {
    var cls = classes.split(' ');
    for (let i = 0; i < cls.length; i++) {
        cls[i] = 'after:' + cls[i];
    };
    return cls.join(' ').trim();
};
Utils.url = function(str = 'placeholder.webp') {
    return `url('/${str}')`;
};
Utils.scrollToCenter = function(el) {
    var n = typeof el === 'string' ? document.querySelector(el) : el;
    n?.scrollIntoView({block: 'center', behavior: 'smooth'});
};
Utils.scrollToTop = function(el) {
    var n = typeof el === 'string' ? document.querySelector(el) : el;
    n?.scrollIntoView({block: 'start', behavior: 'smooth'});
};