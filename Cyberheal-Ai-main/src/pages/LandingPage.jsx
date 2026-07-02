import React, { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import TrustBar from '../components/landing/TrustBar'
import CTA from '../components/landing/CTA'
import Footer from '../components/layout/Footer'

export default function LandingPage() {
  useEffect(() => {
    // Simple micro-interaction for scroll effects
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 20) {
          nav.classList.add('shadow-md');
        } else {
          nav.classList.remove('shadow-md');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for reveal effects
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('section > div');
    animatedElements.forEach(el => {
      // Set initial state
      if (!el.classList.contains('opacity-100')) {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-8');
        el.classList.remove('opacity-100', 'translate-y-0');
      }
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      animatedElements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden hero-gradient">
        <Hero />
        <Features />
        <TrustBar />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
