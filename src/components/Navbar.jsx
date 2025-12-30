import { useState, useEffect } from 'react';
import logoImageFile from '/omar.webp'; // عدل المسار حسب ملفك
import './src/styles/navbar.css'; // استورد الـ CSS العام

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // منع scroll الجسم لما الموبايل مينو مفتوح
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {isMobileMenuOpen && (
                <div 
                    className="mobile-menu-backdrop"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
            <nav className={`navbar ${isScrolled ? 'solid-bg' : 'transparent-bg'}`}>
                <div className="container navbar-container">
                    <div className="logo">
                        <div className="logo-icon-wrapper">
                            <img src={logoImageFile} alt="GDClub Logo" />
                        </div>
                        <span>FCAI GDC</span>
                    </div>

                    <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                        <a href="#intro" onClick={(e) => scrollToSection(e, 'intro')}>Home</a>
                        <a href="#who-we-are" onClick={(e) => scrollToSection(e, 'who-we-are')}>About Us</a>
                        <a href="#team" onClick={(e) => scrollToSection(e, 'team')}>Our Team</a>
                        <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')}>Tracks</a>
                        <a href="#mission-vision" onClick={(e) => scrollToSection(e, 'mission-vision')}>Missions</a>
                        <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')}>Testimonials</a>
                        <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
                    </div>

                    <button 
                        className="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
