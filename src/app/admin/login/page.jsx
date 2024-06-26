/**
 * Login page for admin users.
 * @todo Display error messages on submit.
 * @todo Make the page pretty.
 */

"use client";
import {User} from '@/modules/controllers/db';
import {list} from '@/modules/utils';
import {useState, useEffect} from 'react';
import {TEInput} from 'tw-elements-react';
import {useRouter} from 'next/navigation';

export default function Main() {

    const [userName, setUserName] = useState( '' );
    const [userPassword, setUserPassword] = useState( '' );
    const [passwordVisibility, setPasswordVisibility] = useState( false );
    const router = useRouter();

    useEffect( () => {
        require( '@/modules/lib/font-awesome' );
        document.title = "Mango Café - Admin";
    }, [] );

    useEffect( () => {
        function handle_keydown( e ) {
            if ( e.key === 'Enter' ) auth_login()
        };
        window.addEventListener( 'keydown', handle_keydown );
        return () => window.removeEventListener( 'keydown', handle_keydown );
    }, [userName, userPassword] );

    async function auth_login() {
        if ( userName == '' || userPassword == '' ) {
            return;
        } else {
            var user = new User( userName, userPassword );
            var res = await user.verify();
            console.log( res );
            if ( 'ok' === res.status && res.data === true )
                router.push( './dashboard/' );
        }
    }

    return (
        <main className='w-screen h-screen flex items-center justify-center'>
            <div className='w-96 h-96'>
                <form>
                    <TEInput
                        name='user_name'
                        type='text'
                        defaultValue=''
                        onChange={( e ) => setUserName( e.target.value )}
                        label='Login'
                        className='mb-2'
                    />
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
                            <i
                                className={list(
                                    'fa-regular',
                                    passwordVisibility ? 'fa-eye-slash' : 'fa-eye',
                                    'absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-pointer'
                                )}
                                onClick={() => setPasswordVisibility( !passwordVisibility )}
                            ></i>
                        </span>
                    </div>
                    <div
                        className='w-full rounded-md shadow-lg border border-slate-500 text-center p-2 cursor-pointer select-none hover:bg-slate-900 duration-150 ease-out'
                        onClick={auth_login}
                    >
                        Entrar
                    </div>
                </form>
            </div>
        </main>
    );
}