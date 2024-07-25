"use client";
import {Container, Loading} from '@/modules/components/layout';
import {verifyUser} from '@/modules/controllers/users';
import {list} from '@/modules/utils/strings';
import {page} from '@/modules/utils/pages';
import {useState, useEffect} from 'react';
import {TEInput} from 'tw-elements-react';
import {useRouter} from 'next/navigation';

export default function Main() {

    const [isLoading, setIsLoading] = useState( true )
        , [userEmail, setUserEmail] = useState( '' )
        , [userPassword, setUserPassword] = useState( '' )
        , [passwordVisibility, setPasswordVisibility] = useState( false )
        , [submitButtonContent, setSubmitButtonContent] = useState( 'Entrar' )
        , [rememberLogin, setRememberLogin] = useState( false )
        , router = useRouter()
        , push = () => router.push( '/admin/menu/' )
        , reset = () => setSubmitButtonContent( 'Entrar' )
        , loading = () => setSubmitButtonContent( <span className='mango-loading'></span> )
        , quit = str => {
            reset();
            alert( str );
            return;
        };

    function authLogin() {

        if ( userEmail === '' || userPassword === '' ) quit( 'Alguns campos estão em branco.' );

        else {
            loading();
            verifyUser( {email: userEmail, password: userPassword} ).then( res => {

                if ( res ) {
                    res = JSON.parse( res );
                    console.log( res );

                    if ( 'error' === res.status && res.message === 'user not found' )
                        quit( 'Email não encontrado.' );

                    else if ( 'ok' === res.status ) {
                        if ( !res.data.auth )
                            quit( 'Senha incorreta.' );

                        else {
                            reset();
                            localStorage.setItem( 'mango_login_data', JSON.stringify( {
                                auth: res.data.auth,
                                user: res.data.user,
                                keep_active: rememberLogin
                            } ) );
                            push();
                        }
                    }
                }
            } );
        }
    }

    useEffect( () => {
        page( "Mango Café - Administração" );
        let handle_keydown = e => e.key === 'Enter' && authLogin();
        window.addEventListener( 'keydown', handle_keydown );
        setIsLoading( false );
        return () => window.removeEventListener( 'keydown', handle_keydown );
    }, [] );

    return (
        <main className='pt-24'>

            {isLoading && <Loading />}

            <div className='w-full max-w-[320px] mx-auto'>
                <Container className='items-center m-2'>
                    <div className="flex items-center m-2">
                        <img src="/img/svg/decor.svg" alt="" draggable='false' className='-scale-y-100 w-12' />
                        <img src="/img/svg/mascot.svg" alt="" draggable='false' className='w-10 mx-4' />
                        <img src="/img/svg/decor.svg" alt="" draggable='false' className='-scale-y-100 -scale-x-100 w-12' />
                    </div>
                    <span className='mango-neon-orange astron text-3xl'>MANGO</span>
                    <span className='text-white font-extralight text-sm'>ADMINISTRAÇÃO</span>
                </Container>
                <form>
                    <TEInput
                        name='user_email'
                        type='email'
                        defaultValue=''
                        onChange={e => setUserEmail( e.target.value )}
                        label='Email'
                        className='mb-2 text-white'
                    />

                    <div className='relative'>
                        <TEInput
                            name='user_pass'
                            type={passwordVisibility ? 'text' : 'password'}
                            defaultValue=''
                            onChange={e => setUserPassword( e.target.value )}
                            label='Senha'
                            className='mb-2 text-white'
                        />

                        <span className='absolute block w-12 h-12 right-0 top-1/2 -translate-y-1/2'>
                            <i className={list(
                                'fa-regular',
                                passwordVisibility ? 'fa-eye-slash' : 'fa-eye',
                                'absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-pointer'
                            )}
                                onClick={() => setPasswordVisibility( !passwordVisibility )}
                            ></i>
                        </span>
                    </div>

                    <span className='inline-flex items-center'>
                        <input
                            type='checkbox'
                            className='m-2 !border text-white'
                            checked={rememberLogin}
                            onChange={e => setRememberLogin( e.target.checked )}
                        />
                        <label className='text-sm ml-2 cursor-pointer select-none' onClick={() => setRememberLogin( !rememberLogin )}>Manter login</label>
                    </span>

                    <div className={userEmail == '' || userPassword == ''
                        ? 'w-full rounded-md shadow-lg text-center p-2 cursor-pointer select-none bg-[var(--mango-neon-orange)] grayscale-[75%] opacity-75 my-2'
                        : 'w-full rounded-md shadow-lg text-center p-2 cursor-pointer select-none bg-[var(--mango-neon-orange)] my-2'
                    }
                        onClick={() => userEmail != '' && userPassword != '' && authLogin()}>
                        {submitButtonContent}
                    </div>
                </form>
            </div>
        </main>
    );
}