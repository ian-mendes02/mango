"use client";
import {useEffect, useState} from 'react';
import {Divider, Wrapper, Container, Loading} from 'components/layout-components';
import {get_items_by_cat} from '@/modules/controllers/db/mango-sql';
export default function Main() {
    const [isLoading, setIsLoading] = useState( true )
        , [menuItems, setMenuItems] = useState( null );

    useEffect( () => {
        require( '@/modules/lib/font-awesome' );
        document.title = "Mango Café - SJC";
    }, [] );

    useEffect( () => {
        if ( !menuItems ) {
            get_items_by_cat( 'cozinha', 'drinks' ).then( ( res ) => {
                setMenuItems( JSON.stringify(res) );
                console.log( res );
            } );
        }
    }, [] );

    useEffect( () => setIsLoading( false ), [] );
    return (
        <main className='w-full h-full bg-slate-900'>
            {isLoading && <Loading />}
            <div id='cardapio-mango' className='relative h-full w-screen max-w-[820px] mx-auto'>
                <div id='nav-buttons' className='fixed z-50 block h-10 w-max top-4 right-4'>
                    <button className='rounded-full bg-neutral-900 bg-opacity-75 text-white outline-none border-none p-2 h-full aspect-square'>
                        <i className='fa-solid fa-search'></i>
                    </button>
                </div>
                <div className='relative z-50 p-8 flex'>
                    <div className='block h-full aspect-square w-12 bg-no-repeat bg-contain' style={{backgroundImage: 'url(/img/svg/mascot.svg)'}}></div>
                    <div>
                        <h1 className='astron mango-neon-orange text-xl'>MANGO</h1>
                        <h1 className='font-extralight tracking-widest'>CAFÉ</h1>
                    </div>
                </div>
                <div className="relative z-50 w-full h-full">
                    <div className='w-full h-full px-4 pt-16 bg-[var(--mango-black)] rounded-2xl shadow-lg'>
                    <p>{menuItems}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}