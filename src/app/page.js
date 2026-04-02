"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border-t border-white/10 transition-colors duration-300 ${open ? 'border-[#FFD200]/30' : ''}`}
      onClick={() => setOpen(!open)}
    >
      <button className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4 group cursor-pointer">
        <span className={`font-[family-name:var(--font-inter)] font-semibold text-base md:text-lg transition-colors duration-300 ${open ? 'text-[#FFD200]' : 'text-white/90 group-hover:text-white'}`}>
          {question}
        </span>
        <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? 'border-[#FFD200] bg-[#FFD200]/10 rotate-45' : 'border-white/20 bg-white/5'}`}>
          <svg className={`w-3 h-3 transition-colors duration-300 ${open ? 'text-[#FFD200]' : 'text-white/60'}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? '300px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="font-[family-name:var(--font-inter)] text-white/50 text-sm md:text-base leading-relaxed pb-6 max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  // Hero Refs
  const heroSectionRef = useRef(null);
  const chainRef = useRef(null);
  const textRef = useRef(null);
  const pillRef = useRef(null);
  const kolkataRefs = useRef([]);
  const navRefs = useRef([]);

  // About Us Refs
  const aboutSectionRef = useRef(null);
  const aboutContentRef = useRef(null);
  const usRef = useRef(null);
  const aboutTextRef = useRef(null);
  const victoriaRef = useRef(null);
  const wordRefs = useRef([]);
  const blackFadeOverlayRef = useRef(null);

  // Past Events Refs
  const pastEventsSectionRef = useRef(null);
  const peVideoRef = useRef(null);
  const peContentRef = useRef(null);
  const peHeadingRef = useRef(null);
  const peLeftColRef = useRef(null);
  const peRightColRef = useRef(null);

  // Past Speakers Refs & State
  const speakersSectionRef = useRef(null);
  const pastHeadingRef = useRef(null);
  const speakersHeadingRef = useRef(null);
  const speakersCarouselRef = useRef(null);
  const speakersScrollRef = useRef(null);
  const sponsorsSectionRef = useRef(null);
  const sponsorsHeadingRef = useRef(null);
  const sponsorsStripRef = useRef(null);
  const partnersHeadingRef = useRef(null);
  const partnersStripRef = useRef(null);
  const footerRef = useRef(null);
  const footerContentRef = useRef(null);
  const footerWatermarkRef = useRef(null);
  const cursorRef = useRef(null);
  const isCarouselHovered = useRef(false);
  const isCarouselDragging = useRef(false);
  const carouselStartX = useRef(0);
  const carouselScrollLeft = useRef(0);

  // Past Events accordion state
  const [activeEvent, setActiveEvent] = useState('mini1');
  const [scrollProgress, setScrollProgress] = useState(0);

  const eventData = {
    sit2025: {
      label: 'SIT 2025',
      description: 'SAP Inside Track Kolkata 2025 — 2nd August 2025, St. Xavier\'s University, Newtown.',
      image: '/past_events/SAP INSIDE TRACK KOLKATA 2025.JPG',
      pill: 'SIT 2025',
    },
    mini1: {
      label: 'MINI SESSION 01',
      description: 'SAP Mini Session 01 — 15th January 2026, Sister Nivedita University.',
      image: '/past_events/SAP MINI SESSION 01.JPG',
      pill: 'MINI SESSION 01',
    },
    mini2: {
      label: 'MINI SESSION 02',
      description: 'SAP Mini Session 02 — 21st February 2026, IEM Salt Lake (Godrej Genesis Building).',
      image: '/past_events/SAP MINI SESSION 02.JPG',
      pill: 'MINI SESSION 02',
    },
  };

  const allTabs = ['mini1', 'mini2', 'sit2025'];
  const navLinks = [
    { label: 'HOME',     href: '#home' },
    { label: 'ABOUT',    href: '#about' },
    { label: 'EVENTS',   href: '#events' },
    { label: 'SPEAKERS', href: '#speakers' },
    { label: 'PARTNERS', href: '#sponsors' },
    { label: 'FAQ',      href: '#faq' },
  ];

  // Past Speakers data
  const speakersData = [
    { id: 1,  name: "Koushik Goon",           designation: "SAP Architect (BTP, Integration, Clean Core)",                image: "/past_speakers/Kousik Goon - Chandika Sarkar.png" },
    { id: 2,  name: "Abhishek Chatterjee",     designation: "Software Specialist, Evora IT Solution",                     image: "/past_speakers/Abhishek Chatterjee - Chandika Sarkar.png" },
    { id: 3,  name: "Sangeeta Majumdar",       designation: "SAP Architect – Supply Chain, Warehousing & AI Innovation",  image: "/past_speakers/Sangeeta Majumder - Chandika Sarkar.png" },
    { id: 4,  name: "Ritesh Agrawal",          designation: "Founder & CEO @ Ritzity, SAP Strategy Consulting",          image: "/past_speakers/Ritesh Agrawal - Chandika Sarkar.png" },
    { id: 5,  name: "Aditi Chatterjee",        designation: "Sr. Managing Consultant & Application Architect",            image: "/past_speakers/aditi Chatterjee - Chandika Sarkar.png" },
    { id: 6,  name: "Avijit Dhar",             designation: "Application Architect (SAP BTP, Gen AI, Integration)",       image: "/past_speakers/AVIJIT DHAR - Chandika Sarkar.png" },
    { id: 7,  name: "Rohan Ghosh",             designation: "Associate Manager, Accenture",                               image: "/past_speakers/Rohan Ghosh - Chandika Sarkar.png" },
    { id: 8,  name: "Biswajit Sarkar",         designation: "Senior Technology Architect, Mactores",                      image: "/past_speakers/Biswajit Sarkar - Chandika Sarkar.png" },
    { id: 9,  name: "Pankaj Lal",              designation: "SAP TMS & YL (PMP), Westernacher Consulting",               image: "/past_speakers/Pankaj Lal - Chandika Sarkar.png" },
    { id: 10, name: "Jayabharathy Jothiprakasam", designation: "SAP IBP Practice Director, India",                        image: "/past_speakers/Jayabharathy Jothiprakasam - Chandika Sarkar.png" },
    { id: 11, name: "Partho Goswami",          designation: "CTO & Founder, NexGenCompany.ai",                           image: "/past_speakers/Partha Goswami - Chandika Sarkar.png" },
    { id: 12, name: "Sumanta Basu",            designation: "Senior Technical Architect, SAP Integration & ABAP",        image: "/past_speakers/Sumanta Basu - Chandika Sarkar.png" },
    { id: 13, name: "Sunil Chopra",            designation: "Director, SAP ALM RGTM Global",                             image: "/past_speakers/Sunil Chopra - Pritam Paul.jpeg" },
    { id: 14, name: "Arghadip Kar",            designation: "SAP S/4HANA ABAP Workflow & VIM Consultant",                image: "/past_speakers/arghadip kar - Chandika Sarkar.png" },
    { id: 15, name: "Arit Basu",               designation: "Principal Consultant, SAP Business Network for Supply Chain",image: "/past_speakers/Arit Basu - Chandika Sarkar.png" },
    { id: 16, name: "Prasun Dutta",            designation: "Partner Executive, SAP Practice Leader",                    image: "/past_speakers/Prasun Dutta - Chandika Sarkar.png" },
    { id: 17, name: "Srini Gottimukkula",      designation: "VP Data & Analytics, Business Cloud Product Management",    image: "/past_speakers/Srini - Chandika Sarkar.png" },
    { id: 18, name: "Avik Poddar",             designation: "SAP Certified Developer & EWM with S/4HANA",               image: "/past_speakers/Avik Poddar - Chandika Sarkar.png" },
    { id: 19, name: "Sharmistha Sanyal",       designation: "Solution Architect, Pre-Sales Lead APAC",                   image: "/past_speakers/Sharmistha - Chandika Sarkar.png" },
    { id: 20, name: "Debashis Majumder",       designation: "Sr. Director Demand Generation, Customer Solution Manager", image: "/past_speakers/Debashish - Chandika Sarkar.png" },
    { id: 21, name: "Indranil Mitra",          designation: "Partner @ PwC",                                             image: "/past_speakers/Indranil Mitra - Pritam Paul.png" },
    { id: 22, name: "Tilak Kumar Dhar",        designation: "Leads Databricks PS Global Delivery Center, India",         image: "/past_speakers/tilak - Chandika Sarkar.png" },
    { id: 23, name: "Pritam Paul",             designation: "Senior Resident Solution Architect @ Databricks",           image: "/past_speakers/pritam - Chandika Sarkar.png" },
    { id: 24, name: "Mohd Afsar Imam",         designation: "Sr. Solutions Consultant",                                  image: "/past_speakers/mohd - Chandika Sarkar.png" },
    { id: 25, name: "Dipanwita Dutta",         designation: "Founder @ INSEARCH",                                        image: "/past_speakers/dipannita - Chandika Sarkar.png" },
    { id: 26, name: "Monimoy Kundu",           designation: "Engagement Partner @ TCS",                                  image: "/past_speakers/monimoy - Chandika Sarkar.png" },
    { id: 27, name: "Amitava Nag",             designation: "Deep Account Manager, Amazon Web Services India",           image: "/past_speakers/amitava - Chandika Sarkar.png" },
    { id: 28, name: "Vishwa Vivek Anand",      designation: "Global Head, SAP Analytics CoE at TCS",                    image: "/past_speakers/viswa - Chandika Sarkar.png" },
    { id: 29, name: "Manoj Mishra",            designation: "Head SAP & Applications, Century Plyboards India",         image: "/past_speakers/manoj - Chandika Sarkar.png" },
    { id: 30, name: "Prof. Amlan Chakrabarti", designation: "Professor & Director, A.K. Choudhury School of IT, CU",    image: "/past_speakers/Amlan - Diya Dasgupta.png" },
    { id: 31, name: "Dr. Saptarsi Goswami",   designation: "Asst. Prof Comp Sc, AI Researcher",                        image: "/past_speakers/saptarsi goswami - Diya Dasgupta.png" },
    { id: 32, name: "Sabyasachi Biswas",       designation: "Chief Executive Officer @ VIKI.AI",                        image: "/past_speakers/sabyasachi biswas - Diya Dasgupta.png" },
  ];
  // Duplicating for the infinite seamless loop effect
  const infiniteSpeakers = [...speakersData, ...speakersData];

  const sponsorsList = [
    { name: "WESTERNACHER CONSULTING", logo: "/past_sponsers/westernacher-removebg-preview.png" },
    { name: "SAP PRESS", logo: "/past_sponsers/sap_press-removebg-preview.png" },
    { name: "LINC LIMITED", logo: "/past_sponsers/linc-removebg-preview.png" },
  ];

  const partnersList = [
    { name: "Apex Circle", logo: "/community_partners/Apex Circle logo (1) - Yuvraj Prasad.jpg" },
    { name: "InnovateX", logo: "/community_partners/black logo innovatex (1) - InnovateX.jpg" },
    { name: "GDG On Campus", logo: "/community_partners/Copy of GDG On Campus - Horizontal - Template - KAUSTUBH PAUL.png" },
    { name: "Digital Dominators", logo: "/community_partners/Digital Dominators- logo 2 - DIGITAL DOMINATORS.png" },
    { name: "EDC", logo: "/community_partners/final edc logo - Dipu Shaw.png" },
    { name: "Group", logo: "/community_partners/Group 1000006169 - Chandika Sarkar.png" },
    { name: "HITian Inside", logo: "/community_partners/HITian Inside LOGO-01 - Alipto Choudhury.jpeg" },
    { name: "LNC Community", logo: "/community_partners/LNC Community with gradient name below - Snihita Nandi.png" },
    { name: "Imperio Coders", logo: "/community_partners/logo - Imperio Coders Official.png" },
    { name: "Anonymous Legion", logo: "/community_partners/logo_TAL - Anonymous Legion.png" },
    { name: "Postman Kolkata", logo: "/community_partners/Postman_Kolkata - Suman Singha.png" },
    { name: "Samarth", logo: "/community_partners/samarth logo violet-1 - Anirban Bandyopadhyay.png" },
    { name: "Repository", logo: "/community_partners/White BG Logo - Repository.png" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.round((window.scrollY / total) * 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 1. HERO SECTION ANIMATIONS
    // ==========================================
    if (chainRef.current) {
      gsap.fromTo(chainRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 1.8, ease: "power2.out", onComplete: () => {
            gsap.to(chainRef.current, { y: 12, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true });
            gsap.to(chainRef.current, { x: 6, duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true });
            gsap.to(chainRef.current, { rotation: 0.8, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true });
          }
        }
      );
    }

    gsap.fromTo(
      navRefs.current.filter(Boolean),
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: "power2.out", delay: 0.4 }
    );

    if (textRef.current) {
      gsap.fromTo(textRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.3 });
    }

    if (pillRef.current) {
      gsap.fromTo(pillRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1.2, ease: "power2.out", delay: 0.6 });
    }

    kolkataRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: i === 0 ? 1 : [0.6, 0.30, 0.1, 0.04][i - 1],
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.8 + i * 0.15,
        }
      );
    });

    // ==========================================
    // 2. ABOUT US SCROLL ANIMATION
    // ==========================================
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: "bottom center",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    const tlAbout = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "top top",
        end: "+=350%",
        scrub: 2,
        pin: true,
      }
    });

    tlAbout
      .set(aboutContentRef.current, { autoAlpha: 1 })
      .fromTo(usRef.current, { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })
      .fromTo(aboutTextRef.current, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "<0.2")
      .fromTo(victoriaRef.current, { y: 180, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, "<0.3")
      .fromTo(
        wordRefs.current.filter(Boolean),
        { filter: "blur(14px)", opacity: 0, y: 12 },
        { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" },
        "<0.4"
      )
      .to(blackFadeOverlayRef.current, { opacity: 1, duration: 2, ease: "power2.inOut" }, "+=0.5");

    // ==========================================
    // 3. PAST EVENTS SCROLL ANIMATION
    // ==========================================
    const tlPastEvents = gsap.timeline({
      scrollTrigger: {
        trigger: pastEventsSectionRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1.5,
        pin: true,
      }
    });

    tlPastEvents
      .to(peVideoRef.current, { y: "-100vh", scale: 0.95, opacity: 0, duration: 2.5, ease: "power1.inOut" })
      .set(peContentRef.current, { autoAlpha: 1 })
      .fromTo(peHeadingRef.current, { y: 40, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }, "<0.1")
      .fromTo(peLeftColRef.current, { y: 30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }, "<0.3")
      .fromTo(peRightColRef.current, { y: 30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }, "<0.2");

    // ==========================================
    // 4. PAST SPEAKERS ENTRANCE ANIMATION
    // ==========================================
    gsap.fromTo(pastHeadingRef.current,
      { x: -200, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: speakersSectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      }
    );
    gsap.fromTo(speakersHeadingRef.current,
      { x: 200, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: speakersSectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      }
    );
    gsap.fromTo(speakersCarouselRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.4,
        scrollTrigger: { trigger: speakersSectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      }
    );

    // ==========================================
    // 5. SPONSORS & PARTNERS ENTRANCE ANIMATION
    // ==========================================
    // Sponsors heading fades up
    gsap.fromTo(sponsorsHeadingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: sponsorsHeadingRef.current, start: "top 85%", toggleActions: "play none none reset" }
      }
    );
    // Sponsors strip slides in from left
    gsap.fromTo(sponsorsStripRef.current,
      { opacity: 0, x: -80 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: sponsorsStripRef.current, start: "top 90%", toggleActions: "play none none reset" }
      }
    );
    // Partners heading fades up
    gsap.fromTo(partnersHeadingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: partnersHeadingRef.current, start: "top 85%", toggleActions: "play none none reset" }
      }
    );
    // Partners strip slides in from right
    gsap.fromTo(partnersStripRef.current,
      { opacity: 0, x: 80 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: partnersStripRef.current, start: "top 90%", toggleActions: "play none none reset" }
      }
    );

    // ==========================================
    // 6. FOOTER PARALLAX
    // ==========================================
    // Content block rises up as you scroll into footer
    gsap.fromTo(footerContentRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 85%", toggleActions: "play none none reset" }
      }
    );
    // Watermark moves at a slower rate than scroll — classic parallax
    gsap.to(footerWatermarkRef.current, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // ==========================================
  // 4. SPEAKERS CAROUSEL AUTO-SCROLL LOGIC
  // ==========================================
  useEffect(() => {
    let animationFrameId;
    const playCarousel = () => {
      if (speakersScrollRef.current && !isCarouselHovered.current && !isCarouselDragging.current) {
        speakersScrollRef.current.scrollLeft += 1.2;
        if (speakersScrollRef.current.scrollLeft >= speakersScrollRef.current.scrollWidth / 2) {
          speakersScrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(playCarousel);
    };
    playCarousel();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // ==========================================
  // CUSTOM CURSOR ANIMATION
  // ==========================================
  useEffect(() => {
    if (!cursorRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });

    let hasMoved = false;
    const handleMouseMove = (e) => {
      if (!hasMoved) {
        gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3 });
        hasMoved = true;
      }
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const interactables = document.querySelectorAll("a, button");
    const onMouseEnter = () => gsap.to(cursorRef.current, { scale: 3.5, duration: 0.3, ease: "power2.out" });
    const onMouseLeave = () => gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });

    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  // Mouse & Touch events for manual dragging of the carousel
  const handleCarouselMouseDown = (e) => {
    isCarouselDragging.current = true;
    isCarouselHovered.current = true;
    carouselStartX.current = e.pageX - speakersScrollRef.current.offsetLeft;
    carouselScrollLeft.current = speakersScrollRef.current.scrollLeft;
  };

  const handleCarouselMouseMove = (e) => {
    if (!isCarouselDragging.current) return;
    e.preventDefault();
    const x = e.pageX - speakersScrollRef.current.offsetLeft;
    const walk = (x - carouselStartX.current) * 1.5;
    speakersScrollRef.current.scrollLeft = carouselScrollLeft.current - walk;
  };

  const handleCarouselMouseUpOrLeave = () => {
    isCarouselDragging.current = false;
    isCarouselHovered.current = false;
  };

  const handleCarouselTouchStart = (e) => {
    isCarouselDragging.current = true;
    carouselStartX.current = e.touches[0].pageX - speakersScrollRef.current.offsetLeft;
    carouselScrollLeft.current = speakersScrollRef.current.scrollLeft;
  };

  const handleCarouselTouchMove = (e) => {
    if (!isCarouselDragging.current) return;
    const x = e.touches[0].pageX - speakersScrollRef.current.offsetLeft;
    const walk = (x - carouselStartX.current) * 1.5;
    speakersScrollRef.current.scrollLeft = carouselScrollLeft.current - walk;
  };

  return (
    <div className="relative w-full bg-black selection:bg-[#FFD200] selection:text-black md:cursor-none">

      {/* Custom mix-blend-difference cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-white z-[9999] pointer-events-none opacity-0 scale-0 hidden md:block"
        style={{ mixBlendMode: 'difference' }}
      />

      {/* Scroll progress indicator — only visible after scrolling starts */}
      <div className={`fixed bottom-8 right-6 md:right-10 z-[9998] cursor-none transition-all duration-500 ${scrollProgress > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button
          onClick={() => scrollProgress >= 98 && window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${scrollProgress >= 98 ? 'cursor-pointer' : 'cursor-none'}`}
        >
          {/* SVG circular track */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            {/* Background track */}
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
            {/* Progress arc */}
            <circle
              cx="28" cy="28" r="24"
              fill="none"
              stroke="#FFD200"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-150"
            />
          </svg>

          {/* Center content */}
          <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
            {scrollProgress >= 98 ? (
              /* Arrow up icon */
              <svg className="w-4 h-4 text-[#FFD200]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <span className="font-bebas text-[11px] text-white leading-none tracking-wide">{scrollProgress}%</span>
            )}
          </div>
        </button>
      </div>

      {/* --- HERO SECTION --- */}
      <section id="home" ref={heroSectionRef} className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-background.png" alt="Dark noisy background" fill priority className="object-cover opacity-80" />
        </div>

        <div className="absolute top-6 left-[4%] md:left-[6%] z-30 flex items-center">
          <Image src="/sap-logo.png" alt="SAP Inside Track Kolkata" width={160} height={90} className="object-contain" />
        </div>

        <div className="absolute top-4 right-[2%] md:right-[3%] z-30 hidden md:flex flex-col items-end leading-[1.2]">
          {navLinks.map((link, i) => (
            <a key={link.label} ref={(el) => (navRefs.current[i] = el)} href={link.href} className="font-bebas text-base md:text-[20px] text-white tracking-[0.05em] hover:text-[#FFD200] transition-colors duration-300 relative group opacity-0">
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFD200] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div ref={pillRef} className="absolute bottom-35 md:bottom-20 left-[24%] md:left-[6%] z-30 opacity-0">
          <div className="px-7 md:px-10 py-2.5 md:py-3 rounded-full border border-white/10 bg-white/10 backdrop-blur-md flex items-center gap-3 md:gap-8 shadow-2xl">
            <span className="font-bebas text-base md:text-[22px] text-white tracking-widest mt-1">INNOVATE</span>
            <span className="font-bebas text-base md:text-[22px] text-white tracking-widest mt-1">CONNECT</span>
            <span className="font-bebas text-base md:text-[22px] text-white tracking-widest mt-1">LEARN</span>
          </div>
        </div>

        <div ref={textRef} className="absolute top-[30%] md:top-[28%] left-0 w-full h-full z-20 pointer-events-none opacity-0">
          <div className="absolute left-[2%] md:left-[6%]">
            <h1 className="font-koyoto text-[40vw] md:text-[220px] lg:text-[260px] xl:text-[300px] leading-[0.75] text-white">
              S<span className="text-[#FFD200] md:text-white">A</span>P
            </h1>
          </div>
          <div className="absolute top-[18%] md:top-[5%] left-[30%] md:left-[48%] pr-[4%] md:pr-[10%] flex flex-col items-start">
            <h1 className="font-koyoto text-[11vw] md:text-[85px] lg:text-[100px] xl:text-[118px] leading-[0.85] text-white tracking-wide whitespace-nowrap">
              INSIDE TR<span className="text-[#FFD200] md:text-white">A</span>CK
            </h1>
            <h2 ref={(el) => (kolkataRefs.current[0] = el)} className="font-koyoto text-[11vw] md:text-[85px] lg:text-[100px] xl:text-[118px] leading-[0.85] text-[#FFD200] tracking-wide mt-1 ml-[33%] md:ml-[33%] opacity-0">
              KOLKATA
            </h2>
            <div className="flex flex-col -space-y-1 md:-space-y-0 lg:-space-y-2 mt-[-4px] md:mt-[-16px] ml-[33%] md:ml-[33%]">
              {[0.6, 0.30, 0.1, 0.04].map((opacity, i) => (
                <h2 key={i} ref={(el) => (kolkataRefs.current[i + 1] = el)} className="font-koyoto text-[11vw] md:text-[85px] lg:text-[100px] xl:text-[118px] leading-[0.85] text-outline-yellow tracking-wide opacity-0">
                  KOLKATA
                </h2>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile hamburger nav */}
        <div className="absolute top-4 right-[4%] z-30 md:hidden">
          <details className="group">
            <summary className="list-none cursor-pointer flex flex-col gap-1.5 p-2">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-4 h-0.5 bg-white"></span>
            </summary>
            <div className="absolute right-0 top-10 bg-black/90 backdrop-blur-md rounded-xl border border-white/10 p-4 flex flex-col gap-3 min-w-[140px]">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="font-bebas text-lg text-white tracking-widest hover:text-[#FFD200] transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </details>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <img ref={chainRef} src="/hero-chain.png" alt="Floating chain" className="h-[110vh] md:h-[105vh] w-auto object-contain max-w-none opacity-0" />
        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" ref={aboutSectionRef} className="relative w-full h-screen bg-white overflow-hidden">

        <div ref={aboutContentRef} className="absolute inset-0 w-full h-full z-10 opacity-0 invisible text-black overflow-hidden">

          <div className="absolute left-[1%] md:left-[3%] top-[2%] flex flex-row items-start gap-2 md:gap-6 leading-none">
            <span ref={usRef} className="font-koyoto font-extrabold text-[12vw] md:text-[11vw] lg:text-[10vw] text-[#0d2b5c] leading-[0.85] [writing-mode:vertical-lr]">
              US
            </span>
            <span ref={aboutTextRef} className="font-koyoto font-extrabold text-[12vw] md:text-[11vw] lg:text-[10vw] text-[#0d2b5c] leading-[0.85] [writing-mode:vertical-lr] mt-[8%] md:mt-[34%]">
              ABOUT
            </span>
          </div>

          {(() => {
            const p1Words = `SAP Inside Track Kolkata is a community-driven event that brings together SAP professionals, developers, students, and technology enthusiasts to share knowledge and real-world experiences from the SAP ecosystem. As part of the global SAP Inside Track initiative, the event focuses on open knowledge sharing, peer-to-peer learning, and meaningful discussions.`.split(" ");
            const p2Words = `Attendees gain practical insights from industry experts, explore real-world SAP use cases, and connect with professionals working across the SAP landscape. The event provides a collaborative platform to learn, network, and grow within the global SAP community.`.split(" ");
            return (
              <>
                {/* Desktop: absolute positioned top-right. Mobile: stacked flow */}
                <div className="md:absolute md:top-[5%] md:left-[26%] md:right-[23%] absolute top-[25%] left-[20%] w-[76%] md:w-auto md:top-[5%] z-10">
                  <p className="font-[family-name:var(--font-inter)] text-black/80 font-medium text-xs md:text-lg lg:text-[1.1rem] leading-relaxed">
                    {p1Words.map((word, i) => (
                      <span key={`p1-${i}`} ref={(el) => (wordRefs.current[i] = el)} className="inline-block mr-[0.3em] opacity-0">{word}</span>
                    ))}
                  </p>
                </div>

                {/* Desktop: absolute right column. Mobile: stacked below p1 */}
                <div className="md:absolute md:top-[32%] md:left-[76%] md:right-[4%] absolute top-[48%] left-[20%] w-[76%] md:w-auto z-10">
                  <p className="font-[family-name:var(--font-inter)] text-black/80 font-medium text-xs md:text-base lg:text-[1rem] leading-relaxed">
                    {p2Words.map((word, i) => (
                      <span key={`p2-${i}`} ref={(el) => (wordRefs.current[p1Words.length + i] = el)} className="inline-block mr-[0.3em] opacity-0">{word}</span>
                    ))}
                  </p>
                </div>
              </>
            );
          })()}

          <div ref={victoriaRef} className="absolute bottom-[-2%] left-[6%] md:left-[26%] w-[90%] md:w-[48%] pointer-events-none z-0">
            <img src="/victoria.png" alt="Victoria Memorial" className="w-full h-auto mix-blend-multiply opacity-90" />
          </div>

        </div>

        <div ref={blackFadeOverlayRef} className="absolute inset-0 bg-black z-50 opacity-0 pointer-events-none"></div>

      </section>

      {/* --- PAST EVENTS SECTION --- */}
      <section id="events" ref={pastEventsSectionRef} className="relative w-full h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6 md:px-16">

        <div ref={peVideoRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-video overflow-hidden z-20">
          <video src="/past-events-video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>

        <div ref={peContentRef} className="absolute inset-0 z-10 w-full h-full flex items-start md:items-center opacity-0 invisible px-[6%] md:px-[8%] pt-[20%] md:pt-0">

          <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-16 items-start lg:items-center">
            <div ref={peLeftColRef} className="w-full lg:w-1/2 flex flex-col">

              <div ref={peHeadingRef} className="mb-2 md:mb-6">
                <h2 className="font-koyoto text-[#FFD200] text-[10vw] md:text-[56px] lg:text-[64px] leading-none tracking-wide">
                  PAST EVENTS
                </h2>
              </div>

              <p className="font-[family-name:var(--font-inter)] text-white/80 text-xs md:text-base lg:text-lg leading-relaxed mb-3 md:mb-8 max-w-lg">
                A journey of innovation, connection, and learning — explore our past SAP Inside Track events and mini sessions held across Kolkata.
              </p>

              <div className="flex flex-col">
                {allTabs.map((key) => {
                  const item = eventData[key];
                  const isActive = activeEvent === key;
                  return (
                    <div key={key} className="border-t border-white/10">
                      <button
                        onClick={() => setActiveEvent(key)}
                        className={`w-full text-left font-bebas tracking-widest py-2 md:py-4 transition-colors duration-300 text-xl md:text-[32px] ${isActive ? 'text-[#FFD200]' : 'text-[#A68A00] hover:text-[#FFD200]'}`}
                      >
                        {item.label}
                      </button>

                      <div
                        className="overflow-hidden transition-all duration-500 ease-in-out"
                        style={{ maxHeight: isActive ? '120px' : '0px', opacity: isActive ? 1 : 0 }}
                      >
                        <p className="font-[family-name:var(--font-inter)] text-white/70 text-xs md:text-base leading-relaxed pb-2 md:pb-6 max-w-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Image — shown on mobile at bottom, on desktop as right column */}
            <div ref={peRightColRef} className="w-full lg:w-1/2 flex lg:justify-end justify-center">
              <div className="relative w-full max-w-[340px] lg:max-w-[520px] aspect-[4/3] rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-2xl group">
                <img
                  key={activeEvent}
                  src={eventData[activeEvent].image.replace(/ /g, '%20')}
                  alt={eventData[activeEvent].label}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ animation: 'imgFadeIn 0.5s ease' }}
                />
                <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6">
                  <div className="px-4 md:px-7 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-[#d97706] to-[#eab308] border border-white/30 backdrop-blur-md shadow-xl text-white font-bebas tracking-widest text-sm md:text-lg">
                    {eventData[activeEvent].pill}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          PAST SPEAKERS SECTION
      ========================================== */}
      <section id="speakers" ref={speakersSectionRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">

        {/* Background Infinite Video */}
        <video
          src="/past-speakers-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        />

        {/* Headings positioned exactly as in the design */}
        <div ref={pastHeadingRef} className="absolute top-[4%] left-3 md:top-1 md:left-12 z-10 pointer-events-none" style={{ opacity: 0 }}>
          <h2 className="font-koyoto text-white text-[22vw] md:text-[140px] lg:text-[140px] leading-none tracking-wide drop-shadow-2xl">
            PAST
          </h2>
        </div>
        <div ref={speakersHeadingRef} className="absolute bottom-[30%] right-3 md:bottom-1 md:right-12 z-10 pointer-events-none" style={{ opacity: 0 }}>
          <h2 className="font-koyoto text-white text-[18vw] md:text-[120px] lg:text-[140px] leading-none tracking-wide drop-shadow-2xl">
            SPEAKERS
          </h2>
        </div>

        {/* Circular Glassmorphism Drag & Auto-scroll Carousel */}
        <div className="relative z-20 w-full h-full flex items-start md:items-center pt-[50%] md:pt-0" ref={speakersCarouselRef} style={{ opacity: 0 }}>
          <div
            ref={speakersScrollRef}
            className="flex gap-4 md:gap-16 overflow-x-auto overflow-y-hidden px-[5vw] md:px-[10vw] cursor-grab active:cursor-grabbing w-full items-center [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            // Event Listeners for Hover to Pause
            onMouseEnter={() => (isCarouselHovered.current = true)}
            onMouseLeave={() => {
              isCarouselHovered.current = false;
              handleCarouselMouseUpOrLeave();
            }}
            // Event Listeners for Mouse Dragging
            onMouseDown={handleCarouselMouseDown}
            onMouseMove={handleCarouselMouseMove}
            onMouseUp={handleCarouselMouseUpOrLeave}
            // Event Listeners for Touch/Mobile Swiping
            onTouchStart={handleCarouselTouchStart}
            onTouchMove={handleCarouselTouchMove}
            onTouchEnd={handleCarouselMouseUpOrLeave}
          >
            {infiniteSpeakers.map((speaker, idx) => (
              <div
                key={idx}
                className="relative w-[240px] md:w-[270px] lg:w-[300px] shrink-0 select-none rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] group"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)' }}
              >
                {/* Image — fixed height */}
                <div className="w-full h-[210px] md:h-[240px] overflow-hidden relative shrink-0">
                  <img
                    src={speaker.image.replace(/ /g, '%20')}
                    alt={speaker.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay at bottom of image */}
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* Glassmorphic info bar */}
                <div
                  className="w-full h-[84px] flex flex-col justify-center gap-0.5 px-4 py-2 border-t border-white/10 overflow-hidden shrink-0"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
                >
                  <h3 className="font-[family-name:var(--font-inter)] font-bold text-white text-sm md:text-base tracking-wide leading-tight truncate">
                    {speaker.name}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-white/50 text-xs md:text-sm font-normal leading-tight">
                    {speaker.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ==========================================
          SPONSORS & PARTNERS SECTION
      ========================================== */}
      <section id="sponsors" ref={sponsorsSectionRef} className="relative w-full py-12 md:py-32 bg-black overflow-hidden flex flex-col items-center justify-center gap-10 md:gap-24">

        {/* PAST SPONSORS */}
        <div className="w-full flex flex-col items-center gap-6 md:gap-10">
          <h2 ref={sponsorsHeadingRef} className="font-koyoto text-white text-[10vw] md:text-5xl lg:text-[64px] tracking-widest uppercase text-center opacity-0">PAST SPONSORS</h2>
          <div ref={sponsorsStripRef} className="relative w-full bg-zinc-900/40 backdrop-blur-md border-y border-white/5 py-8 md:py-10 overflow-hidden opacity-0">
            <div className="flex w-max items-center" style={{ animation: 'scroll-right 35s linear infinite' }}
              onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
            >
              {[...sponsorsList, ...sponsorsList, ...sponsorsList, ...sponsorsList].map((sponsor, idx) => (
                <div key={idx} className="flex items-center justify-center w-[220px] md:w-[300px] shrink-0">
                  <img src={sponsor.logo} alt={sponsor.name} className="h-20 md:h-30 object-contain" style={{ mixBlendMode: 'screen' }}
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                  />
                  <span className="hidden text-white/60 font-bebas text-4xl tracking-widest">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMMUNITY PARTNERS */}
        <div className="w-full flex flex-col items-center gap-6 md:gap-10">
          <h2 ref={partnersHeadingRef} className="font-koyoto text-white text-[9vw] md:text-5xl lg:text-[64px] tracking-widest uppercase text-center opacity-0">COMMUNITY PARTNERS</h2>
          <div ref={partnersStripRef} className="relative w-full bg-zinc-900/40 backdrop-blur-md border-y border-white/5 py-8 md:py-10 overflow-hidden opacity-0">
            <div className="flex w-max items-center" style={{ animation: 'scroll-left 90s linear infinite' }}
              onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
            >
              {[...partnersList, ...partnersList, ...partnersList, ...partnersList].map((partner, idx) => (
                <div key={idx} className="flex items-center justify-center w-[220px] md:w-[300px] shrink-0">
                  <img src={partner.logo} alt={partner.name} className="h-10 md:h-14 object-contain"
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                  />
                  <span className="hidden text-white/60 font-bebas text-4xl tracking-widest">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ==========================================
          FAQ SECTION
      ========================================== */}
      <section id="faq" className="relative w-full bg-black py-20 md:py-32 px-6 md:px-[8%] overflow-hidden">

        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#FFD200]/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Heading */}
          <div className="mb-12 md:mb-16">
            <h2 className="font-koyoto text-white text-[12vw] md:text-[80px] lg:text-[96px] leading-none tracking-wide">FAQ</h2>
            <div className="w-12 h-[3px] bg-[#FFD200] mt-4 rounded-full"></div>
          </div>

          {/* FAQ Items */}
          {[
            { q: "What is SAP Inside Track Kolkata?", a: "SAP Inside Track Kolkata is a community-driven event where SAP professionals, experts, and enthusiasts come together to share knowledge, insights, and real-world experiences around SAP technologies." },
            { q: "Who should attend this event?", a: "This event is ideal for students, developers, SAP professionals, and anyone interested in learning about SAP and enterprise technologies." },
            { q: "How can I register for the event?", a: "You can register through the official event website using the registration link provided on the homepage. Follow our social media channels to stay updated on upcoming events and announcements." },
            { q: "Is the event free or paid?", a: "SAP Inside Track events are usually free or have a minimal registration fee. Please check the registration page for exact details." },
            { q: "What is the date and venue of the event?", a: "The event date, time, and venue details are mentioned on the website and will also be shared in your registration confirmation email." },
            { q: "What kind of sessions or topics will be covered?", a: "The event will feature expert talks, real-world use cases, technical sessions, and discussions on various SAP technologies and industry trends." },
            { q: "Who are the speakers at the event?", a: "Speakers are experienced SAP professionals, industry experts, and community leaders who bring practical insights and real-world experience." },
            { q: "Do I need prior SAP knowledge to attend?", a: "No, prior SAP knowledge is not mandatory. The event is designed for both beginners and experienced attendees." },
            { q: "How can I contact the organizers for queries?", a: "You can reach out to the organizers through the contact section on the website or via the official email info@sitkolkata.org and social media channels." },
          ].map(({ q, a }, i) => (
            <FAQItem key={i} question={q} answer={a} />
          ))}

        </div>
      </section>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer id="contact" ref={footerRef} className="relative w-full bg-[#0a0a0a] pt-16 md:pt-24 pb-8 overflow-hidden border-t-[4px] border-[#FFD200]">

        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#FFD200]/15 to-transparent blur-3xl pointer-events-none rounded-full -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#FFD200]/10 to-transparent blur-3xl pointer-events-none rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div ref={footerContentRef} className="relative z-10 max-w-6xl mx-auto px-6 w-full text-white mb-12 md:mb-16 opacity-0">

          {/* Mobile: logo top-center. Desktop: hidden (logo is in the middle of the row) */}
          <div className="flex justify-center mb-6 md:hidden">
            <Image src="/sap-logo.png" alt="SAP Inside Track Kolkata" width={140} height={80} className="object-contain" />
          </div>

          {/* Mobile: contact left + socials right. Desktop: contact | logo | socials */}
          <div className="flex flex-row justify-between md:flex-row md:items-start md:justify-between gap-6 md:gap-12">

            {/* Contact */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h4 className="font-bebas text-[#FFD200] tracking-[0.2em] text-lg">CONTACT</h4>
              <ul className="flex flex-col gap-2 md:gap-3">
                {[
                  { label: 'info@sitkolkata.org', href: 'mailto:info@sitkolkata.org', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
                  { label: 'Sponsor Us', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
                  { label: 'Call for Speakers', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z' },
                ].map(({ label, href, icon }) => (
                  <li key={label} className="list-none">
                    <a href={href || '#'} target={href?.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer" className="flex items-center gap-2 text-xs md:text-sm text-white/50 hover:text-[#FFD200] transition-colors duration-300">
                      <svg className="w-3 h-3 md:w-4 md:h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                      </svg>
                      <span className="truncate max-w-[120px] md:max-w-none">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-white/30 text-[10px] md:text-xs mt-2 md:mt-4">© 2026 SAP Inside Track Kolkata.<br />All rights reserved.</p>
            </div>

            {/* Logo — center, desktop only */}
            <div className="hidden md:flex flex-col items-center gap-3 mx-auto mt-6 md:mt-12">
              <Image src="/sap-logo.png" alt="SAP Inside Track Kolkata" width={160} height={90} className="object-contain md:w-[220px] md:h-[124px]" />
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h4 className="font-bebas text-[#FFD200] tracking-[0.2em] text-lg">SOCIALS</h4>
              <ul className="flex flex-col gap-2 md:gap-3">
                {[
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sap-inside-track-kolkata/', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
                  { label: 'Instagram', href: 'https://www.instagram.com/sitkolkata?igsh=MXFidTkweDNjd3d4dg==', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z' },
                ].map(({ label, href, icon }) => (
                  <li key={label} className="list-none">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs md:text-sm text-white/50 hover:text-[#FFD200] transition-colors duration-300">
                      <svg className="w-3 h-3 md:w-4 md:h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                      </svg>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Big KOLKATA watermark */}
        <div ref={footerWatermarkRef} className="relative w-full overflow-hidden flex justify-center items-end pointer-events-none select-none">
          <h1 className="font-koyoto text-[12vw] md:text-[15vw] text-transparent bg-clip-text bg-gradient-to-b from-[#FFD200]/10 to-[#FFD200]/0 leading-[0.85] tracking-[0.05em] whitespace-nowrap">
            SIT KOLKATA
          </h1>
        </div>

      </footer>

    </div>
  );
}