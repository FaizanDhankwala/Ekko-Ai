import React, { useContext, useState, useEffect } from 'react';
import "./Main.css";
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    
     const [greetings] = useState([
    "Yo! I'm Ekko!", 
    "Got a question? Let's mess with the timeline!", 
    "Hold up, not anything. Some futures are better left un-rewound.", 
    "How do I go back in time? That's my secret sauce, pal.", 
    "What's the plan for today, Ekko? We got time to burn, or time to make?", 
    "Ugh, my code's looping. Feels like I suck at <b>coding</b> today.", 
    "Feeling stuck? Let's rewind that confusion.", 
    "Ready to flip the script on today?", 
    "Time to cook up some genius, don't you think?", 
    "Brain feeling a bit slow? Let's kick it into overdrive.", 
    "Got a burning question that needs an instant answer?", 
    "Big dreams? Let's find the right moment to make them real.", 
    "Stuck in a loop? I know a guy who can fix that.", 
    "Thinking about grub? Priorities, Ekko, priorities!", 
    "What's your next big leap?", 
    "Is it coffee o'clock yet? I got timelines to manipulate!", 
    "Ready to hack your way to new knowledge?", 
    "Lay it on me! What's buzzing in your head?", 
    "Feeling that creative spark? Let's build something epic.", 
    "Alright, Zaunite, let's dive into the future!" 
]);
    const [greetingIndex, setGreetingIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    
    const [contentKey, setContentKey] = useState(0);

    
    useEffect(() => {
        
        setContentKey(prevKey => prevKey + 1);
    }, [showResult, recentPrompt]); 

    useEffect(() => {
        let typingTimer;

        const typeWriter = () => {
            const currentGreeting = greetings[greetingIndex];

            if (!isDeleting) {
            
                if (charIndex < currentGreeting.length) {
                    typingTimer = setTimeout(() => {
                        setCharIndex(prev => prev + 1);
                    }, 100); 
                } else {
                  
                    setIsDeleting(true);
                    typingTimer = setTimeout(typeWriter, 3000); 
                }
            } else {
                
                if (charIndex > 0) {
                    typingTimer = setTimeout(() => {
                        setCharIndex(prev => prev - 1);
                    }, 50); 
                } else {
                    setIsDeleting(false);
                    setGreetingIndex(prev => (prev + 1) % greetings.length); 
                   
                    typingTimer = setTimeout(typeWriter, 500); 
                }
            }
        };

        
        if (!showResult) {
            typeWriter();
        }

        return () => clearTimeout(typingTimer); 
    }, [charIndex, isDeleting, greetingIndex, greetings, showResult]); 

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            onSent();
        }
    };

    return (
        <div className='main'>
            <div className='nav'>
                <p>Ekko</p>
                <img src={assets.user_icon} alt="User Icon"></img>
            </div>

            {/* THIS IS THE FADING CONTENT AREA */}
            {/* We'll rename main-container to main-content-area */}
            <div className={`main-content-area fade-in-section`} key={contentKey}>

                {!showResult
                    ? <>
                        <div className='greet'>
                            {}
                            <p><span>{greetings[greetingIndex].substring(0, charIndex)}</span></p>
                            <p>Whats going on?</p>
                        </div>
                        <div className='cards'>
                            <div className='card' onClick={() => onSent("What happened between you and Jinx?")}>
                                <p>What happened between you and Jinx?</p>
                                <img src={assets.compass_icon} alt="Compass Icon"></img>
                            </div>
                            <div className='card' onClick={() => onSent("What are you guys doing in Zaun?")}>
                                <p>What are you guys doing in Zaun?</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon"></img>
                            </div>
                            <div className='card' onClick={() => onSent("Write a short story about a talking animal")}>
                                <p>Write a short story about a talking animal</p>
                                <img src={assets.message_icon} alt="Message Icon"></img>
                            </div>
                            <div className='card' onClick={() => onSent("Explain the concept of artificial intelligence simply")}>
                                <p>Explain the concept of artificial intelligence simply</p>
                                <img src={assets.code_icon} alt="Code Icon"></img>
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className='result-title'>
                            <img src={assets.user_icon} alt="User Icon"></img>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='result-data'>
                            <img src={assets.gemini_icon} alt="Gemini Icon"></img>
                            {loading
                                ? <div className="lds-ellipsis">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }
            </div>

            {}
            <div className='main-bottom'>
                <div className='search-box'>
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder='Enter a prompt here'
                        onKeyPress={handleKeyPress}
                    />
                    <div>
                        <img src={assets.gallery_icon} alt="Gallery Icon" />
                        <img src={assets.mic_icon} alt="Mic Icon" />
                        {input.trim() !== '' && !loading ? (
                            <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" />
                        ) : null}
                    </div>
                </div>
                <p className='bottom-info'>
                    Ekko is powered by Google's Gemini API and may occasionally provide inaccurate or outdated information. Please verify critical details independently.
                </p>
            </div>
        </div>
    );
}

export default Main;