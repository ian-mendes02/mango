import {useRef, useEffect, useState} from 'react';

export default function Fulscreen( {children, isActive} ) {
    const containerRef = useRef( null )
        , contentRef = useRef( null )
        , [modalActive, setModalActive] = useState( isActive );

    useEffect( () => {
        const handleClickOutside = event => contentRef.current && !contentRef.current.contains( event.target ) && setModalActive( false )
            , preventScroll = e => e.preventDefault()
            , listen = document.addEventListener
            , remove = document.removeEventListener
            , attach = () => {
                listen( 'mousedown', handleClickOutside );
                listen( 'wheel', preventScroll, {passive: false} );
                listen( 'touchmove', preventScroll, {passive: false} );
            }
            , clear = () => {
                remove( 'mousedown', handleClickOutside );
                remove( 'wheel', preventScroll, {passive: false} );
                remove( 'touchmove', preventScroll, {passive: false} );
            };

        modalActive && attach();
        return () => clear();

    }, [modalActive] );

    return modalActive && (
        <div className='bg-[rgb(0,0,0,0.3)] backdrop-blur-lg fixed z-[999] top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center px-32 py-20' ref={containerRef}>
            <div className='w-full h-full relative'>
                <div className='w-12 h-12 absolute -top-12 -right-12'>
                    <span className='w-full text-right cursor-pointer' onClick={() => setModalActive( false )}><i className="fa-regular fa-circle-xmark text-2xl" aria-hidden="true"></i></span>
                </div>
                <div className='rounded-lg shadow-lg w-full h-full' ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}