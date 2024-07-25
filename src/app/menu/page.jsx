"use client";
import {useEffect, useMemo, useRef, useState} from 'react';
import {Wrapper, Container, Loading} from '@/modules/components/layout';
import {getMenuItems} from '@/modules/controllers/menu';
import {scrollTo} from '@/modules/utils/pages';
export default function Main() {

    const [isLoading, setIsLoading] = useState( true )
        //, [backgroundFrameContent, setBackgroundFrameContent] = useState( null )
        , [isMainFrameActive, setIsMainFrameActive] = useState( true )
        , [searchTabOpacity, setSearchTabOpacity] = useState( 0 )
        , [searchModalOpacity, setSearchModalOpacity] = useState( 0 )
        , [showSearchModal, setShowSearchModal] = useState( false )
        , [menuItemData, setMenuItemData] = useState( [] )
        , [filteredMenuData, setFilteredMenuData] = useState( [] )
        , [searchInputValue, setSearchInputValue] = useState( '' )
        , foregroundRef = useRef( null )
        , socials = {
            instagram: "https://www.instagram.com/mangocafesjc/",
            facebook: "https://www.facebook.com/profile.php?id=61558132046582",
            whatsapp: "https://wa.me/5512997828401"
        };

    function handleScroll( e ) {
        var st = e.target.scrollTop, op = st / 100;
        st > 100 && ( op = 1 );
        setSearchTabOpacity( op );
    }

    function toggleSearchModal( show ) {
        show
            ? (
                setShowSearchModal( true ),
                setTimeout( () => setSearchModalOpacity( 1 ), 1 )
            )
            : (
                setSearchModalOpacity( 0 ),
                setTimeout( () => setShowSearchModal( false ), 200 )
            );
    }

    function SearchResult( {id, name} ) {
        return <li
            id={id}
            onClick={() => {
                scrollTo( '#item-' + id, 'center' );
                setShowSearchModal( false );
                setSearchInputValue( '' );
                setSearchTabOpacity( 0 );
            }}
            className='menu-list-item bg-inherit w-full py-4'
        >{name}</li>;
    }

    function ListItemDrink( {id, name, price, description/* , mediaUrl = null */, hasSubpage = false} ) {
        function showItemSubpage() {
            setIsMainFrameActive( false );
        }
        return (
            <li
                id={'item-' + id}
                className='menu-list-item w-full py-4'
                onClick={() => hasSubpage && showItemSubpage()}
            >
                <div>
                    <span className='w-full inline-flex justify-between items-center'>
                        <span className='golden-small font-semibold'>{name}</span>
                        <span className='ml-4'>{price}</span>
                    </span>
                    <p className='font-extralight text-sm'>{description}</p>
                </div>
            </li>
        );
    }

    function ListItem( {id, name, price, description, options = []/* , mediaUrl = null */, hasSubpage = false} ) {
        function showItemSubpage() {
            setIsMainFrameActive( false );
        }
        return (
            <li
                id={'item-' + id}
                className='menu-list-item w-full py-4'
                onClick={() => hasSubpage && showItemSubpage()}
            >
                <div>
                    <span className='w-full inline-flex justify-between items-center'>
                        <span className='vidaloka'>{name}</span>
                        <span className='ml-4'>{price}</span>
                    </span>
                    <p className='font-extralight text-sm'>{description}</p>
                </div>
                {options?.length > 0 && (
                    <ul className='pl-2'>
                        {options.map( ( i, k ) => <li className='text-sm font-extralight pb-2' key={k}>- {i}</li> )}
                    </ul>
                )}
            </li>
        );
    }

    function CategorySection( {title} ) {
        const slug = title.toLowerCase().replace( ' ', '_' )
            , drinks = slug == 'drinks';

        const content = useMemo( () => {
            var data = menuItemData.filter( o => o.categories.includes( slug ) );
            return !drinks
                ? data.map( ( i, k ) => <ListItem
                    key={slug + '_' + k}
                    id={i.id}
                    name={i.title}
                    price={i.price}
                    description={i.description}
                    options={i.options?.split( ',' )}
                /> )
                : data.map( ( i, k ) => <ListItemDrink
                    key={slug + '_' + k}
                    id={i.id}
                    name={i.title}
                    price={i.price}
                    description={i.description}
                /> );
        }, [menuItemData] );

        return content.length !== 0 && (
            <ul
                id={'menu-' + slug}
                className={'relative list-none p-4 m-0 bg-contain'}
            >
                <li className={
                    'menu-list-item w-full pb-4 text-xl text-center uppercase relative z-10 ' +
                    ( drinks ? 'font-semibold golden' : 'font-extralight' )
                }>{title}</li>
                {content}
            </ul>
        );
    }

    async function loadMenuContent() {
        var date = new Date()
            , day = date.getDay()
            , hour = date.getHours().toLocaleString()
            , isWeekend = ( day == 6 && hour >= '20:00:00' ) || day == 0
            , data = await getMenuItems( isWeekend );
        setMenuItemData( data );
    }

    useEffect( () => {
        require( '@/modules/lib/font-awesome' );
        document.title = 'Cardápio Mango Café';
        document.body.classList.add( 'bg-neutral-700' );
        loadMenuContent().then( () => setIsLoading( false ) );
    }, [] );

    useEffect( () => {
        if ( searchInputValue.length > 0 ) {
            var input = searchInputValue.toLowerCase().normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );
            setFilteredMenuData( menuItemData.filter( o =>
                o.title.toLowerCase().includes( input ) || o.description?.toLowerCase().includes( input )
            ) );
        } else setFilteredMenuData( [] );
    }, [searchInputValue] );

    return (
        <main id='menu' onScroll={handleScroll} className='relative bg-[var(--mango-brown)] max-w-[820px] h-full mx-auto shadow-lg overflow-y-overlay'>

            {isLoading && <Loading />}

            {showSearchModal && (
                <div id='search-modal' className='fixed z-50 w-screen h-screen max-w-[820px] overflow-y-scroll top-0 left-1/2 -translate-x-1/2 bg-neutral-950 duration-200 ease-out' style={{opacity: searchModalOpacity}}>
                    <div className='flex items-center p-4 shadow-lg bg-neutral-900'>
                        <div className='flex justify-between items-center w-full bg-neutral-800 rounded-full p-1 px-3'>
                            <i className='fa-solid fa-search opacity-50 mr-2'></i>
                            <input
                                type='text'
                                onInput={e => setSearchInputValue( e.target.value )}
                                value={searchInputValue}
                                placeholder='Procurar no cardápio...'
                                autoFocus={showSearchModal}
                                className=' outline-none grow bg-transparent'
                            />
                        </div>
                        <span className='text-xs ml-2 mango-neon-orange min-w-12 cursor-pointer' onClick={() => toggleSearchModal( false )}>Cancelar</span>
                    </div>
                    <div className='p-4'>
                        <ul className='list-none p-0 m-0'>
                            {filteredMenuData.map( ( i, k ) => <SearchResult
                                key={k}
                                id={i.id}
                                name={i.title}
                                price={i.price}
                                description={i.description}
                            /> )}
                        </ul>
                    </div>
                </div>
            )}

            <div id='search-tab' className='fixed z-40 flex items-center p-4 w-screen max-w-[820px] top-0 left-1/2 -translate-x-1/2  bg-neutral-900 bg-opacity-80 backdrop-blur-sm shadow-lg' style={{opacity: searchTabOpacity, display: searchTabOpacity == 0 && 'none'}}>
                <div className='flex justify-between items-center w-full bg-neutral-800 rounded-full p-1 px-3'>
                    <i className='fa-solid fa-search opacity-50 mr-2'></i>
                    <input type='text' readOnly value={searchInputValue} onFocus={() => toggleSearchModal( true )} placeholder='Procurar no cardápio...' className='bg-neutral-800 outline-none rounded-full grow p-1 px-3' />
                </div>
            </div>

            <div
                id='foreground'
                className='absolute top-0 left-0 w-screen max-w-[820px] h-auto bg-slate-900 pt-28 z-30 shadow-lg duration-200 ease-in-out pr-4 max-[820px]:pr-0'
                style={{transform: `translateX(${isMainFrameActive ? '0' : '-100%'})`}}
                ref={foregroundRef}
            >

                <div id='nav-buttons' className='fixed z-20 block h-10 w-max top-4 right-4'>
                    <button onClick={() => toggleSearchModal( true )} className='rounded-full bg-neutral-900 bg-opacity-75 text-white outline-none border-none p-2 h-full aspect-square'>
                        <i className='fa-solid fa-search'></i>
                    </button>
                </div>

                <div id='menu-header' className='absolute top-0 left-0 w-full h-full mx-auto z-10 bg-contain'>
                    <div className='p-8 flex relative z-20'>
                        <div className='block h-full aspect-square w-12 bg-no-repeat bg-contain' style={{backgroundImage: 'url(/img/svg/mascot.svg)'}}></div>
                        <div>
                            <h1 className='astron mango-neon-orange text-xl'>MANGO</h1>
                            <h1 className='font-extralight tracking-widest'>CAFÉ</h1>
                        </div>
                    </div>
                </div>

                <div id="menu-content" className='relative z-20 w-full max-w-[820px] h-full pt-12 bg-[var(--mango-black)] rounded-2xl shadow-lg'>
                    <CategorySection title='Cozinha' />
                    <CategorySection title='Sushi Bar' />
                    <CategorySection title='Drinks' />
                </div>

                <div id='menu-footer' className='p-8'>
                    <Container className='mx-auto items-center'>
                        <img src="/img/svg/mascot.svg" alt="" draggable="false" className='w-12 mb-2' />
                        <img src="/img/svg/logo.svg" alt="" draggable="false" className='w-36' />
                        <Wrapper className='text-white text-2xl items-center text-center my-4'>
                            <a href={socials.instagram} className='mx-2 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                            </a>
                            <a href={socials.facebook} className='mx-2 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                                <i className="fa-brands fa-facebook" aria-hidden="true"></i>
                            </a>
                            <a href={socials.whatsapp} className='mx-2 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                            </a>
                        </Wrapper>
                        <Container className='text-center'>
                            <p className='text-white text-xs font-extralight'>2024 Mango Café</p>
                            <p className='text-white text-xs font-extralight'>Av. Anchieta 509, São José dos Campos - SP</p>
                        </Container>
                    </Container>
                </div>

            </div>

            <div id='background' className='bg-slate-900 z-[1] w-screen h-full' >

                <div id='bg-nav-buttons' className='absolute block h-10 w-max top-4 left-4'>
                    <button
                        className='rounded-full bg-neutral-900 bg-opacity-75 text-white outline-none border-none p-2 h-full aspect-square'
                        onClick={() => setIsMainFrameActive( true )}
                    >
                        <i className='fa-solid fa-x'></i>
                    </button>
                </div>

                {/* {backgroundFrameContent} */}
            </div>

        </main>
    );
}