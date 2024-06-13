import './CtaSection.css';
import React, {useState,useEffect} from 'react';
import ButtonComponent from './Buttons/ButtonComponent';

const CtaSection = React.forwardRef((_,ref) =>{
    const [data, setData] = useState([{quote:'Get motivated by our collection of random quotes and share them with others. '}]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState(null);
    const [animatedText, setAnimatedText] = useState('')
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

    useEffect(() =>{
        if(!data[0].quote) return;
        let text= data[0].quote
        let i = 0;
        const interval = setInterval(() => {
            setAnimatedText( text.split("")
                            .reduce((acc,e,index) =>{
                            if(index<i){
                                return acc + e;
                            }
                            else if(e == ' '){
                                return acc + ' '
                            }
                            return acc +"#" /*alphabet[Math.floor(Math.random()*alphabet.length)]*/
                        
                        })
                            ,'');
            if(i >= text.length){
                clearInterval(interval)
                setAnimatedText(text)
            }
            i+=1;
        }, 30);

        return () => clearInterval(interval);
    },[data])

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
                setLoading(false);
            });
    };
    

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
                    <p className='p' key={animatedText} id='text'>
                        <i className="fa-solid fa-quote-left icon1"></i>
                        {animatedText}
                        <i className="fa-solid fa-quote-right icon2"></i>
                    </p>
                    <p className='author' id='author'>{data[0].author}</p>
                </blockquote>)} 
            </div>
            <ButtonComponent purple='Generate' white='Share' onclickPurple={fetchQuote}/>
        </div>
    );
})

export default CtaSection;