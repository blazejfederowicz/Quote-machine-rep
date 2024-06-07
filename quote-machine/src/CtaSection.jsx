import './CtaSection.css';
import ButtonComponent from './Buttons/ButtonComponent';

const CtaSection = () =>{
    return (
        <div id='cta' className="cta-container">
            <h2 className='h2'>Discover Inspiring Quotes<br/>Here</h2>
            <div className="quote-container">
                <p className='p'>Get motivated by our collection of random quotes and share them with others. </p>
            </div>
            <ButtonComponent purple='Generate' white='Share'/>
        </div>
    );
}

export default CtaSection;