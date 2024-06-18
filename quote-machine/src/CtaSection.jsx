import './CtaSection.css';
import React, {useState,useEffect, useCallback} from 'react';
import useThrottle from './custom-hooks/useThrottle';
import useDebounce from './custom-hooks/useDebounce';
import ButtonComponent from './Buttons/ButtonComponent';


const CtaSection = React.forwardRef((_,ref) =>{
    const [data, setData] = useState([{quote:'Get motivated by our collection of random quotes and share them with others.'}]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState(null);
    const [animatedText, setAnimatedText] = useState([])
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();

    const debaunceAnimatedText = useCallback(useDebounce(text => setAnimatedText(text),1),[])

    if(data[0].quote === 'Get motivated by our collection of random quotes and share them with others.'){
        document.querySelectorAll('.overlay').forEach(e => e.style.visibility = "hidden");
    }

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
        if(data[0].quote == 'Get motivated by our collection of random quotes and share them with others.'){
            document.querySelector('#author').style.display = "none";
        }
        else{
            document.querySelector('#author').style.display = "block";
        }

        if(!data[0].quote) return;
        let text= data[0].quote
        let i = 0;

        const interval = setInterval(() => {
            debaunceAnimatedText(text.split("").reduce((acc,e,index) => {
                if(index < i || e === " "){
                    acc.push({char: e, glitched: false});
                }
                else{
                    acc.push({char: alphabet[Math.floor(Math.random()*alphabet.length)], glitched: true});
                }
                return acc
            },[]));

            if(i >= text.length){
                clearInterval(interval)
                setAnimatedText(text.split('').map(char => ({char, glitched:false})));
            }
            i+=1;
        }, 30);

        return () => clearInterval(interval);
    },[data])

    const shareButton = () => window.open('https://x.com/intent/post','_blank');

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

    const throttledFetchQuote = useThrottle(fetchQuote, 1000);
    

    if(loading){
        return(<div ref={ref} id='quote-box' className="cta-container">
            <h2 className='h2'>Discover Inspiring Quotes<br/>Here</h2>
            <div className="quote-container">
                <p className='p' id='text'>Loading...</p>
            </div>
            <ButtonComponent purple='Generate' white='Share'/>
        </div>);
    }

    if(error){
        return(<div ref={ref} id='quote-box' className="cta-container">
            <h2 className='h2'>Discover Inspiring Quotes<br/>Here</h2>
            <div className="quote-container">
            <p className='p' id='text'>Error: {error.message}</p>
            </div>
            <ButtonComponent purple='Generate' white='Share' onclickPurple={throttledFetchQuote}/>
        </div>);  
    }


    return (
        <div ref={ref} id='quote-box' className="cta-container">
            <h2 className='h2'>Discover Inspiring Quotes<br/>Here</h2>
            <div className="quote-container">
                {data && 
                (<blockquote>
                    <p className='p' key={animatedText} id='text'>
                        <i className="fa-solid fa-quote-left icon1 overlay"></i>
                        {animatedText.map(({char,glitched},i) => (
                            <span key={i} style={glitched?{color:"hsl(286, 61%, 36%)",fontFamily:"monospace",fontWeight:"bold"}:{}}>{char}</span>
                        ))}
                        <i className="fa-solid fa-quote-right icon2 overlay"></i>
                    </p>
                    <p className='author' id='author'>{data[0].author}</p>
                </blockquote>)} 
            </div>
            <ButtonComponent purple='Generate' white='Share' onclickPurple={throttledFetchQuote} onclickWhite={shareButton}/>
        </div>
    );
})

export default CtaSection;