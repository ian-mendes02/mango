"use client";
import {useEffect, useMemo, useRef, useState} from 'react';
import {Section, Content, ContentDefault, Loading} from 'components/layout-components';
import User from '@/modules/controllers/class-user';
import {deleteUser, getUsers, updateUser, createUser} from '@/modules/controllers/users';
import {list} from '@/modules/utils';
import {useRouter} from 'next/navigation';
import {TEInput, TESelect} from 'tw-elements-react';
export default function Main() {

    const [isLoading, setIsLoading] = useState( true )
        , [isMobile, setIsMobile] = useState( false )
        , [isAdmin, setIsAdmin] = useState( false )
        , [sideMenuContent, setSideMenuContent] = useState( null )
        , [menuItemData, setMenuItemData] = useState( [] )
        , [showSideMenu, setShowSideMenu] = useState( false )
        , [menuClassName, setMenuClassName] = useState( null )
        , [modalClassName, setModalClassName] = useState( null )
        , [formAction, setFormAction] = useState( 'edit' )
        , [tableContent, setTableContent] = useState( null )
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
        confirm( `Excluir o usuário '${user.name}'?\n(Essa ação não pode ser desfeita.)` )
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
                            />
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput
                                type='text'
                                label='Email'
                                defaultValue={user.email}
                                onInput={e => setUserEmail( e.target.value )}
                            />
                        </div>
                        <div className='mb-4 w-full'>
                            <TEInput
                                type='password'
                                label='Senha'
                                defaultValue={user.password}
                                onInput={e => setUserPassword( e.target.value )}
                            />
                        </div>
                        <div className='mb-4 w-full'>
                            <TESelect
                                data={roles}
                                placeholder={role_names[user.role]}
                                onValueChange={e => setUserRole( e.value )}
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
        return !isMobile &&
            (
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
                    <td>{user.email}</td>
                    <td>{role_names[user.role]}</td>
                </tr>
            );
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

        if ( !localStorage.getItem( 'mango-auth-login' ) ) router.push( './login/' );
        else loadMenuContent().then( () => setIsLoading( false ) );

        var userData = JSON.parse( localStorage.getItem( 'mango_login_data' ) );
        setIsAdmin( userData.user.role === 'admin' );

        const checkScreenSize = () => setIsMobile( window.visualViewport.width <= 820 );
        checkScreenSize();
        window.visualViewport.addEventListener( 'resize', checkScreenSize );

        return () => window.visualViewport.removeEventListener( 'resize', checkScreenSize );
    }, [] );

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

            <Section id='admin-users-list'>
                <Content>
                    <ContentDefault>
                        <div className="flex items-center justify-between mb-4">

                            <div className="flex items-center align-middle">
                                <h1 className='mango-neon-orange text-3xl font-bold mr-4'>Usuários cadastrados</h1>
                                <button className='py-1 px-4 mango-neon-orange border border-[color:var(--mango-neon-orange)] duration-150 ease-out hover:brightness-75 rounded-md' onClick={newUser}>Novo Usuário</button>
                            </div>

                        </div>

                        <table id='admin-list-table' className='max-[820px]:!w-screen shadow-lg'>
                            <thead>
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