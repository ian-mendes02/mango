"use client";

import {list} from '@/modules/utils';
import {useRouter} from 'next/navigation';
import {scrollToTop} from '@/modules/utils';
import {TEInput, TESelect} from 'tw-elements-react';
import User from '@/modules/controllers/class-user';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Section, Content, ContentDefault, Loading} from 'components/layout-components';
import {deleteUser, getUsers, updateUser, createUser} from '@/modules/controllers/users';

export default function Main() {

    const [isLoading, setIsLoading] = useState( true )
        , [isMobile, setIsMobile] = useState( false )
        , [isAdmin, setIsAdmin] = useState( false )
        , [sideMenuContent, setSideMenuContent] = useState( null )
        , [showSearchModal, setShowSearchModal] = useState( false )
        , [filteredMenuData, setFilteredMenuData] = useState( [] )
        , [searchInputValue, setSearchInputValue] = useState( '' )
        , [menuItemData, setMenuItemData] = useState( [] )
        , [showSideMenu, setShowSideMenu] = useState( false )
        , [menuClassName, setMenuClassName] = useState( null )
        , [modalClassName, setModalClassName] = useState( null )
        , [formAction, setFormAction] = useState( 'edit' )
        , [tableContent, setTableContent] = useState( null )
        , searchInputRef = useRef( null )
        , menuRef = useRef( null )
        , router = useRouter()
        , role_names = {
            'employee': 'Funcionário',
            'admin': 'Administrador'
        };

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

    function newUser() {
        setFormAction( 'create' );
        setSideMenuContent( {} );
    }

    function removeUser( user ) {
        confirm( `Excluir o usuário '${user.name}'?\nEssa ação não pode ser desfeita.` )
            && deleteUser( user.id ).then( () => loadMenuContent() );
    };

    function Menu() {

        const user = sideMenuContent
            , [userName, setUserName] = useState( user?.name ?? '' )
            , [userPassword, setUserPassword] = useState( user?.password ?? '' )
            , [userRole, setUserRole] = useState( user?.role ?? '' )
            , [userEmail, setUserEmail] = useState( user?.email ?? '' )
            , [submitButtonContent, setSubmitButtonContent] = useState( 'Salvar' )

            , new_user = useMemo( () => {
                return {
                    id: user?.id,
                    name: userName,
                    password: userPassword,
                    role: userRole,
                    email: userEmail,
                };
            }, [userName, userPassword, userRole, userEmail] )

            , dataHasChanged = useMemo( () => JSON.stringify( new_user ) !== JSON.stringify( user ), [new_user] )

            , roles = [
                {text: "Selecione uma função", value: ""},
                {text: "Funcionário", value: "employee"},
                {text: "Administrador", value: "admin"},
            ]

            , loading = () => setSubmitButtonContent( <span className='mango-loading'></span> )
            , reset = () => setSubmitButtonContent( 'Salvar' );

        async function saveUser() {
            var __user;
            if ( dataHasChanged ) {
                if ( userName == '' || userRole == '' || userPassword == '' || userEmail == '' ) {
                    alert( "Campos não podem ficar em branco." );
                    reset();
                    return;
                }
                else {
                    loading();

                    __user = await User.instance( new_user );

                    formAction === 'edit' && updateUser( JSON.stringify( __user ) )
                        .then( res => {
                            if ( res?.status === true ) {
                                reset();
                                loadMenuContent();
                            } else {
                                console.log( res );
                                return;
                            }
                        } );

                    formAction === 'create' && createUser( JSON.stringify( __user ) )
                        .then( res => {
                            if ( res?.status === true ) {
                                reset();
                                loadMenuContent();
                            } else {
                                console.log( res );
                                return;
                            }
                        } );
                }
            }
        }

        return showSideMenu && (
            <div className={list( 'darken fixed top-0 left-0 w-screen h-screen z-[999] backdrop-blur-[2px]', modalClassName )} data-side-menu>
                <div ref={menuRef} className={list( 'absolute right-0 top-0 bg-neutral-700 h-full pt-8 shadow-md', menuClassName, isMobile ? 'w-screen' : 'w-[36rem]' )}>
                    <div className='w-full flex justify-start items-center px-4 mb-4 cursor-pointer' onClick={() => toggleSideMenu( false )}>
                        <i className="fa-solid fa-xmark fa-2xl" aria-hidden='true'></i>
                    </div>
                    <div className='p-4'>
                        <div className='mb-4 w-full p-2'>
                            <h1 className='text-xl font-bold'>{formAction == 'edit'
                                ? `Editar usuário '${user.name}'`
                                : 'Criar novo usuário'
                            }</h1>
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput
                                type='text'
                                label='Nome do usuário'
                                defaultValue={user.name}
                                onInput={e => setUserName( e.target.value )}
                                className='text-white'
                            />
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput
                                type='text'
                                label='Email'
                                defaultValue={user.email}
                                onInput={e => setUserEmail( e.target.value )}
                                className='text-white'
                            />
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput
                                type='password'
                                label='Senha'
                                defaultValue={user.password}
                                onInput={e => setUserPassword( e.target.value )}
                                className='text-white'
                            />
                        </div>
                        <div className='mb-4 w-full'>
                            <TESelect
                                data={roles}
                                placeholder={role_names[user.role]}
                                onValueChange={e => setUserRole( e.value )}
                                className='text-white'
                            />
                        </div>
                    </div>
                    <div className='w-full flex items-center px-4'>
                        <button onClick={saveUser} className={'py-1 px-4 mr-2 bg-[var(--mango-neon-orange)] border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md w-max min-w-24 flex justify-center items-center ' + ( !dataHasChanged && ' grayscale pointer-events-none opacity-50' )}>{submitButtonContent}</button>
                        <button onClick={() => toggleSideMenu( false )} className='py-1 px-4 mr-2 mango-neon-orange border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md'>Cancelar</button>
                    </div>
                </div>
            </div>
        );
    };

    function TableRow( {data} ) {
        var user = {
            id: data.id,
            name: data.name,
            password: data.password,
            role: data.role,
            email: data.email
        };
        return (
            <tr id={'user-' + user.id} className='align-middle select-none'>
                <td>
                    {isAdmin
                        ? <span className='inline-flex items-center'>
                            <span className='edit-item hover:brightness-75 duration-100 ease-out cursor-pointer' onClick={() => {
                                setFormAction( 'edit' );
                                setSideMenuContent( user );
                            }}></span>
                            <span className='delete-item hover:brightness-75 duration-100 ease-out cursor-pointer' onClick={() => removeUser( user )}></span>
                            {user.name}
                        </span>
                        : user.name
                    }
                </td>
                <td className='max-[820px]:hidden'>{user.email}</td>
                <td className='max-[820px]:hidden'>{role_names[user.role]}</td>
            </tr>
        );
    }

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

    function logout() {
        localStorage.removeItem( 'mango_login_data' );
        router.push( '/admin/login/' );
    }

    async function loadMenuContent() {
        setTableContent( <tr><td colSpan={3}><span className='mango-loading'></span></td></tr> );
        var data = await getUsers();
        setMenuItemData( data );
        setSideMenuContent( null );
    }

    useEffect( () => {
        require( '@/modules/lib/font-awesome' );
        document.title = "Mango Café Administração";
        var userData = JSON.parse( localStorage.getItem( 'mango_login_data' ) );

        if ( !userData?.auth ) router.replace( '/admin/login/' );
        else loadMenuContent().then( () => setIsLoading( false ) );

        setIsAdmin( userData?.user.role === 'admin' );

        const checkScreenSize = () => setIsMobile( window.visualViewport.width <= 820 );
        checkScreenSize();
        window.visualViewport.addEventListener( 'resize', checkScreenSize );

        return () => window.visualViewport.removeEventListener( 'resize', checkScreenSize );
    }, [] );

    useEffect( () => {
        if ( searchInputValue.length > 0 ) {
            var input = searchInputValue.toLowerCase().normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );
            setFilteredMenuData( menuItemData.filter(
                o => o.name.toLowerCase().includes( input ) || o.email?.toLowerCase().includes( input )
            ) );
        } else setFilteredMenuData( [] );
    }, [searchInputValue] );

    useEffect( () => {
        let handleClickOutside = e => {
            var t = e.target, input = searchInputRef.current;
            t != input && !input?.contains( t ) && setShowSearchModal( false );
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
                <span className='mango-neon-orange mx-2 font-semibold'>|</span>
                <a href="#" className='mango-neon-orange font-semibold text-sm hover:underline' onClick={logout}>Sair</a>
            </div>

            <Section id='admin-users-list' className='max-[820px]:pt-4'>
                <Content>
                    <ContentDefault>
                        <div className="flex items-center justify-between mb-4">

                            <div className="flex items-center align-middle max-[820px]:hidden">
                                <h1 className='mango-neon-orange text-3xl font-bold mr-4'>Itens do cardápio</h1>
                                {isAdmin && <button className='py-1 px-4 mango-neon-orange border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md' onClick={newUser}>Novo item</button>}
                            </div>

                            <div className='relative flex justify-between items-center w-96 bg-neutral-700 rounded-full p-1 px-3 max-[820px]:w-full' ref={searchInputRef}>
                                <i className='fa-solid fa-search opacity-50 mr-2'></i>
                                <input
                                    type='text'
                                    value={searchInputValue}
                                    onFocus={() => setShowSearchModal( true )}
                                    onInput={e => setSearchInputValue( e.target.value )}
                                    placeholder='Procurar usuários...'
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
                                                name={i.name}
                                            /> )}
                                        </ul>}
                                    </div>
                                )}
                            </div>
                            {isMobile && isAdmin && <button className='h-8 min-w-8 mango-neon-orange border-2 border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-full font-bold ml-2' onClick={newUser}>+</button>}
                        </div>

                        <table id='admin-list-table' className='max-[820px]:!w-w-full shadow-lg'>
                            <thead className='max-[820px]:hidden'>
                                <tr className='bg-neutral-900'>
                                    <th className='text-left'>Nome</th>
                                    <th className='text-left'>Email</th>
                                    <th className='text-left'>Função</th>
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