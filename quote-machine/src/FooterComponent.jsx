import './FooterComponent.css'

const FooterComponent = () =>{

    return(
        <div id="footer" className='footer'>
            <div className="social-container">
                <a href='https://github.com/Warrgun' className='social-icons' target='_blank'><i className="fa-brands fa-github"></i></a>
                <a href='https://www.instagram.com/fabio.1130/' className='social-icons' target='_blank'><i className="fa-brands fa-instagram"></i></a>
                <a href='https://x.com' className='social-icons' target='_blank'><i className="fa-brands fa-x-twitter"></i></a>
            </div>
        </div>
    );
}

export default FooterComponent