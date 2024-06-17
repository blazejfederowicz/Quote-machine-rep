import React, {useEffect} from 'react';
import useThrottle from './custom-hooks/useThrottle';
import './Navbar.css'

const Navbar = () =>{

    useEffect(()=>{
        const navContainer = document.querySelector('.nav-container');
        const mobile = window.matchMedia('only screen and (min-width: 768px)').matches;
        let lastScrollPosition = 0;

        const handleScroll = () =>{
            const scrollPosition = window.scrollY !== undefined ? window.scrollY : document.documentElement.scrollTop;

            if(scrollPosition > lastScrollPosition){
                navContainer.style.top = '-72px';
            }
            else if(scrollPosition < lastScrollPosition){
                navContainer.style.top = '0';
            }
            lastScrollPosition = Math.max(scrollPosition,0);
        };

        const throttledHandleScroll = useThrottle(handleScroll,10)
        document.addEventListener('scroll', throttledHandleScroll, {passive:true});

        if(!mobile){
            document.removeEventListener('scroll', throttledHandleScroll);
        }

        return()=>{
            document.removeEventListener('scroll', throttledHandleScroll);
        };
    },[])

    return(
        <div className="nav-container">
            <nav className="navbar">
                <ul className="nav-ul">
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#quote-box">Quote Machine</a></li>
                    <li><a href="#footer">Contact</a></li>
                </ul>
            </nav>
        </div>
    )
} 

export default Navbar