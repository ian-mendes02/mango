import {useRef, useEffect, useState, useMemo, Children} from 'react';
import {list} from '../utils';

export function Gallery( {children, className, isMobile} ) {

    /* const [fullscreenContent, setFullscreenContent] = useState( null )
    , [modalActive, setModalActive] = useState( false ) */

    /* function Fullscreen() {
        
            const containerRef = useRef( null )
            , contentRef = useRef( null )
            , scrollEvents = ['wheel', 'scroll', 'keydown']
            , scrollKeys = ["Space", "ArrowUp", "ArrowDown"]
            , handleClickOutside = e => {
                containerRef.current == e.target && setModalActive( false );
            }
            , preventScroll = e => {
                if ( scrollEvents.includes( e.type ) ) {
                    if ( e.type === 'keydown' ) {
                        if ( e.code === 'Escape' )
                            setModalActive( false );
                        else if ( scrollKeys.includes( e.code ) )
                            e.preventDefault();
                    } else e.preventDefault();
                }
            };
        useEffect( () => {
            modalActive && (
                document.addEventListener( 'mousedown', handleClickOutside ),
                scrollEvents.forEach( e => document.addEventListener( e, preventScroll, {passive: false} ) )
            );
            return () => (
                document.removeEventListener( 'mousedown', handleClickOutside ),
                scrollEvents.forEach( e => document.removeEventListener( e, preventScroll, {passive: false} ) )
            );
        }, [modalActive] );

        return (
            <div
                className='fixed z-[999] top-0 left-0 w-[100vw] h-[100vh] bg-[rgb(0,0,0,.8)] backdrop-blur-[3px] flex justify-center items-center px-32 py-[2.5%] max-[820px]:p-0'
                ref={containerRef}
            >
                <div className='w-full h-full flex items-center justify-center relative'>
                    <div className='h-full w-full flex items-center justify-center p-4'>
                        <div className='w-12 h-12 fixed right-2 top-4 max-[820px]:top-1/4 max-[820px]:translate-y-full'>
                            <span className='w-full text-right cursor-pointer' onClick={() => setModalActive( false )}>
                                <i className="fa-regular fa-circle-xmark text-2xl text-white" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className='w-full h-full rounded-lg *:rounded-[inherit] flex items-center justify-center' ref={contentRef}>
                            {fullscreenContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    } */

    function Panel( {children, content, className} ) {
        /* function toggleFullscreen( content ) {
            setFullscreenContent( content );
            setModalActive( true );
        } */

        /* const _content = useMemo(
            () => <div
                className='w-full h-full bg-contain bg-no-repeat bg-center'
                style={{backgroundImage: `url(${content.props.src || '/img/placeholder.webp'})`}}
            ></div>
            , [] ); */

        const innerPanels = useMemo( () => {
            var p = Children.toArray( children )?.map(
                ( i, k ) => <Panel
                    key={k}
                    content={i}
                    className={i.props.className}
                />
            );
            return p.length > 0 ? p : undefined;
        }, [children] );

        return innerPanels
            ? (
                <div className={className}>
                    {innerPanels}
                </div>
            )
            : (
                <div
                    className={list( 'bg-cover bg-center rounded-lg shadow-md', content.props.className )}
                    style={{backgroundImage: `url(${content.props.src || '/img/placeholder.webp'})`}}
                /* onClick={() => toggleFullscreen( _content )} */
                ></div>
            );
    }

    return (
        <div className={list( 'relative flex flex-wrap', className )}>
            {/* {modalActive && <Fullscreen>{fullscreenContent}</Fullscreen>} */}
            {children?.map(
                ( i, k ) => <Panel
                    key={k}
                    content={i}
                    className={i.props.className}
                >{i.props.children}</Panel>
            )}
        </div>
    );
}