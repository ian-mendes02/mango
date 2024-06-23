'use client';
import {list} from '@/modules/utils';

/**
 * @param {object} props
 * @param {string} props.className
 * @param {Element|Element[]} props.children
 * @param {object} props.style
 */
export function Page({className, children, style = {}}) {
    style['width'] = "210mm";
    style['height'] = "297mm";
    return (
        <div className={list('menu-page relative overflow-hidden select-none', className)} style={style}>
            <div className="p-8 w-full h-full">
                <div className="p-4 w-full h-full border border-white grid grid-cols-2 gap-8">{children}</div>
            </div>
        </div>
    );
}

/**
 * @param {object} props
 * @param {string} props.className
 * @param {Element|Element[]} props.children
 * @param {object} props.style
 */
export function Drinks({className, children, style = {}}) {
    style['width'] = "210mm";
    style['height'] = "297mm";
    if (!style['backgroundImage']) {
        style['backgroundImage'] = "url(/mango-drinks-backdrop.webp)";
    }
    return (
        <div className={list('menu-page relative overflow-hidden select-none bg-contain', className)} style={style}>
            <div className="p-8 w-full h-full">
                <div className="p-4 w-full h-full grid grid-cols-2 gap-8">{children}</div>
            </div>
        </div>
    );
}
/**
 * @param {Object} props 
 * @param {string} props.name 
 * @param {string} props.price 
 */
export function Title({name, price, className}) {
    var value = price?.split(",");
    return (
        <h3 className={list('vidaloka', className)}>{name}
            {value && <span> - {value[0]}<sup><small>,{value[1]}</small></sup></span>}
        </h3>
    );
}

/**
 * @param {Object} props 
 * @param {string} props.name 
 * @param {string} props.price 
 */
export function Subtitle({name, price, className}) {
    var value = price?.split(",");
    return (
        <span className={list('vidaloka-sm', className)}>{name}
            {value && <span> - {value[0]}<sup><small>,{value[1]}</small></sup></span>}
        </span>
    );
}

export default function Menu() {
    var pages = [];
    for (let i = 1; i < 6; i++) {
        var page;
        try {page = require(`./pages/page_${i}/page.jsx`).default();}
        catch {page = null;}
        finally {if (page != null) pages.push(page);}
    }
    return <main className='bg-slate-700 flex flex-wrap justify-center'>{
        pages.map((i, k) => <div key={k} className='m-8'>{i}</div>)
    }</main>;
}