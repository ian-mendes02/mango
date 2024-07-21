"use client";
import {useEffect} from 'react';

export default function Main() {
    useEffect( () => {
        location.href = localStorage.getItem( 'logged_user' )
            ? '/admin/dashboard/'
            : '/admin/login/';
    }, [] );
}