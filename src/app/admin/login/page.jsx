"use client";
import {verifyUser} from '@/modules/controllers/users';
import {list} from '@/modules/utils';
import {useState, useEffect} from 'react';
import {TEInput} from 'tw-elements-react';
import {Container} from '@/modules/components/layout-components';

export default function Main() {

    const [userEmail, setUserEmail] = useState( '' )
        , [userPassword, setUserPassword] = useState( '' )
        , [passwordVisibility, setPasswordVisibility] = useState( false )
        , [submitButtonContent, setSubmitButtonContent] = useState( 'Entrar' );

    useEffect( () => {
        require( '@/modules/lib/font-awesome' );
        document.title = "Mango Café - Administração";
    }, [] );

    useEffect( () => {
        const handle_keydown = e => e.key === 'Enter' && authLogin();
        window.addEventListener( 'keydown', handle_keydown );
        return () => window.removeEventListener( 'keydown', handle_keydown );
    }, [userEmail, userPassword] );

    async function authLogin() {
        let reset = () => setSubmitButtonContent( 'Entrar' )
            , loading = () => setSubmitButtonContent( <span className='mango-loading'></span> )
            , data;

        if ( userEmail === '' || userPassword === '' ) {
            alert( 'Alguns campos estão em branco.' );
            return;
        } else {
            loading();
            data = {email: userEmail, password: userPassword};
            verifyUser( data ).then( res => {
                if ( 'error' === res.status && res.message === 'user not found' ) {
                    alert( 'Email não encontrado.' );
                    reset();
                    return;
                }
                else if ( 'ok' === res.status ) {
                    if ( !res.data.auth ) {
                        alert( 'Senha incorreta.' );
                        reset();
                        return;
                    } else {
                        reset();
                        localStorage.setItem( 'mango_login_data', JSON.stringify( {
                            auth: res.data.auth,
                            user: res.data.user
                        } ) );
                        location.href = '/admin/menu';
                    }
                }
            } );
        }
    }

    return (
        <main className='mt-24'>
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
                        onChange={( e ) => setUserEmail( e.target.value )}
                        label='Email'
                        className='mb-2' />
                    <div className='relative'>

                        <TEInput
                            name='user_pass'
                            type={passwordVisibility ? 'text' : 'password'}
                            defaultValue=''
                            onChange={( e ) => setUserPassword( e.target.value )}
                            label='Senha'
                            className='mb-2'
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
                    <div className='w-full rounded-md shadow-lg text-center p-2 cursor-pointer select-none bg-[var(--mango-brown)] hover:bg-[var(--mango-neon-orange)] duration-150 ease-out flex items-center justify-center'
                        onClick={authLogin}>
                        {submitButtonContent}
                    </div>
                </form>
            </div>
        </main>
    );
}