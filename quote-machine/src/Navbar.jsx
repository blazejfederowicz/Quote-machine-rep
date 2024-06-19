import React, {useEffect,useRef, useCallback} from 'react';
import useThrottle from './custom-hooks/useThrottle';
import './Navbar.css'

const Navbar = () =>{
    const lastScrollPosition = useRef(0);
    const navContainerRef = useRef(null);
    const hamContainerRef = useRef(null);

    const handleScroll = useCallback(() =>{
        const navContainer = navContainerRef.current;
        const scrollPosition = window.scrollY !== undefined ? window.scrollY : document.documentElement.scrollTop;
        
        if(scrollPosition > lastScrollPosition.current ){
            navContainer.style.top = '-72px';
        }
        else if(scrollPosition < lastScrollPosition.current){
            navContainer.style.top = '0';
        }
        lastScrollPosition.current = Math.max(scrollPosition,0);
    },[]);

    const throttledHandleScroll = useThrottle(handleScroll,10)

    const handleClick = useCallback(() =>{
        const hamContainer = hamContainerRef.current;
        const navContainer = navContainerRef.current;

        if (hamContainer && navContainer) {
            hamContainer.classList.toggle('active');
            navContainer.classList.toggle('active');
        }
    },[]);
    
    const updateEventListener = useCallback(()=>{
        const mobile = window.matchMedia('only screen and (max-width: 768px)').matches;
        const navContainer = navContainerRef.current;
        
        if(mobile && hamContainerRef.current){
            navContainer.style.top = '0px';
            hamContainerRef.current.addEventListener('click',handleClick,{passive:true});
            document.removeEventListener('scroll', throttledHandleScroll);
            console.log('Click event listener added');  
        }
        else{
            document.addEventListener('scroll', throttledHandleScroll,{passive:true});
            hamContainerRef.current.removeEventListener('click',handleClick);
            console.log('Click event listener removed');
        }
    },[handleClick])

    useEffect(()=>{
        updateEventListener();
        window.addEventListener('resize',updateEventListener);

        return()=>{
            document.removeEventListener('scroll', throttledHandleScroll);
            window.removeEventListener('resize',updateEventListener);
            if(hamContainerRef.current){
                hamContainerRef.current.removeEventListener('click',handleClick);
            }
            console.log('event listeners removed');
        };
    },[throttledHandleScroll, updateEventListener])

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