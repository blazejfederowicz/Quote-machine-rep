import './Navbar.css'

const Navbar = () =>{
    return(
        <div className="nav-container">
            <nav className="navbar">
                <ul className="nav-ul">
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#cta">Quote Machine</a></li>
                    <li><a href="#footer">Contact</a></li>
                </ul>
            </nav>
        </div>
    )
} 

export default Navbar