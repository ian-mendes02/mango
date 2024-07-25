"use client";
import {useEffect} from 'react';

export default function Main() {
    useEffect( () => {
        var data = JSON.parse( localStorage.getItem( 'mango_login_data' ) );
        location.href = data?.auth ? '/admin/menu/' : '/admin/login/';
    }, [] );
}