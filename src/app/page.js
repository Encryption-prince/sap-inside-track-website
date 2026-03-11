"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Schedule', href: '#' },
    { name: 'Registration', href: '#' },
    { name: 'Venue', href: '#' },
    { name: 'Certificates', href: '#' },
  ];

  const speakers = [
    { name: "Joe Keery", role: "Actor / Musician", image: "/speaker-1.png" },
    { name: "Zayn", role: "Artist", image: "/speaker-2.png" },
    { name: "Joe Keery", role: "Actor / Musician", image: "/speaker-1.png" },
    { name: "Jane Doe", role: "Tech Lead, SAP", image: "/speaker-3.jpg" },
    { name: "John Smith", role: "Innovator", image: "/speaker-4.png" },
  ];

  const topCompanies = [
    { name: "Samsung", logo: "/samsung.png" },
    { name: "Coca-Cola", logo: "/Coca-Cola-logo.png" },
    { name: "TCS", logo: "/tcs.png" },
    { name: "Oracle", logo: "/Oracle-Logo.png" },
    { name: "Samsung", logo: "/google.png" }, 
  ];

  const bottomCompanies = [
    { name: "IBM", logo: "/IBM_Logo.png" },
    { name: "Google", logo: "/google.png" },
    { name: "Meta", logo: "/Meta-Logo.png" },
    { name: "SAP", logo: "/SAP.png" },
    { name: "IBM", logo: "/IBM_Logo.png" },
  ];

  const topSponsors = [
    { name: "SAP", logo: "/SAP.png" },
    { name: "TCS", logo: "/tcs.png" },
    { name: "IBM", logo: "/IBM_Logo.png" },
    { name: "Oracle", logo: "/Oracle-Logo.png" },
    { name: "SAP", logo: "/SAP.png" }, 
  ];

  const bottomSponsors = [
    { name: "Google", logo: "/google.png" },
    { name: "Microsoft", logo: "/microsoft.png" }, 
    { name: "Meta", logo: "/Meta-Logo.png" },
    { name: "Coca-Cola", logo: "/Coca-Cola-logo.png" },
    { name: "Google", logo: "/google.png" },
  ];

  const pastEvents = [
    {
      id: 1,
      title: "SAP CodeJam Kolkata",
      description: "An interactive, hands-on event where developers learned about the latest SAP technologies, including SAP CAP and SAP BTP.",
      location: "Techno Main Salt Lake, Kolkata",
      date: "12 Nov, 2025",
      image: "/event-1.png"
    },
    {
      id: 2,
      title: "SAP Inside Track 2024",
      description: "Our flagship community event bringing together SAP professionals, customers, and partners for a day of networking and deep-dive sessions.",
      location: "Biswa Bangla Convention Centre",
      date: "05 Aug, 2024",
      image: "/event-1.png"
    }
  ];

  // --- Cinematic Carousel Data ---
  const eventMoments = [
    { id: 1, src: "/moment-1.png" },
    { id: 2, src: "/moment-2.png" },
    { id: 3, src: "/moment-3.png" },
    { id: 4, src: "/moment-4.png" },
    { id: 5, src: "/moment-5.png" },
    { id: 6, src: "/moment-6.png" },
    { id: 7, src: "/moment-7.png" },
    { id: 8, src: "/moment-8.png" },
  ];

  // --- States & Refs ---
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Carousel Specific States
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const slideRefs = useRef([]);
  
  const aboutRef = useRef(null);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);

  // 1. Standard Trackers
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsAboutVisible(true); },
      { threshold: 0.2 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(windowHeight > 0 ? totalScroll / windowHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 2. Custom Scroll Timing (Hero -> About)
  useEffect(() => {
    const SCROLL_DURATION = 1800; 
    const scrollToAbout = () => {
      if (!aboutRef.current) return;
      isAnimating.current = true;
      const targetY = aboutRef.current.offsetTop;
      const startY = window.scrollY;
      const difference = targetY - startY;
      let startTime = null;

      const step = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / SCROLL_DURATION, 1);
        const ease = progress < 0.5 
          ? 8 * progress * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 4) / 2;

        window.scrollTo(0, startY + difference * ease);

        if (timeElapsed < SCROLL_DURATION) {
          window.requestAnimationFrame(step);
        } else {
          setTimeout(() => { isAnimating.current = false; }, 50); 
        }
      };
      window.requestAnimationFrame(step);
    };

    const handleWheel = (e) => {
      if (window.scrollY < 50 && e.deltaY > 0) {
        if (!isAnimating.current) {
          e.preventDefault(); 
          scrollToAbout();    
        } else {
          e.preventDefault(); 
        }
      }
    };

    const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const handleTouchMove = (e) => {
      const touchEndY = e.touches[0].clientY;
      const isScrollingDown = touchStartY.current > touchEndY;
      if (window.scrollY < 50 && isScrollingDown) {
        if (!isAnimating.current) {
          e.preventDefault();
          scrollToAbout();
        } else {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // 3. Carousel Intersection Observer
  useEffect(() => {
    const slideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlide(Number(entry.target.dataset.index));
          }
        });
      },
      { root: carouselRef.current, threshold: 0.6 }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) slideObserver.observe(slide);
    });

    return () => slideObserver.disconnect();
  }, []);

  // 4. Auto-scroll carousel every 3 seconds
  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (!carouselRef.current) return;
      
      // Check if we're at the last slide
      if (activeSlide === eventMoments.length - 1) {
        // Loop back to first slide
        carouselRef.current.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Scroll to next slide
        const slideWidth = carouselRef.current.children[0].clientWidth;
        const gap = window.innerWidth < 768 ? 12 : 24;
        carouselRef.current.scrollBy({
          left: slideWidth + gap,
          behavior: 'smooth'
        });
      }
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [activeSlide]); // Only activeSlide as dependency

  // 5. Carousel Manual Navigation Function
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    
    if (direction === 'next' && activeSlide === eventMoments.length - 1) {
      // Loop back to first slide
      carouselRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else if (direction === 'prev' && activeSlide === 0) {
      // Loop to last slide
      const slideWidth = carouselRef.current.children[0].clientWidth;
      const gap = window.innerWidth < 768 ? 12 : 24;
      carouselRef.current.scrollTo({
        left: (slideWidth + gap) * (eventMoments.length - 1),
        behavior: 'smooth'
      });
    } else {
      const slideWidth = carouselRef.current.children[0].clientWidth;
      const gap = window.innerWidth < 768 ? 12 : 24;
      
      carouselRef.current.scrollBy({
        left: direction === 'next' ? slideWidth + gap : -(slideWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="font-sans relative bg-[#0a0a0a] selection:bg-[#fca311] selection:text-white">
      
      {/* SCROLL PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 h-1 bg-black z-[60] origin-left ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>

      {/* 1. STICKY NAVBAR */}
      <nav className="fixed top-0 z-50 w-full bg-white/20 backdrop-blur-md border-b border-black/10 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="flex flex-col font-sans leading-none mt-1">
              <span className="font-extrabold text-[1.1rem] tracking-tight text-black">SAP INSIDE TRACK</span>
              <span className="font-semibold text-xs tracking-[0.2em] text-black/70 mt-1">KOLKATA</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 mt-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-semibold tracking-wide text-black/80 hover:text-black transition-colors relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="bg-black text-[#fbb62c] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 active:scale-95 transition-all shadow-md">
              Register Now
            </button>
          </div>
        </div>
      </nav>

      {/* --- THE MAIN WHITE SHEET --- */}
      <main className="relative z-10 bg-white rounded-b-[2rem] md:rounded-b-[4rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
        
        {/* 2. HERO SECTION */}
        <section className="relative h-screen w-full bg-gradient-to-b from-[#fca311] to-[#fee96e] overflow-hidden flex flex-col">
          <div className="relative z-30 flex-1 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="font-heading font-extrabold text-6xl md:text-[5.5rem] leading-[1.1] text-black tracking-tight drop-shadow-sm flex flex-col w-full overflow-hidden">
              <span className="will-change-transform ease-out" style={{ transform: `translateX(-${scrollY * 0.6}px)` }}>EMPOWERING</span>
              <span className="will-change-transform ease-out" style={{ transform: `translateX(${scrollY * 0.6}px)` }}>KOLKATA</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl font-medium text-black/80 tracking-wide">Innovate Connect Learn</p>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%] w-[800px] h-[800px] md:w-[1400px] md:h-[1400px] bg-gradient-to-t from-[#f8981d] to-[#fde047] rounded-full z-10 blur-2xl opacity-80 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none translate-y-[25%] md:translate-y-[20%]">
            <Image src="/bridge-removebg-preview.png" alt="Howrah Bridge" width={1920} height={800} className="w-full h-auto mix-blend-multiply opacity-90" priority />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fee96e] to-transparent z-20 pointer-events-none"></div>
        </section>

        {/* 3. ABOUT SECTION */}
        <section id="about" ref={aboutRef} className="relative w-full bg-gradient-to-b from-[#fee96e] via-[#fff8d6] to-white min-h-screen flex items-center justify-center px-6 pt-20">
          <div className={`max-w-4xl mx-auto flex flex-col items-center text-center transform transition-all duration-1000 ease-out ${isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
            <div className="relative mb-10 inline-block">
              <h2 className="font-heading font-extrabold text-5xl md:text-6xl text-black tracking-tight">ABOUT THE EVENTS</h2>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fca311] rounded-full"></div>
            </div>
            <p className="text-lg md:text-xl text-black/70 leading-relaxed font-sans max-w-3xl">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old...
            </p>
          </div>
        </section>

        {/* 4. PAST SPEAKERS */}
        <section className="bg-white relative overflow-hidden flex flex-col justify-center py-24">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <div className="relative inline-block">
              <h2 className="font-heading font-extrabold text-5xl md:text-6xl text-black tracking-tight">PAST SPEAKERS</h2>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fca311] rounded-full"></div>
            </div>
          </div>
          <div className="relative w-full flex overflow-hidden group">
            <div className="absolute top-0 left-0 w-16 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-16 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            <div className="flex w-max animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] py-4">
              {[...speakers, ...speakers].map((speaker, index) => (
                <div key={index} className="flex flex-col items-center mx-4 md:mx-8 transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className="w-[200px] h-[240px] md:w-[260px] md:h-[300px] bg-gradient-to-b from-[#fca311] to-[#fee96e] rounded-3xl overflow-hidden relative shadow-sm border border-black/5">
                    <Image src={speaker.image} alt={speaker.name} fill className="object-cover object-top drop-shadow-2xl" />
                  </div>
                  <h3 className="mt-6 font-sans font-bold text-2xl text-black/90 italic tracking-wide">{speaker.name}</h3>
                  <p className="text-sm font-medium text-black/50 mt-1 uppercase tracking-widest">{speaker.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. COMPANIES SECTION */}
        <section className="bg-white relative overflow-hidden flex flex-col items-center justify-center py-24 pt-12">
          <div className="relative inline-block mb-16 text-center">
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-black tracking-tight">OUR SPEAKERS WORKED AT</h2>
          </div>
          <div className="relative w-full max-w-[100vw] flex flex-col gap-12 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
            <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center">
              {[...topCompanies, ...topCompanies].map((company, index) => (
                <div key={`top-${index}`} className="mx-8 md:mx-16 flex items-center justify-center w-40 md:w-56 h-20 relative transition-transform duration-300 hover:scale-110 pointer-events-auto">
                  <Image src={company.logo} alt={company.name} fill className="object-contain" />
                </div>
              ))}
            </div>
            <div className="flex w-max animate-[marquee-reverse_30s_linear_infinite] items-center">
              {[...bottomCompanies, ...bottomCompanies].map((company, index) => (
                <div key={`bottom-${index}`} className="mx-8 md:mx-16 flex items-center justify-center w-40 md:w-56 h-20 relative transition-transform duration-300 hover:scale-110 pointer-events-auto">
                  <Image src={company.logo} alt={company.name} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PAST EVENTS SECTION */}
        <section className="bg-white relative flex flex-col justify-center py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="relative inline-block">
                <h2 className="font-heading font-extrabold text-5xl md:text-6xl text-black tracking-tight">PAST EVENTS</h2>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fca311] rounded-full"></div>
              </div>
            </div>
            <div className="relative border-2 border-[#fca311]/20 rounded-[3rem] p-8 md:p-16 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex flex-col gap-16 md:gap-24">
                {pastEvents.map((event, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={event.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center group`}>
                      <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-black/5">
                        <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start text-left' : 'md:items-end md:text-right'}`}>
                        <h3 className="font-heading font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-[#fca311] to-[#f8981d] bg-clip-text text-transparent mb-4">{event.title}</h3>
                        <p className="text-lg text-black/70 mb-6 font-sans leading-relaxed">{event.description}</p>
                        <div className={`flex flex-col gap-3 text-sm font-semibold text-black/60 font-sans ${isEven ? 'items-start' : 'items-start md:items-end'}`}>
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span>{event.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-20 flex justify-center">
                <button className="bg-gray-100 text-black px-8 py-3.5 rounded-full font-bold text-lg hover:bg-[#fca311] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">View all events</button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PAST SPONSORS SECTION */}
        <section className="bg-white relative overflow-hidden flex flex-col items-center justify-center py-24 pb-12">
          <div className="relative inline-block mb-16 text-center">
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-black tracking-tight">OUR PAST SPONSORS</h2>
          </div>
          <div className="relative w-full max-w-[100vw] flex flex-col gap-12 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
            <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center">
              {[...topSponsors, ...topSponsors].map((sponsor, index) => (
                <div key={`spon-top-${index}`} className="mx-8 md:mx-16 flex items-center justify-center w-40 md:w-56 h-20 relative transition-transform duration-300 hover:scale-110 pointer-events-auto">
                  <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
                </div>
              ))}
            </div>
            <div className="flex w-max animate-[marquee-reverse_30s_linear_infinite] items-center">
              {[...bottomSponsors, ...bottomSponsors].map((sponsor, index) => (
                <div key={`spon-bot-${index}`} className="mx-8 md:mx-16 flex items-center justify-center w-40 md:w-56 h-20 relative transition-transform duration-300 hover:scale-110 pointer-events-auto">
                  <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. EVENT MOMENTS (PREMIUM CINEMATIC CAROUSEL) */}
        {/* NEW: min-h-[85vh] strictly frames it in the screen, pb-40 adds a huge buffer before the footer */}
        <section className="bg-white relative flex flex-col items-center justify-center min-h-[85vh] py-24 pb-40 overflow-hidden">
          
          <div className="w-full max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-center">
            <div className="relative inline-block">
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight uppercase">
                Event Moments
              </h2>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fca311] rounded-full"></div>
            </div>
          </div>

          <div className="relative w-full group">
            
            <button 
              onClick={() => scrollCarousel('prev')} 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-[#fca311] text-black w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <button 
              onClick={() => scrollCarousel('next')} 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-[#fca311] text-black w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>

            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-6 px-[10vw] md:px-[20vw] py-4 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {eventMoments.map((moment, index) => {
                const isActive = activeSlide === index;
                return (
                  <div 
                    key={moment.id}
                    data-index={index}
                    ref={(el) => (slideRefs.current[index] = el)}
                    className={`
                      shrink-0 w-[80vw] md:w-[60vw] h-[280px] md:h-[350px] snap-center rounded-xl md:rounded-[2rem] overflow-hidden relative transition-all duration-700 ease-out cursor-pointer shadow-2xl
                      ${isActive 
                        ? 'scale-100 opacity-100 blur-0 grayscale-0 border-4 border-[#fca311]/50'
                        : 'scale-[0.85] opacity-40 blur-[3px] grayscale hover:grayscale-0 hover:opacity-60'}
                    `}
                  >
                    <Image 
                      src={moment.src} 
                      alt={`Moment ${moment.id}`} 
                      fill 
                      className={`object-cover transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-110'}`} 
                    />
                    {isActive && <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl md:rounded-[2rem]"></div>}
                  </div>
                );
              })}
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {eventMoments.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${activeSlide === i ? 'w-8 bg-[#fca311]' : 'w-2 bg-gray-300'}`}
                ></div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* 9. PREMIUM THEMED FOOTER (CONTACT US) */}
      <footer className="relative w-full bg-[#0a0a0a] pt-20 md:pt-28 pb-8 overflow-hidden border-t-[6px] border-[#fca311]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#fca311]/15 to-transparent blur-3xl pointer-events-none rounded-full transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#f8981d]/10 to-transparent blur-3xl pointer-events-none rounded-full transform translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-12 md:gap-8 text-white mb-20">
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col font-sans leading-none cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-[#fca311] to-[#f8981d] rounded-lg flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_rgba(252,163,17,0.4)]">S</div>
                <span className="font-extrabold text-[1.4rem] tracking-tight text-white">SAP INSIDE TRACK</span>
              </div>
              <span className="font-semibold text-xs tracking-[0.2em] text-[#fca311] mt-2 ml-12">KOLKATA</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mt-4">
              © copyright SAP Inside Track Kolkata 2026.<br />All rights reserved.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-white tracking-wide">Pages</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50 font-medium">
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Home</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Schedule</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Registration</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Venue</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Certificates</a></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-white tracking-wide">Socials</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50 font-medium">
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Instagram</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Facebook</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-white tracking-wide">Legal</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50 font-medium">
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Cookie Policy</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-white tracking-wide">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/50 font-medium">
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Sponsor Us</a></li>
              <li><a href="#" className="hover:text-[#fca311] hover:translate-x-1 transition-all duration-300 inline-block">Call for Speakers</a></li>
            </ul>
          </div>
        </div>

        <div className="relative w-full overflow-hidden flex justify-center items-end pointer-events-none select-none px-4">
          <h1 className="font-heading font-black text-[22vw] md:text-[16vw] text-transparent bg-clip-text bg-gradient-to-b from-[#fca311]/10 to-[#fca311]/0 leading-[0.75] tracking-tighter">
            KOLKATA
          </h1>
        </div>
      </footer>

    </div>
  );
}