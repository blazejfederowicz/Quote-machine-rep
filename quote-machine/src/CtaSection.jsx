import './CtaSection.css';
import React, {useState,useEffect, useRef} from 'react';
import useThrottle from './custom-hooks/useThrottle';
import FCCButtonComponent from './FCCButtons/FCCButtonComponent';


const CtaSection = React.forwardRef((_,ref) =>{
    const [data, setData] = useState([{quote:'Get motivated by our collection of random quotes and share them with others.'}]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState(null);
    const quoteRef = useRef(null);
    const authorRef = useRef(null);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

    
    if(data[0].quote === 'Get motivated by our collection of random quotes and share them with others.'){
        document.querySelectorAll('.overlay').forEach(e => e.style.visibility = "hidden");
    }

    useEffect( () =>{
        fetch('/api/data')
            .then(response =>{
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()})
            .then(data => {
                setApiKey(data.apiKey);
            })
            .catch(error =>{
                console.error("error fetching apiKey ", error);
            });
    },[]);

    useEffect(() =>{
        if(apiKey){
            fetchQuote()
        }
    },[apiKey])

    useEffect(() =>{
        const text= data[0].quote
        
        if(text == 'Get motivated by our collection of random quotes and share them with others.'){
            if(authorRef.current){
                authorRef.current.style.display = "none";
            }
        }
        else{
            if(authorRef.current){
                document.querySelector('#author').style.display = "block";
            }
        }

        if(!text) return;

        let i = 0;
        const spans = quoteRef.current.querySelectorAll('span')

        const interval = setInterval(() => {
            if(quoteRef.current){
                text.split("").forEach((e,index) => {
                    if(index < i || e === " "){
                        spans[index].textContent = e;
                        spans[index].style.color = '';
                        spans[index].style.fontFamily = '';
                        spans[index].style.fontWeight = '';
                    }
                    else{
                        spans[index].textContent = alphabet[Math.floor(Math.random() * alphabet.length)];
                        spans[index].style.color = 'hsl(286, 61%, 36%)';
                        spans[index].style.fontFamily = 'monospace';
                        spans[index].style.fontWeight = 'bold';
                    }
                });
            }
            
            if(i >= text.length){
                clearInterval(interval)
                text.split('').forEach((e,index) =>{
                    spans[index].textContent = e;
                    spans[index].color = '';
                    spans[index].fontFamily = '';
                    spans[index].fontWeight = '';
                });
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
                    throw new Error("Error by network response / Server on render is turning on (give it a minute or two)")
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

    const throttledFetchQuote = useThrottle(fetchQuote, 1000);

    if(loading){
        return(<div ref={ref} id='quote-box' className="cta-container">
            <h2 className='h2'>Discover Inspiring Quotes<br/>Here</h2>
            <div className="quote-container">
                <p className='p' id='text'>Loading...</p>
            </div>
            <FCCButtonComponent purple='Generate' white='Share'/>
        </div>);
    }

    if(error){
        return(<div ref={ref} id='quote-box' className="cta-container">
            <h2 className='h2'>Discover Inspiring Quotes<br/>Here</h2>
            <div className="quote-container">
            <p className='p' id='text'>Error: {error.message}</p>
            </div>
            <FCCButtonComponent purple='Generate' white='Share' onclickPurple={throttledFetchQuote}/>
        </div>);  
    }


    return (
        <div ref={ref} id='quote-box' className="cta-container">
            <h2 className='h2'>Discover Inspiring Quotes<br/>Here</h2>
            <div className="quote-container">
                {data && 
                (<blockquote>
                    <p ref={quoteRef} className='p' id='text'>
                        <i className="fa-solid fa-quote-left icon1 overlay"></i>
                        {data.length>0 && data[0].quote.split('').map((e,index) =>(
                            <span key={index}>{e}</span>
                        ))}
                        <i className="fa-solid fa-quote-right icon2 overlay"></i>
                    </p>
                    <p ref={authorRef} className='author' id='author'>{data.length>0? data[0].author:''}</p>
                </blockquote>)} 
            </div>
            <FCCButtonComponent purple='Generate' white='Share' onclickPurple={throttledFetchQuote}/>
        </div>
    );
})

export default CtaSection;