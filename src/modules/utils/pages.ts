"use client";

import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {SetStateAction, Dispatch} from "react";

type LoginData = undefined | {
    keep_active: boolean,
    auth: boolean,
    user: {
        name: string,
        email: string,
        role: string;
    };
};

type SetState<S> = Dispatch<SetStateAction<S>>;

type NodeLike = HTMLElement | string;

type Listener = {
    add: ( e?: Event ) => void,
    remove: ( e?: Event ) => void;
};

export function parseLoginData( router: AppRouterInstance, setIsAdmin: SetState<boolean> ): LoginData {
    const data = localStorage?.getItem( 'mango_login_data' );
    let user: LoginData;
    if ( data ) {
        user = JSON.parse( data );
        !user?.auth && router.replace( '/admin/login/' );
        setIsAdmin( user?.user.role === 'admin' );
    }
    return user;
}

export function viewportListener( setIsMobile: SetState<boolean> ): Listener {
    const viewport = window?.visualViewport
        , listener: Listener = {add: () => void 0, remove: () => void 0};
    if ( viewport ) {
        const vw = () => setIsMobile( viewport.width <= 820 );
        vw();
        listener.add = () => viewport.addEventListener( 'resize', vw );
        listener.remove = () => viewport.removeEventListener( 'resize', vw );
    }
    return listener;
}

export function page( title?: string ): void {
    require( '@/modules/lib/font-awesome' );
    document.title = title || 'Document';
}

export function getElement( el: NodeLike ): HTMLElement | null {
    return typeof el === 'string' ? document.querySelector( el ) : el;
}

export function scrollTo( el: NodeLike, position: ScrollLogicalPosition = 'start' ): void {
    getElement( el )?.scrollIntoView( {block: position, behavior: 'smooth'} );
};