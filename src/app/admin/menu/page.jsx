"use client";

import {useRouter} from 'next/navigation';
import {useEffect, useMemo, useRef, useState} from 'react';
import {TEInput, TETextarea, TESelect} from 'tw-elements-react';
import {Section, Content, ContentDefault, Loading} from '@/modules/components/layout';
import {getMenuItems, updateMenuItem, toggleMenuItem, createMenuItem, removeMenuItem} from '@/modules/controllers/menu';
import {MenuItem} from '@/modules/controllers/class-menu-item';
import {page, parseLoginData, viewportListener, scrollTo} from '@/modules/utils/pages';
import {sanitize} from '@/modules/utils/strings';


export default function Main() {

    const [isLoading, setIsLoading] = useState( true )
        , [isMobile, setisMobile] = useState( false )
        , [isAdmin, setIsAdmin] = useState( false )
        , [sideMenuContent, setSideMenuContent] = useState( null )
        , [showSearchModal, setShowSearchModal] = useState( false )
        , [menuItemData, setMenuItemData] = useState( [] )
        , [filteredMenuData, setFilteredMenuData] = useState( [] )
        , [searchInputValue, setSearchInputValue] = useState( '' )
        , [showSideMenu, setShowSideMenu] = useState( false )
        , [menuTransition, setMenuTransition] = useState( false )
        , [formAction, setFormAction] = useState( 'edit' )
        , [tableContent, setTableContent] = useState( null )
        , searchInputRef = useRef( null )
        , router = useRouter();

    function toggleSideMenu( content ) {
        if ( content ) {
            setSideMenuContent( content );
            setMenuTransition( true );
            setShowSideMenu( true );
        }
        else {
            setMenuTransition( false );
            setTimeout( () => {
                setShowSideMenu( false );
                setSideMenuContent( null );
            }, 300 );
        }
    }

    function newItem() {
        setFormAction( 'create' );
        toggleSideMenu( {} );
    }

    /**
     * @param {MenuItem} item 
     */
    function deleteItem( item ) {
        confirm( `Excluir o item '${item.title}'?\nEssa ação não pode ser desfeita.` )
            && removeMenuItem( item.id ).then( () => loadMenuContent() );
    };

    /**
     * @param {MenuItem} item 
     */
    function editItem( item ) {
        setFormAction( 'edit' );
        toggleSideMenu( item );
    }

    function Menu() {

        const data = new MenuItem( sideMenuContent )
            , [itemName, setItemName] = useState( data.title )
            , [itemPrice, setItemPrice] = useState( data.price )
            , [itemDescription, setItemDescription] = useState( data.description )
            , [itemOptions, setItemOptions] = useState( data.options )
            , [itemIncluded, setItemIncluded] = useState( data.showinreduced )
            , [itemCategories, setItemCategories] = useState( data.categories )
            , [submitButtonContent, setSubmitButtonContent] = useState( 'Salvar' )
            , edit = formAction == 'edit'
            , create = formAction == 'create'
            , categories = [
                {text: "Selecione uma categoria", value: ""},
                {text: "Sushi Bar", value: "sushi_bar"},
                {text: "Cozinha", value: "cozinha"},
                {text: "Bebidas", value: "drinks"},
            ]

            , reset = () => setSubmitButtonContent( 'Salvar' )
            , loading = () => setSubmitButtonContent( <span className='mango-loading'></span> )
            , dismiss = () => {
                reset();
                setMenuTransition( false );
                loadMenuContent();
            }

            , dataHasChanged = useMemo( () => (
                data.title != itemName
                || data.price != itemPrice
                || data.description != itemDescription
                || data.options != itemOptions
                || data.showinreduced != itemIncluded
                || data.categories != itemCategories
            ), [itemName, itemPrice, itemDescription, itemOptions, itemIncluded, itemCategories, submitButtonContent] );

        function saveItem() {
            if ( dataHasChanged ) {

                if ( itemCategories == '' ) {
                    alert( "A categoria não pode ficar em branco." );
                    reset();
                    return;
                }

                loading();

                var item = new MenuItem( {
                    title: itemName,
                    price: itemPrice,
                    description: itemDescription,
                    options: itemOptions,
                    showinreduced: itemIncluded,
                    categories: itemCategories,
                } );

                if ( edit ) {
                    item.id = data.id;
                    updateMenuItem( item.toJson() )
                        .then( res =>
                            res?.status === true ? dismiss() : console.log( res )
                        );
                }

                if ( create ) {
                    createMenuItem( item.toJson() )
                        .then( res =>
                            res?.status === true ? dismiss() : console.log( res )
                        );
                }
            }
        }

        return (
            <div className={'darken fixed top-0 left-0 w-screen h-screen z-[999] backdrop-blur-[2px] ' + ( menuTransition ? 'darken' : 'lighten' )} data-side-menu>
                <div className={'absolute right-0 top-0 bg-neutral-700 h-full pt-8 shadow-md max-[820px]:!w-screen w-[36rem] ' + ( menuTransition ? 'slide-in-right' : 'slide-out-right' )}>
                    <div className='w-full flex justify-start items-center px-4 mb-4 cursor-pointer' onClick={() => toggleSideMenu( null )}>
                        <i className="fa-solid fa-xmark fa-2xl" aria-hidden='true'></i>
                    </div>
                    <div id={'edit-item-' + ( data.id || 'new-item' )} className='p-4'>
                        <div className='mb-4 w-full p-2'>
                            <h1 className='text-xl font-bold'>{formAction == 'edit' ? `Editar item '${data.title}'` : 'Criar novo item'}</h1>
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput type='text' label='Nome do item' defaultValue={data.title} onInput={e => setItemName( e.target.value )} className='text-white' />
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput type='number' label='Preço' defaultValue={data.price} className='mb-4 text-white' onInput={e => setItemPrice( e.target.value )} />
                        </div>
                        <div className='mb-4 w-full'>
                            <TETextarea type='text' label='Descrição' defaultValue={data.description} className='resize-none text-white' onInput={e => setItemDescription( e.target.value )} />
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput type='text' label='Opções' defaultValue={data.options} onInput={e => setItemOptions( e.target.value )} className='text-white' />
                            <span className='w-full text-xs font-extralight italic'>Separar com vírgula</span>
                        </div>
                        {formAction == 'create' && (
                            <div className='mb-4 w-full'>
                                <TESelect data={categories} placeholder='Selecione uma categoria' onValueChange={e => setItemCategories( e.value )} className='text-white' />
                            </div>
                        )}
                        <span className='inline-flex items-center'>
                            <label className='text-sm mr-2'>Incluir no cardápio reduzido?</label>
                            <input type='checkbox' className='m-2 text-white' defaultChecked={data.showinreduced} onChange={e => setItemIncluded( e.target.checked )} />
                        </span>
                    </div>
                    <div className='w-full flex items-center px-4'>
                        <button onClick={saveItem}
                            className={'py-1 px-4 mr-2 bg-[var(--mango-neon-orange)] border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md w-max min-w-24 flex justify-center items-center ' + ( !dataHasChanged && ' grayscale pointer-events-none opacity-50' )}>
                            {submitButtonContent}
                        </button>

                        <button onClick={() => toggleSideMenu( null )} className='py-1 px-4 mr-2 mango-neon-orange border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md'>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    function SearchResult( {id, name} ) {
        return <li
            id={id}
            onClick={() => {
                scrollTo( '#item-' + id );
                setShowSearchModal( false );
                setSearchInputValue( '' );
            }}
            className='menu-list-item bg-inherit w-full hover:bg-neutral-900 duration-100 ease-out cursor-pointer p-4'
        >{name}</li>;
    }

    /**
     * @param {object} props 
     * @param {MenuItem} props.data 
     */
    function TableRow( {data} ) {
        var item = new MenuItem( data );
        return (
            <tr
                id={'item-' + item.id}
                className='align-middle select-none'
                onClick={() => isMobile && editItem( item )}
            >
                <td>
                    <span className='inline-flex items-center'>
                        <span className='edit-item hover:brightness-75 duration-100 ease-out cursor-pointer' onClick={() => editItem( item )}></span>
                        {isAdmin && <span className='delete-item hover:brightness-75 duration-100 ease-out cursor-pointer' onClick={() => deleteItem( item )}></span>}
                        {item.title}
                    </span>
                </td>
                <td className='max-[820px]:hidden'>{item.price}</td>
                <td className='max-[820px]:hidden'>{item.description}</td>
                <td className='max-[820px]:hidden'>{item.options}</td>
                <td className='text-center max-[820px]:hidden'>
                    <input type='checkbox' defaultChecked={item.showinreduced} onChange={e => toggleMenuItem( item.id, e.target.checked )} />
                </td>
            </tr>
        );
    }

    function logout() {
        localStorage.removeItem( 'mango_login_data' );
        router.push( '/admin/login/' );
    }

    async function loadMenuContent() {
        !isLoading && setIsLoading( true );
        var data = await getMenuItems();
        setShowSideMenu( false );
        setSideMenuContent( null );
        setMenuItemData( data );
        setIsLoading( false );
    }

    useEffect( () => {
        const listener = viewportListener( setisMobile );
        page( "Mango Café - Administração" );
        parseLoginData( router, setIsAdmin );
        listener.add();
        loadMenuContent().then( () => setIsLoading( false ) );
        return listener.remove;
    }, [] );

    useEffect( () => setFilteredMenuData(
        searchInputValue.length > 0 ? menuItemData.filter( o =>
            sanitize( o.title + o.description || '' )
                .includes( sanitize( searchInputValue ) )
        ) : []
    ), [searchInputValue] );

    useEffect( () => {
        let handleClickOutside = e => {
            var t = e.target, input = searchInputRef.current;
            t != input && !input?.contains( t ) && setShowSearchModal( false );
        };
        window.addEventListener( 'mousedown', handleClickOutside );
        return () => window.removeEventListener( 'mousedown', handleClickOutside );
    }, [showSearchModal] );

    useEffect( () =>
        menuItemData && setTableContent(
            menuItemData.map( ( i, k ) => <TableRow key={k} data={i} /> )
        )
        , [menuItemData] );

    return (
        <main className='bg-neutral-800'>

            {isLoading && <Loading />}

            {showSideMenu && <Menu />}

            <div id='dashboard-header' className='relative z-40 flex items-center p-4 w-screen top-0 left-0 bg-neutral-900 shadow-lg'>
                <div className='block h-full aspect-square w-8 bg-no-repeat bg-contain mx-4' style={{backgroundImage: 'url(/img/svg/mascot.svg)'}}></div>
                <a href="/admin/menu/" className='mango-neon-orange font-semibold text-sm hover:underline'>Cardápio</a>
                <span className='mango-neon-orange mx-2 font-semibold'>|</span>
                <a href="/admin/users/" className='mango-neon-orange font-semibold text-sm hover:underline'>Usuários</a>
                <span className='mango-neon-orange mx-2 font-semibold'>|</span>
                <a href="#" className='mango-neon-orange font-semibold text-sm hover:underline' onClick={logout}>Sair</a>
            </div>

            <Section id='admin-items-list' className='max-[820px]:pt-4'>
                <Content>
                    <ContentDefault>
                        <div className="flex items-center justify-between mb-4">

                            <div className="flex items-center align-middle max-[820px]:hidden">
                                <h1 className='mango-neon-orange text-3xl font-bold mr-4'>Itens do cardápio</h1>
                                {isAdmin && <button className='py-1 px-4 mango-neon-orange border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md' onClick={newItem}>Novo item</button>}
                            </div>

                            <div className='relative flex justify-between items-center w-96 bg-neutral-700 rounded-full p-1 px-3 max-[820px]:w-full' ref={searchInputRef}>
                                <i className='fa-solid fa-search opacity-50 mr-2'></i>
                                <input
                                    type='text'
                                    value={searchInputValue}
                                    onFocus={() => setShowSearchModal( true )}
                                    onInput={e => setSearchInputValue( e.target.value )}
                                    placeholder='Procurar itens...'
                                    className='bg-transparent outline-none rounded-full grow p-1 px-3'
                                />
                                {showSearchModal && (
                                    <div
                                        id='search-modal'
                                        className='absolute z-50 w-11/12 h-max max-h-96 overflow-y-scroll top-full left-1/2 -translate-x-1/2 translate-y-1 bg-neutral-800 rounded-lg shadow-lg'
                                    >
                                        {filteredMenuData.length > 0 && <ul className='list-none p-0 m-0'>
                                            {filteredMenuData.map( ( i, k ) => <SearchResult
                                                key={k}
                                                id={i.id}
                                                name={i.title}
                                                price={i.price}
                                                description={i.description}
                                            /> )}
                                        </ul>}
                                    </div>
                                )}
                            </div>
                            {isMobile && isAdmin && <button className='h-8 min-w-8 mango-neon-orange border-2 border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-full font-bold ml-2' onClick={newItem}>+</button>}
                        </div>

                        <table id='admin-list-table' className='max-[820px]:!w-full shadow-lg'>
                            <thead className='max-[820px]:hidden'>
                                <tr className='bg-neutral-900'>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Descrição</th>
                                    <th>Opções</th>
                                    <th>Incluir no reduzido?</th>
                                </tr>
                            </thead>
                            <tbody>{tableContent}</tbody>
                        </table>
                    </ContentDefault>
                </Content>
            </Section>

        </main>
    );
}