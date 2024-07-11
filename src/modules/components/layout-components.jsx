import {list} from '../utils';
/**
 * @param {Object} props 
 * @param {string} props.id
 * @param {string} props.className
 * @param {any} props.children
 */
export function Section({id, className, children}) {
    return (
        <section id={id} className={list('py-16 m-auto w-full relative', className)}>
            {children}
        </section>
    );
};
/**
 * @param {Object} props 
 * @param {string} props.id
 * @param {string} props.className
 * @param {any} props.children
 */
export function Content({id, className, children}) {
    return (
        <div id={id} className={list('block m-auto w-full', className)}>
            {children}
        </div>
    );
};
/**
 * @param {Object} props 
 * @param {string} props.id
 * @param {string} props.className
 * @param {any} props.children
 */
export function ContentDefault({id, className, children}) {
    return (
        <div id={id} className={list('w-[96%] max-w-[1280px] mx-auto', className)}>
            {children}
        </div>
    );
};
/**
 * @param {Object} props 
 * @param {string} props.id
 * @param {string} props.className
 * @param {any} props.children
 */
export function Wrapper({id, className, children}) {
    return (
        <div id={id} className={list('flex flex-wrap', className)}>
            {children}
        </div>
    );
};
/**
 * @param {Object} props 
 * @param {string} props.id
 * @param {string} props.className
 * @param {any} props.children
 */
export function Container({id, className, children}) {
    return (
        <div id={id} className={list('flex flex-col', className)}>
            {children}
        </div>
    );
};
/**
 * @param {Object} props 
 * @param {string} props.id
 * @param {string} props.className
 * @param {number | string} props.cols
 * @param {number | string} props.rows
 * @param {any} props.children
 */
export const Grid = ({id, className, children}) => (
    <div id={id} className={list('grid', className)}>
        {children}
    </div>
);

export function Badge({children, width = 24, className = ''}) {
    return (
        <div
            className={list('bg-inherit rounded-full absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center p-4', className)}
            style={{width: `${width}px`}}
        >
            {children}
        </div>
    );
};

export function Loading({width = 64}) {
    const size = width + 'px';
    return (
        <div className='fixed z-[999] top-0 left-0 w-screen h-screen flex items-center justify-center bg-neutral-800 bg-opacity-90 backdrop-blur-3xl'>
            <img src="/img/svg/mango-loading.svg"
                width={size}
                height={size}
                draggable='false'
                alt=""
            />
        </div>
    );
};

export function Spacer({size = 1}) {
    return <div className='w-full' style={{height: size + 'rem'}}></div>;
};

export function Divider({color = 'var(--mango-primary)', position = 'center', className = ''}) {
    var fill = {
        center: `rgba(0,0,0,0), ${color}, rgba(0,0,0,0)`,
        left: `${color}, rgba(0,0,0,0)`,
        right: `rgba(0,0,0,0), ${color}` 
    };
    return (
        <div
            className={list('w-full h-[1px]', className)}
            style={{backgroundImage: `linear-gradient(90deg, ${fill[position]})`}}
        ></div>
    );
};