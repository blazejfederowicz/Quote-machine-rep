import './CtaSection.css';
import React, {useState,useEffect} from 'react';
import ButtonComponent from './Buttons/ButtonComponent';

const CtaSection = React.forwardRef((_,ref) =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState(null);
    const [animation, setAnimation] = useState('');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';


    useEffect( () =>{
        fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                setApiKey(data.apiKey);
            })
            .catch(error =>{
                console.error("error fetching apiKey ", error);
            });
        
    },[]);

    const fetchQuote = () =>{
        setLoading(true);
        fetch('https://api.api-ninjas.com/v1/quotes',
            {headers: {
                'X-Api-Key': apiKey
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

    const handleAnimation = event => setAnimation(event.target.value) && animationLogic();
        

    /*const animationLogic = () =>{
        let text= animation
        let i = 0;
        const interval = setInterval(() => {
            animation = text.split("")
                            .map((e,index) =>{
                            if(index<i){
                                return text[index]
                            }
                            return alphabet[Math.floor(Math.random()*26)]})
                            .join("")
            if(i >= text.length){
                clearInterval(interval)
            }
            i+=1/3;
        }, 30);
    }*/
    

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
                {data && 
                (<blockquote>
                    
                    <p className='p' id='text' value={animation} onChange={handleAnimation}>
                        <i class="fa-solid fa-quote-left icon1"></i>
                        {data[0].quote}
                        <i class="fa-solid fa-quote-right icon2"></i>
                        </p>
                    <p className='author' id='author'>{data[0].author}</p>
                </blockquote>)} 
            </div>
            <ButtonComponent purple='Generate' white='Share' onclickPurple={fetchQuote}/>
        </div>
    );
})

export default CtaSection;