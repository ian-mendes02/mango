'use client';
import {useEffect, useRef, useState, Children, useMemo} from "react";

const Carousel = ( {
    children = [],
    visibleItemsCount = 1, // quantos items devem ser exibidos por vez?
    isInfinite, // o carrossel é infinito?
    withIndicator, // mostra indicador de elementos?
    className = undefined,
    id = undefined,
    autoScrollEnabled = true,
    autoScrollTimeout = 3000,
    isFullWidth = false
} ) => {
    const indicatorContainerRef = useRef( null )
        , [timeoutInProgress, setTimeoutInProgress] = useState( false ) // confere se há uma pausa em andamento
        , [tabHasFocus, setTabHasFocus] = useState( true )
        , [elementWidth, setElementWidth] = useState( null )

        , carouselRef = useRef( null )

        /**número total de elementos*/
        , originalItemsLength = useMemo( () => Children.count( children ), [
            children
        ] )

        /**confere se o carrossel está repetindo um elemento*/
        , isRepeating = useMemo(
            () => isInfinite && Children.count( children ) > visibleItemsCount,
            [children, isInfinite, visibleItemsCount]
        )

        /**índice do elemento em exibição*/
        , [currentIndex, setCurrentIndex] = useState(
            isRepeating ? visibleItemsCount : 0
        )

        /**confere se a transição est´á ativada*/
        , [isTransitionEnabled, setTransitionEnabled] = useState( true )

        /**armazena a posição inicial de toque para deslizamento*/
        , [touchPosition, setTouchPosition] = useState( null );

    useEffect( () => {
        if ( isRepeating ) {
            if (
                currentIndex === visibleItemsCount ||
                currentIndex === originalItemsLength
            ) {
                setTransitionEnabled( true );
            }
        }
    }, [currentIndex, isRepeating, visibleItemsCount, originalItemsLength] );

    useEffect( () => document.addEventListener( 'visibilitychange', () => document.visibilityState === 'hidden' ? setTabHasFocus( false ) : setTabHasFocus( true ) ), [] );

    useEffect( () => {
        if ( withIndicator ) {
            const active = indicatorContainerRef.current?.querySelector( ".dots-active" );
            if ( active ) {
                let index = active.getAttribute( "data-index" );
                if ( index !== null && indicatorContainerRef.current?.scrollTo ) {
                    indicatorContainerRef.current?.scrollTo( {
                        left: ( ( Number( index ) - 2 ) / 5 ) * 50,
                        behavior: "smooth"
                    } );
                }
            }
        }
    }, [withIndicator, currentIndex] );

    useEffect( () => {
        function vw() {
            let el = carouselRef.current.querySelectorAll( '.carousel-element' )[0]?.clientWidth;
            setElementWidth( el );
        } vw();
        window.visualViewport.addEventListener( 'resize', vw );
        return () => window.visualViewport.removeEventListener( 'resize', vw );
    }, [] );

    /**avança para o próximo item*/
    const nextItem = () => {
        if ( currentIndex > originalItemsLength ) {
            setTimeoutInProgress( true );
        }
        if ( isRepeating || currentIndex < originalItemsLength - visibleItemsCount ) {
            setCurrentIndex( ( prevState ) => prevState + 1 );
        }
    };

    /**volta para o item anterior*/
    const previousItem = () => {
        const isOnEdgeBack = isRepeating ? currentIndex <= visibleItemsCount : currentIndex === 0;
        if ( isOnEdgeBack ) {
            setTimeoutInProgress( true );
        }
        if ( isRepeating || currentIndex > 0 ) {
            setCurrentIndex( ( prevState ) => prevState - 1 );
        }
    };

    const handleTouchStart = ( e ) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition( touchDown );
    };

    /** função de navegação por toque
     * @param e TouchEvent
    */
    const handleTouchMove = ( e ) => {
        const touchDown = touchPosition;
        if ( touchDown === null ) {
            return;
        }
        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;
        if ( diff > 5 ) {
            nextItem();
        }
        if ( diff < -5 ) {
            previousItem();
        }
        setTouchPosition( null );
    };

    const handleTransitionEnd = () => {
        if ( isRepeating ) {
            if ( currentIndex === 0 ) {
                setTransitionEnabled( false );
                setCurrentIndex( originalItemsLength );
            } else if ( currentIndex === originalItemsLength + visibleItemsCount ) {
                setTransitionEnabled( false );
                setCurrentIndex( visibleItemsCount );
            }
        }
        setTimeoutInProgress( false );
    };

    /**insere novos itens atrás do item anterior*/
    const extraPreviousItems = useMemo( () => {
        let output = [];
        for ( let index = 0; index < visibleItemsCount; index++ ) {
            output.push( Children.toArray( children )[originalItemsLength - 1 - index] );
        }
        output.reverse();
        return output;
    }, [children, originalItemsLength, visibleItemsCount] );

    /**insere novos itens à fente do próximo item*/
    const extraNextItems = useMemo( () => {
        let output = [];
        for ( let index = 0; index < visibleItemsCount; index++ ) {
            output.push( Children.toArray( children )[index] );
        }
        return output;
    }, [children, visibleItemsCount] );

    const renderDots = useMemo( () => {
        let output = [];
        const localShow = isRepeating ? visibleItemsCount : 0;
        const localLength = isRepeating
            ? originalItemsLength
            : Math.ceil( originalItemsLength / visibleItemsCount );
        const calculatedActiveIndex =
            currentIndex - localShow < 0
                ? originalItemsLength + ( currentIndex - localShow )
                : currentIndex - localShow;
        for ( let index = 0; index < localLength; index++ ) {
            let className = "";
            if ( calculatedActiveIndex === index ) {
                className = "dots-active";
            } else {
                if ( calculatedActiveIndex === 0 ) {
                    if ( calculatedActiveIndex + index <= 2 ) {
                        className = "dots-close";
                    } else {
                        className = "dots-far";
                    }
                } else if ( calculatedActiveIndex === localLength - 1 ) {
                    if ( Math.abs( calculatedActiveIndex - index ) <= 2 ) {
                        className = "dots-close";
                    } else {
                        className = "dots-far";
                    }
                } else {
                    if ( Math.abs( calculatedActiveIndex - index ) === 1 ) {
                        className = "dots-close";
                    } else {
                        className = "dots-far";
                    }
                }
            }
            output.push( <div key={index} data-index={index} className={className} /> );
        }
        return output;
    }, [currentIndex, isRepeating, originalItemsLength, visibleItemsCount] );

    const isNextButtonVisible = useMemo( () => {
        return (
            isRepeating || currentIndex < originalItemsLength - visibleItemsCount
        );
    }, [isRepeating, currentIndex, originalItemsLength, visibleItemsCount] );

    const isPrevButtonVisible = useMemo( () => isRepeating || currentIndex > 0, [
        isRepeating,
        currentIndex
    ] );

    const scroll = () => {
        if ( tabHasFocus && !timeoutInProgress ) {
            var i = currentIndex + 1;
            if ( i > originalItemsLength + 1 ) {i = 0;};
            setCurrentIndex( i );
        }
    };

    useEffect( () => {
        const doAutoScroll = autoScrollEnabled && setTimeout( scroll, autoScrollTimeout );
        return () => clearTimeout( doAutoScroll );
    }, [currentIndex] );

    return (
        <div className={className} id={id} ref={carouselRef}>
            <div className={`carousel-wrapper`}>
                {isPrevButtonVisible ? (
                    <button
                        disabled={timeoutInProgress}
                        style={{
                            cursor: timeoutInProgress ? "not-allowed" : "pointer",
                            pointerEvents: timeoutInProgress ? "none" : "inherit"
                        }}
                        onClick={previousItem}
                        className="left-arrow-button"
                    >
                        <span className="left-arrow" />
                    </button>
                ) : null}
                <div className={`carousel-content-wrapper`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                    <div
                        className={`carousel-content *:w-[calc(100% / ${visibleItemsCount})]`}
                        style={{
                            transform: `translateX(-${currentIndex * elementWidth}px)`,
                            transition: !isTransitionEnabled ? "none" : undefined
                        }}
                        onTransitionEnd={() => handleTransitionEnd()}
                    >
                        {isRepeating && extraPreviousItems}
                        {isFullWidth
                            ? children.map( ( i, k ) =>
                                <div key={k} className='w-full h-auto carousel-element'>{i}</div>
                            )
                            : children.map( ( i, k ) =>
                                <div key={k} className='w-auto h-auto carousel-element'>{i}</div>
                            )
                        }
                        {isRepeating && extraNextItems}
                    </div>
                </div>
                {isNextButtonVisible ? (
                    <button
                        disabled={timeoutInProgress}
                        style={{
                            cursor: timeoutInProgress ? "not-allowed" : "pointer",
                            pointerEvents: timeoutInProgress ? "none" : "inherit"
                        }}
                        onClick={nextItem}
                        className="right-arrow-button"
                    >
                        <span className="right-arrow" />
                    </button>
                ) : null}
            </div>
            {withIndicator && <div ref={indicatorContainerRef} className={`indicator-container `}>{renderDots}</div>}
        </div>
    );
};

export default Carousel;