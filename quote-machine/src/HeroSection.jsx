import "./HeroSection.css"
import ButtonComponent from "./Buttons/ButtonComponent";


const HeroSection = ({ctaRef}) => {

    const handleScroll = () =>{
        if(ctaRef.current){
            ctaRef.current.scrollIntoView();
        }
    };


    const handleFilter = () => {
        const element = document.querySelector(".opacity-container");
        if(element){
            element.style.opacity = "1";
            element.style.visibility = "visible";
        }
    };

    return(
        <div id="hero" className="hero-container">
            <div className="hero-heading">
                <div className="hero-content">
                    <div className="h1-container">
                        <h1 className="h1">Welcome To the Quote<br/>Machine-Discover Inspiring<br/>Quotes</h1>
                    </div>
                    <ButtonComponent purple ="Get Inspired" white="Learn More" onclickWhite={() =>handleFilter()} onclickPurple={handleScroll}/>
                </div>    
                <div className="hero-sub-content">
                    <div className="background-sub-content"></div>
                    <div className="text-sub-content">
                        <div className="opacity-container">
                            <p className="p"><span className="bold">Features</span></p>
                            <ul>
                                <li className="sub-li"><span className="bold">Random Quotes:</span> Get a surprise dose of inspiration.</li>
                                <li className="sub-li"><span className="bold">Categories:</span> Explore quotes on motivation, love, wisdom, and more.</li>
                                <li className="sub-li"><span className="bold">Author Profiles:</span> Learn about the minds behind the quotes.</li>
                            </ul>
                            <p className="p"><span className="bold">Why Use Quote Machine?</span></p>
                            <ul>
                                <li className="sub-li"><span className="bold">Daily Inspiration:</span> Start your day with a fresh quote.</li>
                                <li className="sub-li"><span className="bold">Personal Growth:</span> Reflect on powerful words to inspire positive change</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="img-container">
            </div>
        </div>
    );
}

export default HeroSection