"use client";
import {useEffect, useMemo, useRef, useState} from 'react';
import {Section, Content, ContentDefault, Loading} from 'components/layout-components';
import {getMenuItems, updateMenuItem, toggleMenuItem, createMenuItem, removeMenuItem} from '@/modules/controllers/menu';
import {list, scrollToTop} from '@/modules/utils';
import {useRouter} from 'next/navigation';
import {TEInput, TETextarea, TESelect} from 'tw-elements-react';
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
        , [menuClassName, setMenuClassName] = useState( null )
        , [modalClassName, setModalClassName] = useState( null )
        , [formAction, setFormAction] = useState( 'edit' )
        , [tableContent, setTableContent] = useState( null )
        , menuRef = useRef( null )
        , searchInputRef = useRef( null )
        , router = useRouter();

    function toggleSideMenu( bool ) {
        if ( !bool ) {
            setMenuClassName( 'slide-out-right' );
            setModalClassName( 'lighten' );
            setTimeout( () => {
                setShowSideMenu( false );
                setSideMenuContent( null );
            }, 300 );
        } else {
            setMenuClassName( 'slide-in-right' );
            setModalClassName( 'darken' );
            setShowSideMenu( true );
        }
    }

    function newItem() {
        setFormAction( 'create' );
        setSideMenuContent( {} );
    }

    function deleteItem( item ) {
        confirm( `Excluir o item '${item.title}'?\n(Essa ação não pode ser desfeita.)` )
            && removeMenuItem( item.id ).then( () => loadMenuContent() );
    };

    function Menu() {

        const data = sideMenuContent
            , [itemName, setItemName] = useState( data?.title ?? '' )
            , [itemPrice, setItemPrice] = useState( data?.price ?? '' )
            , [itemDescription, setItemDescription] = useState( data?.description ?? '' )
            , [itemOptions, setItemOptions] = useState( data?.options ?? '' )
            , [itemIncluded, setItemIncluded] = useState( data?.showinreduced ?? '' )
            , [itemCategory, setItemCategory] = useState( '' )
            , [submitButtonContent, setSubmitButtonContent] = useState( 'Salvar' );

        const new_data = useMemo( () => {
            return {
                id: data?.id,
                title: itemName,
                price: itemPrice,
                description: itemDescription,
                options: itemOptions,
                showinreduced: itemIncluded,
                categories: itemCategory
            };
        }, [itemName, itemPrice, itemDescription, itemOptions, itemIncluded, itemCategory] );

        const dataHasChanged = useMemo( () => JSON.stringify( new_data ) !== JSON.stringify( data ), [new_data] );

        const categories = [
            {text: "Selecione uma categoria", value: ""},
            {text: "Sushi Bar", value: "sushi_bar"},
            {text: "Cozinha", value: "cozinha"},
            {text: "Bebidas", value: "drinks"},
        ];

        async function saveItem() {
            if ( dataHasChanged ) {

                setSubmitButtonContent( <span className='mango-loading'></span> );

                if ( formAction === 'edit' ) {
                    updateMenuItem( new_data ).then( res => {
                        if ( res?.status === true ) {
                            setSubmitButtonContent( 'Salvar' );
                            loadMenuContent();
                        } else {
                            console.log( res );
                            return;
                        }
                    } );
                }

                if ( formAction === 'create' ) {
                    if ( itemCategory !== '' )
                        createMenuItem( new_data ).then( res => {
                            if ( res?.status === true ) {
                                setSubmitButtonContent( 'Salvar' );
                                loadMenuContent();
                            } else {
                                console.log( res );
                                return;
                            }
                        } );
                    else {
                        alert( "A categoria não pode ficar em branco." );
                        setSubmitButtonContent( 'Salvar' );
                        return;
                    }
                }
            }
        }

        return showSideMenu && (
            <div className={list( 'darken fixed top-0 left-0 w-screen h-screen z-[999] backdrop-blur-[2px]', modalClassName )} data-side-menu>
                <div ref={menuRef} className={list( 'absolute right-0 top-0 bg-neutral-700 h-full pt-8 shadow-md', menuClassName, isMobile ? 'w-screen' : 'w-[36rem]' )}>
                    <div className='w-full flex justify-start items-center px-4 mb-4 cursor-pointer' onClick={() => toggleSideMenu( false )}>
                        <i className="fa-solid fa-xmark fa-2xl" aria-hidden='true'></i>
                    </div>
                    <div id={'edit-item-' + data.id} className='p-4'>
                        <div className='mb-4 w-full p-2'>
                            <h1 className='text-xl font-bold'>{formAction == 'edit'
                                ? `Editar item '${data.title}'`
                                : 'Criar novo item'
                            }</h1>
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput
                                type='text'
                                label='Nome do item'
                                defaultValue={data.title}
                                onInput={e => setItemName( e.target.value )}
                            />
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput
                                type='number'
                                label='Preço'
                                defaultValue={data.price}
                                className='mb-4'
                                onInput={e => setItemPrice( e.target.value )}
                            />
                        </div>
                        <div className='mb-4 w-full'>
                            <TETextarea
                                type='text'
                                label='Descrição'
                                defaultValue={data.description}
                                className='resize-none'
                                onInput={e => setItemDescription( e.target.value )}
                            />
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput
                                type='text'
                                label='Opções'
                                defaultValue={data.options}
                                onInput={e => setItemOptions( e.target.value )}
                            />
                            <span className='w-full text-xs font-extralight italic'>Separar com vírgula</span>
                        </div>
                        {formAction == 'create' && (
                            <div className='mb-4 w-full'>
                                <TESelect
                                    data={categories}
                                    placeholder='Selecione uma categoria'
                                    onValueChange={e => setItemCategory( e.value )}
                                />
                            </div>
                        )}
                        <span className='inline-flex items-center'>
                            <label className='text-sm mr-2'>Incluir no cardápio reduzido?</label>
                            <input
                                type='checkbox'
                                className='m-2'
                                defaultChecked={data.showinreduced}
                                onChange={e => setItemIncluded( e.target.checked )}
                            />
                        </span>
                    </div>
                    <div className='w-full flex items-center px-4'>
                        <button onClick={saveItem} className={'py-1 px-4 mr-2 bg-[var(--mango-neon-orange)] border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md w-max min-w-24 flex justify-center items-center ' + ( !dataHasChanged && ' grayscale pointer-events-none opacity-50' )}>{submitButtonContent}</button>
                        <button onClick={() => toggleSideMenu( false )} className='py-1 px-4 mr-2 mango-neon-orange border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md'>Cancelar</button>
                    </div>
                </div>
            </div>
        );
    };

    function SearchResult( {id, name} ) {
        return <li
            id={id}
            onClick={() => {
                scrollToTop( '#item-' + id );
                setShowSearchModal( false );
                setSearchInputValue( '' );
            }}
            className='menu-list-item bg-inherit w-full hover:bg-neutral-900 duration-100 ease-out cursor-pointer p-4'
        >{name}</li>;
    }

    function TableRow( {data} ) {
        var item = {
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.description,
            options: data.options,
            showinreduced: data.showinreduced
        };
        return !isMobile &&
            (
                <tr id={'item-' + item.id} className='align-middle select-none'>
                    <td>
                        <span className='inline-flex items-center'>
                            <span className='edit-item hover:brightness-75 duration-100 ease-out cursor-pointer' onClick={() => {
                                setFormAction( 'edit' );
                                setSideMenuContent( item );
                            }}></span>
                            {isAdmin && <span className='delete-item hover:brightness-75 duration-100 ease-out cursor-pointer' onClick={() => deleteItem( item )}></span>}
                            {item.title}
                        </span>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.options}</td>
                    <td className='text-center'>
                        <input type='checkbox' defaultChecked={item.showinreduced} onChange={e => toggleMenuItem( item.id, e.target.checked )} />
                    </td>
                </tr>
            );
    }

    async function loadMenuContent() {
        setTableContent( <tr><td colSpan={5}><span className='mango-loading'></span></td></tr> );
        var data = await getMenuItems();
        setMenuItemData( data );
        setSideMenuContent( null );
    }

    useEffect( () => {
        require( '@/modules/lib/font-awesome' );

        document.title = "Mango Café Administração";

        if ( !localStorage.getItem( 'mango-auth-login' ) ) router.push( './login/' );
        else loadMenuContent().then( () => setIsLoading( false ) );

        var userData = JSON.parse( localStorage.getItem( 'mango_login_data' ) );
        setIsAdmin( userData.user.role === 'admin' );

        const checkScreenSize = () => setisMobile( window.visualViewport.width <= 820 );
        checkScreenSize();
        window.visualViewport.addEventListener( 'resize', checkScreenSize );

        return () => window.visualViewport.removeEventListener( 'resize', checkScreenSize );
    }, [] );

    useEffect( () => {
        if ( searchInputValue.length > 0 ) {
            var input = searchInputValue.toLowerCase().normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );
            let filteredData = menuItemData.filter( o => o.title.toLowerCase().includes( input ) || o.description?.toLowerCase().includes( input ) );
            setFilteredMenuData( filteredData );
        }
        else setFilteredMenuData( [] );
    }, [searchInputValue] );

    useEffect( () => {
        let handleClickOutside = e => {
            var t = e.target, input = searchInputRef.current;
            if ( t != input && !input?.contains( t ) ) setShowSearchModal( false );
        };
        window.addEventListener( 'mousedown', handleClickOutside );
        return () => window.removeEventListener( 'mousedown', handleClickOutside );
    }, [showSearchModal] );

    useEffect( () => {
        toggleSideMenu( sideMenuContent !== null );
    }, [sideMenuContent] );

    useEffect( () => {
        menuItemData &&
            setTableContent( menuItemData.map(
                ( i, k ) => <TableRow key={k} data={i} />
            ) );
    }, [menuItemData] );

    return (
        <main className='bg-neutral-800'>

            {isLoading && <Loading />}

            <Menu />

            <div id='dashboard-header' className='relative z-40 flex items-center p-4 w-screen top-0 left-0 bg-neutral-900 shadow-lg'>
                <div className='block h-full aspect-square w-8 bg-no-repeat bg-contain mx-4' style={{backgroundImage: 'url(/img/svg/mascot.svg)'}}></div>
                <a href="/admin/menu/" className='mango-neon-orange font-semibold text-sm hover:underline'>Cardápio</a>
                <span className='mango-neon-orange mx-2 font-semibold'>|</span>
                <a href="/admin/users/" className='mango-neon-orange font-semibold text-sm hover:underline'>Usuários</a>
            </div>

            <Section id='admin-items-list'>
                <Content>
                    <ContentDefault>
                        <div className="flex items-center justify-between mb-4">

                            <div className="flex items-center align-middle">
                                <h1 className='mango-neon-orange text-3xl font-bold mr-4'>Itens do cardápio</h1>
                                {isAdmin && <button className='py-1 px-4 mango-neon-orange border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md' onClick={newItem}>Novo item</button>}
                            </div>

                            <div className='relative flex justify-between items-center w-96 bg-neutral-700 rounded-full p-1 px-3' ref={searchInputRef}>
                                <i className='fa-solid fa-search opacity-50 mr-2'></i>
                                <input
                                    type='text'
                                    value={searchInputValue}
                                    onFocus={() => setShowSearchModal( true )}
                                    onInput={( e ) => setSearchInputValue( e.target.value )}
                                    placeholder='Procurar itens...'
                                    className='bg-transparent outline-none rounded-full grow p-1 px-3'
                                />
                                {showSearchModal && (
                                    <div
                                        id='search-modal'
                                        className='absolute z-50 w-11/12 h-max max-h-96 overflow-y-scroll top-full left-1/2 -translate-x-1/2 translate-y-1 bg-neutral-800 rounded-lg shadow-lg'
                                    >
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
                                )}
                            </div>

                        </div>

                        <table id='admin-list-table' className='max-[820px]:!w-screen shadow-lg'>
                            <thead>
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