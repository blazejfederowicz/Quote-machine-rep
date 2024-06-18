import React, {useEffect,useRef} from 'react';
import useThrottle from './custom-hooks/useThrottle';
import './Navbar.css'

const Navbar = () =>{
    const lastScrollPosition = useRef(0);
    const navContainerRef = useRef(null);
    const hamContainerRef = useRef(null);

    const handleScroll = () =>{
        const navContainer = navContainerRef.current;
        const scrollPosition = window.scrollY !== undefined ? window.scrollY : document.documentElement.scrollTop;

        if(scrollPosition > lastScrollPosition.current){
            navContainer.style.top = '-72px';
        }
        else if(scrollPosition < lastScrollPosition.current){
            navContainer.style.top = '0';
        }
        lastScrollPosition.current = Math.max(scrollPosition,0);
    };

    const throttledHandleScroll = useThrottle(handleScroll,10)

    useEffect(()=>{
        const mobile = window.matchMedia('only screen and (min-width: 769px)').matches;

        if(mobile){
            document.addEventListener('scroll', throttledHandleScroll,{passive:true});
            console.log('Scroll event listener added');
        }

        return()=>{
            document.removeEventListener('scroll', throttledHandleScroll);
            console.log('Scroll event listener removed');
        };
    },[throttledHandleScroll])

    const handleClick = () =>{
        const hamContainer = hamContainerRef.current;
        const navContainer = navContainerRef.current;

        if (hamContainer && navContainer) {
            hamContainer.classList.toggle('active');
            navContainer.classList.toggle('active');
            console.log('Active class toggled');
            console.log('Ham container classes:', hamContainer.className);
            console.log('Nav container classes:', navContainer.className);
        }
    }

    useEffect(() => {
        const mobile = window.matchMedia('only screen and (min-width: 769px)').matches;

        if(!mobile){
            hamContainerRef.current.addEventListener('click',handleClick);
            console.log('Click event listener added');
        }

        return () =>{
            hamContainerRef.current.removeEventListener('click',handleClick)
            console.log('Click event listener removed');
        }
    },[handleClick])

    return(
        <>
            <div ref={navContainerRef} className="nav-container">
                <nav className="navbar">
                    <ul className="nav-ul">
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#quote-box">Quote Machine</a></li>
                        <li><a href="#footer">Contact</a></li>
                    </ul>
                </nav>
            </div>
            <div ref={hamContainerRef} className="ham-container">
                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </>
    )
} 

export default Navbar