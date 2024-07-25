"use client";

import {useRouter} from 'next/navigation';
import {TEInput, TESelect} from 'tw-elements-react';
import {User} from 'controllers/class-user';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Section, Content, ContentDefault, Loading} from 'components/layout';
import {deleteUser, getUsers, updateUser, createUser} from 'controllers/users';
import {page, parseLoginData, viewportListener, scrollTo} from 'utils/pages';

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
        , [formAction, setFormAction] = useState( 'edit' )
        , [tableContent, setTableContent] = useState( null )
        , [menuTransition, setMenuTransition] = useState( false )
        , searchInputRef = useRef( null )
        , router = useRouter()
        , role_names = {
            'employee': 'Funcionário',
            'admin': 'Administrador'
        };

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

    function newUser() {
        setFormAction( 'create' );
        toggleSideMenu( {} );
    }

    function removeUser( user ) {
        confirm( `Excluir o usuário '${user.name}'?\nEssa ação não pode ser desfeita.` )
            && deleteUser( user.id ).then( () => loadMenuContent() );
    };

    function editUser( user ) {
        setFormAction( 'edit' );
        toggleSideMenu( user );
    }

    function Menu() {

        const data = new User( sideMenuContent )
            , [userName, setUserName] = useState( data.name )
            , [userPassword, setUserPassword] = useState( data.password )
            , [userRole, setUserRole] = useState( data.role )
            , [userEmail, setUserEmail] = useState( data.email )
            , [submitButtonContent, setSubmitButtonContent] = useState( 'Salvar' )
            , edit = formAction == 'edit'
            , create = formAction == 'create'
            , roles = [
                {text: "Selecione uma função", value: ""},
                {text: "Funcionário", value: "employee"},
                {text: "Administrador", value: "admin"},
            ]

            , reset = () => setSubmitButtonContent( 'Salvar' )
            , loading = () => setSubmitButtonContent( <span className='mango-loading'></span> )
            , dismiss = () => {
                reset();
                setMenuTransition( false );
                loadMenuContent();
            }

            , dataHasChanged = useMemo( () => (
                data.name != userName
                || data.password != userPassword
                || data.role != userRole
                || data.email != userEmail
            ), [userName, userPassword, userRole, userEmail] );

        async function saveUser() {
            if ( dataHasChanged ) {

                if ( userName == '' || userRole == '' || userPassword == '' || userEmail == '' ) {
                    alert( "Campos não podem ficar em branco." );
                    reset();
                    return;
                }

                loading();

                let user = new User( {
                    id: edit ? data.id : null,
                    name: userName,
                    password: userPassword,
                    email: userEmail,
                    role: userRole
                } );

                if ( edit ) updateUser( user.toJson() )
                    .then( res => res?.status
                        ? dismiss()
                        : console.log( res )
                    );

                if ( create ) createUser( user.toJson() )
                    .then( res => res?.status
                        ? dismiss()
                        : console.log( res )
                    );

            }
        }

        return (
            <div className={'darken fixed top-0 left-0 w-screen h-screen z-[999] backdrop-blur-[2px] ' + ( menuTransition ? 'darken' : 'lighten' )} data-side-menu>
                <div className={'absolute right-0 top-0 bg-neutral-700 h-full pt-8 shadow-md w-[36rem] max-[820px]:w-screen ' + ( menuTransition ? 'slide-in-right' : 'slide-out-right' )}>
                    <div className='w-full flex justify-start items-center px-4 mb-4 cursor-pointer' onClick={() => toggleSideMenu( null )}>
                        <i className="fa-solid fa-xmark fa-2xl" aria-hidden='true'></i>
                    </div>
                    <div className='p-4'>
                        <div className='mb-4 w-full p-2'>
                            <h1 className='text-xl font-bold'>{edit ? `Editar usuário '${data.name}'` : 'Criar novo usuário'}</h1>
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput type='text' label='Nome do usuário' defaultValue={data.name} onInput={e => setUserName( e.target.value )} className='text-white' />
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput type='text' label='Email' defaultValue={data.email} onInput={e => setUserEmail( e.target.value )} className='text-white' />
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput type='password' label='Senha' defaultValue={data.password} onInput={e => setUserPassword( e.target.value )} className='text-white' />
                        </div>
                        <div className='mb-4 w-full'>
                            <TESelect data={roles} placeholder={role_names[data.role]} onValueChange={e => setUserRole( e.value )} className='text-white' />
                        </div>
                    </div>
                    <div className='w-full flex items-center px-4'>
                        <button onClick={saveUser}
                            className={'py-1 px-4 mr-2 bg-[var(--mango-neon-orange)] border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md w-max min-w-24 flex justify-center items-center ' + ( !dataHasChanged && ' grayscale pointer-events-none opacity-50' )}>
                            {submitButtonContent}
                        </button>
                        <button onClick={() => toggleSideMenu( null )}
                            className='py-1 px-4 mr-2 mango-neon-orange border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md'>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    function TableRow( {data} ) {
        var user = new User( data );
        return (
            <tr
                id={'user-' + ( user.id || 'new-item' )}
                className='align-middle select-none'
                onClick={() => isMobile && isAdmin && editUser( user )}
            >
                <td>
                    {isAdmin
                        ? <span className='inline-flex items-center'>
                            {isAdmin && <span className='edit-item hover:brightness-75 duration-100 ease-out cursor-pointer'
                                onClick={() => editUser( user )}
                            ></span>}
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
                scrollTo( '#item-' + id );
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
        !isLoading && setIsLoading( true );
        var data = await getUsers();
        setShowSideMenu( false );
        setSideMenuContent( null );
        setMenuItemData( data );
        setIsLoading( false );
    }

    useEffect( () => {
        const listener = viewportListener( setIsMobile );
        page( "Mango Café - Administração" );
        parseLoginData( router, setIsAdmin );
        listener.add();
        loadMenuContent().then( () => setIsLoading( false ) );
        return listener.remove;
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
        menuItemData &&
            setTableContent( menuItemData.map(
                ( i, k ) => <TableRow key={k} data={i} />
            ) );
    }, [menuItemData] );

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

            <Section id='admin-users-list' className='max-[820px]:pt-4'>
                <Content>
                    <ContentDefault>
                        <div className="flex items-center justify-between mb-4">

                            <div className="flex items-center align-middle max-[820px]:hidden">
                                <h1 className='mango-neon-orange text-3xl font-bold mr-4'>Usuários cadastrados</h1>
                                {isAdmin && <button className='py-1 px-4 mango-neon-orange border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md' onClick={newUser}>Novo usuário</button>}
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