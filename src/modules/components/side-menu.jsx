'use client';
import {useState, useEffect, useRef, useMemo} from 'react';
import {list, scrollTo} from '@/modules/utils/strings';

export default function Menu( {options, isActive} ) {
    const [showSideMenu, setShowSideMenu] = useState( isActive );
    const [menuClassName, setMenuClassName] = useState( null );
    const [modalClassName, setModalClassName] = useState( null );

    const menuRef = useRef( null );

    function toggleSideMenu( bool ) {
        if ( !bool ) {
            setMenuClassName( 'slide-out' );
            setModalClassName( 'lighten' );
            setTimeout( () => setShowSideMenu( false ), 300 );
        } else {
            setMenuClassName( 'slide-in' );
            setModalClassName( 'darken' );
            setShowSideMenu( true );
        }
    }

    const Option = ( {name, target, icon} ) => {
        return (
            <li
                className='p-4 hover:bg-slate-200 duration-150 ease-out cursor-pointer border-b border-slate-300 last-of-type:border-none flex items-center'
                onClick={() => {
                    scrollTo( target );
                    toggleSideMenu( false );
                }}
            >
                <span><i className={`fa-solid fa-${icon} align-text-bottom mr-4`} aria-hidden='true'></i>{name}</span>
            </li>
        );
    };

    const _options = useMemo(
        () => options.map(
            ( i, k ) => <Option
                key={k}
                name={i.name}
                target={i.target}
                icon={i.icon}
            /> ), [options]
    );

    useEffect( () => {
        const menuButtonRef = document.querySelector( '[data-menu-button]' );
        var touchPositionStart = null;
        function validTouchInput( e ) {
            return menuButtonRef != e.target
                && !menuButtonRef?.contains( e.target )
                && !menuRef.current?.contains( e.target );
        };
        function handleTouchStart( e ) {
            if ( validTouchInput( e ) )
                touchPositionStart = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
        }
        function handleTouchEnd( e ) {
            if ( validTouchInput( e ) ) {
                var deltaY = e.changedTouches[0].clientY - touchPositionStart.y;
                var deltaX = e.changedTouches[0].clientX - touchPositionStart.x;
                if ( Math.abs( deltaY ) < 100 ) {
                    if ( deltaX <= 0 )
                        toggleSideMenu( false );
                    else
                        toggleSideMenu( true );
                }
            }
        }
        window.addEventListener( 'touchend', handleTouchEnd );
        window.addEventListener( 'touchstart', handleTouchStart );
        return () => {
            window.removeEventListener( 'touchend', handleTouchEnd );
            window.removeEventListener( 'touchstart', handleTouchStart );
        };
    }, [] );

    useEffect( () => toggleSideMenu( isActive ), [isActive] );

    return showSideMenu && (
        <div className={list( 'darken fixed top-0 left-0 w-screen h-screen z-[999] backdrop-blur-[2px]', modalClassName )} data-side-menu>
            <div ref={menuRef} className={list( 'bg-[var(--mango-white)] w-[75vw] h-full pt-8 shadow-md', menuClassName )}>
                <div className='w-full flex justify-end pr-4' onClick={() => toggleSideMenu( false )}>
                    <i className="fa-solid fa-xmark fa-2xl" aria-hidden='true'></i>
                </div>
                <ul className='list-none pt-8'>{_options}</ul>
            </div>
        </div>
    );
}