import {useRef, useEffect, useState} from 'react';

export default function Fulscreen({children, isActive}) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [modalActive, setModalActive] = useState(isActive);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contentRef.current && !contentRef.current.contains(event.target)) {setModalActive(false);}
        };
        const preventScroll = (e) => {
            e.preventDefault();
        };
        if (modalActive) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('wheel', preventScroll, {passive: false});
            document.addEventListener('touchmove', preventScroll, {passive: false});
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                document.removeEventListener('wheel', preventScroll, {passive: false});
                document.removeEventListener('touchmove', preventScroll, {passive: false});
            };
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('wheel', preventScroll, {passive: false});
            document.removeEventListener('touchmove', preventScroll, {passive: false});
        }
    }, [modalActive]);
    return modalActive && (
        <div className='bg-[rgb(0,0,0,0.3)] backdrop-blur-lg fixed z-[999] top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center px-32 py-20' ref={containerRef}>
            <div className='w-full h-full relative'>
                <div className='w-12 h-12 absolute -top-12 -right-12'>
                    <span className='w-full text-right cursor-pointer' onClick={() => setModalActive(false)}><i className="fa-regular fa-circle-xmark text-2xl" aria-hidden="true"></i></span>
                </div>
                <div className='rounded-lg shadow-lg w-full h-full' ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}