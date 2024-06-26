"use client";
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Main() {
    const [ loggedUser, setLoggedUser ] = useState( false );
    useEffect( () => setLoggedUser( localStorage.getItem( 'logged_user' ), [] ) );
    loggedUser 
        ? redirect('./admin/dashboard', 'push')
        : redirect('./admin/login', 'push');
}