"use client";
import {useEffect, useState} from 'react';
import {Divider, Wrapper, Loading} from 'components/layout-components';
export default function Main() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        require('@/modules/lib/font-awesome');
        document.title = "Mango Café - SJC";
    }, []);
    const socials = {
        instagram: "https://www.instagram.com/mangocafesjc/",
        facebook: "https://www.facebook.com/profile.php?id=61558132046582",
        whatsapp: "https://wa.me/5512997828401"
    };
    useEffect(() => setIsLoading(false), []);
    return (
        <main className='w-full h-full bg-slate-900'>
            {isLoading && <Loading />}
            <div id='menu-mobile' className='relative h-full w-screen max-w-[820px] overflow-hidden mx-auto bg-[var(--mango-tropical-maroon)] shadow-lg before:!blur-sm p-8'>
                <div className="relative z-50">
                    <div className='flex flex-col items-center mango-neon-orange w-full text-center'>
                        <div className="flex items-center my-4">
                            <img src="/img/svg/decor.svg" alt="" draggable='false' className='-scale-y-100 w-12' />
                            <img src="/img/svg/mascot.svg" alt="" draggable='false' className='w-16 mx-4' />
                            <img src="/img/svg/decor.svg" alt="" draggable='false' className='-scale-y-100 -scale-x-100 w-12' />
                        </div>
                        <p className='astron tracking-[.25em] text-xl font-extrabold'>MANGO</p>
                        <p className='astron'>CAFÉ</p>
                        <p className='text-white'>Um novo conceito na gastronomia asiática</p>
                    </div>
                    <Divider className='my-4' />
                    <div className='flex flex-col items-center w-full mango-neon-orange'>
                        <a href='https://www.ifood.com.br/delivery/sao-jose-dos-campos-sp/mango-asian-bar-jardim-nova-america/fc522b92-fc80-42c7-8d14-40d2cb2bf54f?UTM_Medium=share' className='flex justify-center items-center rounded-md border-2 border-[color:var(--mango-neon-orange)] p-2 w-full text-center font-semibold my-2'>
                            <i className='fa-solid fa-bag-shopping mx-2'></i>
                            <span><strong>Delivery</strong></span>
                        </a>
                        <a href='/cardapio-mango.pdf' target='_blank' className='flex justify-center items-center rounded-md border-2 border-[color:var(--mango-neon-orange)] p-2 w-full text-center font-semibold my-2'>
                            <i className='fa-solid fa-utensils mx-2'></i>
                            <span>Nosso <strong>cardápio</strong></span>
                        </a>
                        <a href='/carta-drinks.pdf' target='_blank' className='flex justify-center items-center rounded-md border-2 border-[color:var(--mango-neon-orange)] p-2 w-full text-center font-semibold my-2'>
                            <i className='fa-solid fa-cocktail mx-2'></i>
                            <span>Nossa <strong>carta de drinks</strong></span>
                        </a>
                        <a href='/home' className='flex justify-center items-center rounded-md border-2 border-[color:var(--mango-neon-orange)] p-2 w-full text-center font-semibold my-2'>
                            <i className='fa-solid fa-globe mx-2'></i>
                            <span>Nossa <strong>página da web</strong></span>
                        </a>
                    </div>
                    <Wrapper className='text-white text-2xl justify-center items-center text-center my-4'>
                        <a href={socials.instagram} className='mx-2 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                            <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                        </a>
                        <a href={socials.facebook} className='mx-2 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                            <i className="fa-brands fa-facebook" aria-hidden="true"></i>
                        </a>
                        <a href={socials.whatsapp} className='mx-2 hover:text-[var(--mango-tropical-pink)] cursor-pointer duration-100 ease-out' target='_blank' rel='noopener noreferrer'>
                            <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                        </a>
                    </Wrapper>
                </div>
            </div>
        </main>
    );
}