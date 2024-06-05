import "./HeroSection.css"
import HeroImg from './assets/heading-picture.jpg'

const HeroSection = () => {
    return(
        <div id="hero" className="hero-container">
            <div className="hero-heading">
                <div className="hero-content">
                    <div className="h1-container">
                        <h1 className="h1">Welcome To the Quote<br/>Machine-Discover Inspiring<br/>Quotes</h1>
                    </div>
                    <div className="button-container">
                        <button className="purple-button">Get Inspired</button>
                        <button className="white-button">Learn more</button>
                    </div>
                </div>    
                <div className="hero-sub-content"></div>
            </div>
            <div className="img-container">
            </div>
        </div>
    );
}

export default HeroSection