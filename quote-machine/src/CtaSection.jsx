import './CtaSection.css';
import React, {useState,useEffect} from 'react';
import ButtonComponent from './Buttons/ButtonComponent';

const CtaSection = React.forwardRef((_,ref) =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchQuote = () =>{
        setLoading(true);
        fetch('https://api.api-ninjas.com/v1/quotes?category=happiness',
            {headers: {
                'X-Api-Key': 'mykey'
              }}
            )   
            .then(response =>{
                if(!response.ok){
                    throw new Error("Error by network response")
                }
                return response.json();      
            })
            .then(data =>{
                setData(data);
                setLoading(false);
            })
            .catch(error =>{
                setError(error);
                setLoading(false)
            })
    }

    useEffect( () =>{
        
    },[]);

    if(loading){
        return(<div ref={ref} id='quote-box' className="cta-container">
            <h2 className='h2'>Discover Inspiring Quotes<br/>Here</h2>
            <div className="quote-container">
                <p className='p' id='text'>Loading...</p>
            </div>
            <ButtonComponent purple='Generate' white='Share' onclickPurple={fetchQuote}/>
        </div>);
    }

    if(error){
        <div ref={ref} id='quote-box' className="cta-container">
            <h2 className='h2'>Discover Inspiring Quotes<br/>Here</h2>
            <div className="quote-container">
            <p className='p' id='text'>Error: {error.message}</p>
            </div>
            <ButtonComponent purple='Generate' white='Share' onclickPurple={fetchQuote}/>
        </div>
    }


    return (
        <div ref={ref} id='quote-box' className="cta-container">
            <h2 className='h2'>Discover Inspiring Quotes<br/>Here</h2>
            <div className="quote-container">
                {data && (<p className='p' id='text'>{data[0].quote}</p>)} 
            </div>
            <ButtonComponent purple='Generate' white='Share' onclickPurple={fetchQuote}/>
        </div>
    );
})

export default CtaSection;