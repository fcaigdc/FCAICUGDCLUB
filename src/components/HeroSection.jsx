import { useEffect, useRef, useState } from "react";

const heroVideoSrc = "/intro.webm";

// ===================================================================
// 🌟 3. Hero Section (Intro) - Layout & Content Changed
// ===================================================================

const HeroSection = () => {
        // Typing Effect Logic 
        const [currentTextIndex, setCurrentTextIndex] = useState(0);
        const [displayedText, setDisplayedText] = useState('');
        const [isDeleting, setIsDeleting] = useState(false);
        
        useEffect(() => {
            const fullText = changingTexts[currentTextIndex];
            const handleTyping = () => {
                if (isDeleting) {
                    setDisplayedText(prev => prev.substring(0, prev.length - 1));
                    if (displayedText === '') {
                        setIsDeleting(false); 
                        setCurrentTextIndex(prev => (prev + 1) % changingTexts.length);
                    }
                } else {
                    setDisplayedText(prev => fullText.substring(0, prev.length + 1));
                    if (displayedText === fullText) {
                        setTimeout(() => setIsDeleting(true), 2500);
                    }
                }
            };
    
            const speed = isDeleting ? 70 : 120;
            const timer = setTimeout(handleTyping, speed);
            return () => clearTimeout(timer);
        }, [displayedText, isDeleting, currentTextIndex]); 
    
        // Logic for Video (Right Side)
        const videoRef = useRef(null);
        const [isMuted, setIsMuted] = useState(true); 
    
        useEffect(() => {
            if (videoRef.current) {
                videoRef.current.play().catch(error => {
                    console.log("Autoplay failed (muted) in Hero:", error);
                });
            }
        }, []);
    
        const toggleMute = () => {
            if (videoRef.current) {
                videoRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
            }
        };
    
        return (
            <section id="intro" className="intro-section light-bg">
                <div className="container split-layout">
                    
                    {/* Left Content (Slogan) - Smaller Flex Basis */}
                    <div className="left-content">
                        <h1 className="giant-slogan">
                             متخليش الدنيا  
                            <span className="highlight"> تبكسلك </span>
                        </h1>
                        <p className="sub-text">
                            A student-run tech community focused on training FCAI CU students to master the art of digital game development from scratch to advanced stages.
                        </p>
                        <a 
                            href="/registration-link"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="cta-button" 
                        >
                            Start Your Journey
                        </a>
                    </div>
    
                    {/* Right Content (Video + Caption) - Larger Flex Basis */}
                    <div className="right-content">
                        <div className="hero-visual-container">
                            
                            <video
                                ref={videoRef}
                                autoPlay 
                                loop 
                                muted={isMuted} 
                                playsInline // Important for mobile autoplay
                                poster="https://via.placeholder.com/600x400?text=Hero+Video+Poster"
                                preload="metadata"
                            >
                                <source src={heroVideoSrc} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                            
                            {/* Mute/Unmute Button */}
                            <button 
                                className="cta-button mute-toggle-btn" 
                                onClick={toggleMute}
                            >
                                {isMuted ? '🔇 Unmute' : '🔊 Mute'}
                            </button>
                            <p className="animated-caption">
                                {displayedText} <span className="typing-cursor">|</span> 
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    };
export default HeroSection;