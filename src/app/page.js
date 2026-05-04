"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function EventCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Event photo ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-[#FFD200] w-4' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function InstagramEmbed() {
  useEffect(() => {
    // Load Instagram embed script
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, []);
  return null;
}

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
  const mediaSectionRef = useRef(null);
  const faqSectionRef = useRef(null);
  const recapSectionRef = useRef(null);
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
      image: '/past_events/SAP MINI SESSION 01.jpg',
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
    gsap.fromTo(peHeadingRef.current,
      { y: 40, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: pastEventsSectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      }
    );
    gsap.fromTo(peContentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.2,
        scrollTrigger: { trigger: pastEventsSectionRef.current, start: "top 80%", toggleActions: "play none none reset" },
        onStart: () => { if (peContentRef.current) peContentRef.current.style.visibility = 'visible'; }
      }
    );

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
    // 6. MEDIA COVERAGE & FAQ ANIMATIONS
    // ==========================================
    gsap.fromTo(mediaSectionRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: mediaSectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      }
    );
    gsap.fromTo(faqSectionRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: faqSectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      }
    );
    gsap.fromTo(recapSectionRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: recapSectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      }
    );

    // ==========================================
    // 7. FOOTER PARALLAX
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

      {/* --- PAST EVENTS SECTION (OLD ACCORDION — COMMENTED OUT) ---
      <section id="events" ref={pastEventsSectionRef} className="relative w-full h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6 md:px-16">
        ... (accordion + video version)
      </section>
      */}

      {/* --- PAST EVENTS SECTION (NEW CARD LAYOUT) --- */}
      <section id="events" ref={pastEventsSectionRef} className="relative w-full bg-black text-white py-20 md:py-28 px-6 md:px-[8%] overflow-hidden">

        {/* Heading */}
        <div ref={peHeadingRef} className="mb-10 md:mb-16">
          <h2 className="font-koyoto text-[#FFD200] text-[12vw] md:text-[72px] lg:text-[88px] leading-none tracking-wide">PAST EVENTS</h2>
          <div className="w-12 h-[3px] bg-[#FFD200] mt-4 rounded-full"></div>
          <p className="font-[family-name:var(--font-inter)] text-white/60 text-sm md:text-base mt-4 max-w-xl">
            A journey of innovation, connection, and learning — explore our past SAP Inside Track events and mini sessions held across Kolkata.
          </p>
        </div>

        {/* Events list */}
        <div ref={peContentRef} className="flex flex-col gap-16 md:gap-24 opacity-0 invisible">
          {[
            {
              id: 1,
              title: "SAP Mini Session 01",
              description: "An engaging hands-on mini session focused on SAP technologies, bringing together students and professionals for peer learning and knowledge sharing.",
              location: "Sister Nivedita University",
              date: "15th January 2026",
              images: [
                "/past_events/mini_session_01/IMG_7609.jpg",
                "/past_events/mini_session_01/4.jpg",
                "/past_events/mini_session_01/5.jpg",
                "/past_events/mini_session_01/6.jpg",
                "/past_events/mini_session_01/7.jpg",
                "/past_events/mini_session_01/8.jpg",
              ],
            },
            {
              id: 2,
              title: "SAP Mini Session 02",
              description: "The second edition of our mini session series, featuring expert talks and real-world SAP use cases in an interactive format.",
              location: "IEM Salt Lake (Godrej Genesis Building)",
              date: "21st February 2026",
              images: [
                "/past_events/mini_session_2/IMG_0032.jpg",
                "/past_events/mini_session_2/IMG_0035.jpg",
                "/past_events/mini_session_2/IMG_0054.jpg",
                "/past_events/mini_session_2/IMG_0103.jpg",
                "/past_events/mini_session_2/IMG_0128.jpg",
                "/past_events/mini_session_2/IMG_1636.jpg",
              ],
            },
            {
              id: 3,
              title: "SAP Inside Track Kolkata 2025",
              description: "Our flagship community event bringing together SAP professionals, developers, and enthusiasts for a full day of deep-dive sessions, networking, and knowledge sharing.",
              location: "St. Xavier's University, Newtown",
              date: "2nd August 2025",
              images: [
                "/past_events/sit_2025/1.jpg",
                "/past_events/sit_2025/2_2.jpg",
                "/past_events/sit_2025/3_3.jpg",
                "/past_events/sit_2025/4_4.jpg",
                "/past_events/sit_2025/5_5.jpg",
                "/past_events/sit_2025/6.jpg",
                "/past_events/sit_2025/7.jpg",
                "/past_events/sit_2025/8.jpg",
                "/past_events/sit_2025/9.jpg",
                "/past_events/sit_2025/10.jpg",
                "/past_events/sit_2025/11.jpg",
                "/past_events/sit_2025/12.jpg",
              ],
            },
            {
              id: 4,
              title: "SAP Inside Track Kolkata 2024",
              description: "The inaugural SAP Inside Track Kolkata — a landmark event that united the SAP community of Kolkata for the first time, setting the stage for future editions.",
              location: "Biswabangla Convention Center",
              date: "27th April 2024",
              images: [
                "/past_events/sit_2024/1.png",
                "/past_events/sit_2024/2.png",
                "/past_events/sit_2024/3.png",
                "/past_events/sit_2024/4.png",
                "/past_events/sit_2024/5.png",
              ],
            },
          ].map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={event.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-14 items-center group`}>
                <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <EventCarousel images={event.images} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
                <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start' : 'md:items-end md:text-right'}`}>
                  <h3 className="font-koyoto text-[#FFD200] text-2xl md:text-3xl lg:text-4xl leading-tight mb-3 md:mb-4">{event.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-white/70 text-sm md:text-base leading-relaxed mb-5 md:mb-6 max-w-md">{event.description}</p>
                  <div className={`flex flex-col gap-2 text-sm font-medium text-white/50 ${isEven ? 'items-start' : 'items-start md:items-end'}`}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#FFD200] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#FFD200] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
          TESTIMONIALS SECTION
      ========================================== */}
      <section className="relative w-full bg-black py-20 md:py-28 overflow-hidden">

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#FFD200]/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        {/* Heading */}
        <div className="relative z-10 text-center mb-12 md:mb-16 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-5">
            <svg className="w-3.5 h-3.5 text-[#FFD200]" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <span className="font-bebas text-white/70 tracking-widest text-sm">TESTIMONIALS</span>
          </div>
          <h2 className="font-koyoto text-white text-[8vw] md:text-[56px] lg:text-[68px] leading-tight">
            What Our<br /><span className="text-[#FFD200]">Community</span> Says
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-white/50 text-sm md:text-base mt-4 max-w-lg mx-auto">
            Hear from the professionals, students, and enthusiasts who've been part of SAP Inside Track Kolkata.
          </p>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative z-10 mb-4 overflow-hidden">
          <div className="flex gap-4 w-max" style={{ animation: 'scroll-left 40s linear infinite' }}>
            {[
              { name: "Koushik Goon", designation: "SAP Architect, BTP & Integration", quote: "SAP Inside Track Kolkata is one of the most well-organized community events I've attended. The quality of sessions and the energy of the audience is truly inspiring.", image: "/past_speakers/Kousik Goon - Chandika Sarkar.png" },
              { name: "Ritesh Agrawal", designation: "Founder & CEO, Ritzity", quote: "A fantastic platform for SAP professionals to connect, share, and grow. The event brings together the best minds in the SAP ecosystem under one roof.", image: "/past_speakers/Ritesh Agrawal - Chandika Sarkar.png" },
              { name: "Avijit Dhar", designation: "Application Architect, SAP BTP", quote: "The sessions were deeply technical yet accessible. I left with actionable insights and new connections that have already made a difference in my work.", image: "/past_speakers/AVIJIT DHAR - Chandika Sarkar.png" },
              { name: "Pankaj Lal", designation: "SAP TMS & YL, Westernacher", quote: "SIT Kolkata stands out for its community spirit. It's not just a conference — it's a movement that's shaping the future of SAP in Eastern India.", image: "/past_speakers/Pankaj Lal - Chandika Sarkar.png" },
              { name: "Koushik Goon", designation: "SAP Architect, BTP & Integration", quote: "SAP Inside Track Kolkata is one of the most well-organized community events I've attended. The quality of sessions and the energy of the audience is truly inspiring.", image: "/past_speakers/Kousik Goon - Chandika Sarkar.png" },
              { name: "Ritesh Agrawal", designation: "Founder & CEO, Ritzity", quote: "A fantastic platform for SAP professionals to connect, share, and grow. The event brings together the best minds in the SAP ecosystem under one roof.", image: "/past_speakers/Ritesh Agrawal - Chandika Sarkar.png" },
              { name: "Avijit Dhar", designation: "Application Architect, SAP BTP", quote: "The sessions were deeply technical yet accessible. I left with actionable insights and new connections that have already made a difference in my work.", image: "/past_speakers/AVIJIT DHAR - Chandika Sarkar.png" },
              { name: "Pankaj Lal", designation: "SAP TMS & YL, Westernacher", quote: "SIT Kolkata stands out for its community spirit. It's not just a conference — it's a movement that's shaping the future of SAP in Eastern India.", image: "/past_speakers/Pankaj Lal - Chandika Sarkar.png" },
            ].map((t, i) => (
              <div key={i} className="w-[320px] md:w-[380px] shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6 flex flex-col gap-4 hover:border-[#FFD200]/30 transition-colors duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-[family-name:var(--font-inter)] font-bold text-white text-sm md:text-base leading-tight">{t.name}</p>
                    <p className="font-[family-name:var(--font-inter)] text-white/40 text-xs mt-0.5">{t.designation}</p>
                  </div>
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover object-top shrink-0 border border-white/10" />
                </div>
                <p className="font-[family-name:var(--font-inter)] text-white/70 text-sm leading-relaxed">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative z-10 overflow-hidden">
          <div className="flex gap-4 w-max" style={{ animation: 'scroll-right 40s linear infinite' }}>
            {[
              { name: "Sumanta Basu", designation: "Senior Technical Architect, SAP", quote: "The depth of knowledge shared at SIT Kolkata is unmatched. Every session adds value and the networking opportunities are second to none.", image: "/past_speakers/Sumanta Basu - Chandika Sarkar.png" },
              { name: "Partho Goswami", designation: "CTO & Founder, NexGenCompany.ai", quote: "SIT Kolkata is where innovation meets community. The event perfectly blends technical excellence with real-world business impact.", image: "/past_speakers/Partha Goswami - Chandika Sarkar.png" },
              { name: "Arit Basu", designation: "Principal Consultant, SAP", quote: "An incredible event that brings the SAP community together. The passion and dedication of the organizers is evident in every detail.", image: "/past_speakers/Arit Basu - Chandika Sarkar.png" },
              { name: "Pritam Paul", designation: "Senior Resident Solution Architect", quote: "SIT Kolkata gave me the opportunity to share my knowledge and learn from peers. It's a must-attend for anyone in the SAP ecosystem.", image: "/past_speakers/pritam - Chandika Sarkar.png" },
              { name: "Sumanta Basu", designation: "Senior Technical Architect, SAP", quote: "The depth of knowledge shared at SIT Kolkata is unmatched. Every session adds value and the networking opportunities are second to none.", image: "/past_speakers/Sumanta Basu - Chandika Sarkar.png" },
              { name: "Partho Goswami", designation: "CTO & Founder, NexGenCompany.ai", quote: "SIT Kolkata is where innovation meets community. The event perfectly blends technical excellence with real-world business impact.", image: "/past_speakers/Partha Goswami - Chandika Sarkar.png" },
              { name: "Arit Basu", designation: "Principal Consultant, SAP", quote: "An incredible event that brings the SAP community together. The passion and dedication of the organizers is evident in every detail.", image: "/past_speakers/Arit Basu - Chandika Sarkar.png" },
              { name: "Pritam Paul", designation: "Senior Resident Solution Architect", quote: "SIT Kolkata gave me the opportunity to share my knowledge and learn from peers. It's a must-attend for anyone in the SAP ecosystem.", image: "/past_speakers/pritam - Chandika Sarkar.png" },
            ].map((t, i) => (
              <div key={i} className="w-[320px] md:w-[380px] shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6 flex flex-col gap-4 hover:border-[#FFD200]/30 transition-colors duration-300">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-[family-name:var(--font-inter)] font-bold text-white text-sm md:text-base leading-tight">{t.name}</p>
                    <p className="font-[family-name:var(--font-inter)] text-white/40 text-xs mt-0.5">{t.designation}</p>
                  </div>
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover object-top shrink-0 border border-white/10" />
                </div>
                <p className="font-[family-name:var(--font-inter)] text-white/70 text-sm leading-relaxed">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 h-full w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

      </section>

      {/* ==========================================
          SPONSORS & PARTNERS SECTION
      ========================================== */}
      <section id="sponsors" ref={sponsorsSectionRef} className="relative w-full py-16 md:py-28 bg-black overflow-hidden px-6 md:px-[8%]">

        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#FFD200]/4 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Main heading */}
          <div ref={sponsorsHeadingRef} className="mb-14 md:mb-20 opacity-0">
            <h2 className="font-koyoto text-white text-[10vw] md:text-[72px] lg:text-[88px] leading-none tracking-wide">PAST SPONSORS</h2>
            <h2 className="font-koyoto text-[#FFD200] text-[10vw] md:text-[72px] lg:text-[88px] leading-none tracking-wide">&amp; PARTNERS</h2>
            <div className="w-16 h-[3px] bg-[#FFD200] mt-5 rounded-full"></div>
          </div>

          <div ref={sponsorsStripRef} className="flex flex-col gap-14 md:gap-20 opacity-0">

            {/* PREMIUM SPONSORS */}
            <div className="flex flex-col items-center">
              <p className="font-bebas text-[#FFD200] tracking-[0.3em] text-base md:text-xl mb-6 md:mb-8">PREMIUM SPONSORS</p>
              <div className="flex flex-wrap gap-6 md:gap-10 items-center justify-center">
                {[
                  { name: "Westernacher Consulting", logo: "/premium sponsers/Westernacher Consulting.png" },
                  { name: "Galileo Group", logo: "/premium sponsers/gaglileo_group.png" },
                ].map(s => (
                  <div key={s.name} className="h-16 md:h-20 px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#FFD200]/40 transition-colors duration-300">
                    <img src={s.logo} alt={s.name} className="h-full w-auto object-contain" style={{ mixBlendMode: 'screen' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* BOOK & GOODIES SPONSORS */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center w-full">
              <div className="flex flex-col items-center">
                <p className="font-bebas text-[#FFD200] tracking-[0.3em] text-base md:text-xl mb-6">BOOK SPONSOR</p>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                  {[{ name: "SAP Press", logo: "/books sponser/sap press.png" }].map(s => (
                    <div key={s.name} className="h-16 md:h-20 px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#FFD200]/40 transition-colors duration-300">
                      <img src={s.logo} alt={s.name} className="h-full w-auto object-contain" style={{ mixBlendMode: 'screen' }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bebas text-[#FFD200] tracking-[0.3em] text-base md:text-xl mb-6">GOODIES SPONSOR</p>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                  {[{ name: "Linc", logo: "/goodies sponser/linc-removebg-preview.png" }].map(s => (
                    <div key={s.name} className="h-16 md:h-20 px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#FFD200]/40 transition-colors duration-300">
                      <img src={s.logo} alt={s.name} className="h-full w-auto object-contain" style={{ mixBlendMode: 'screen' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-px bg-white/10"></div>

            {/* IT COMMUNITY PARTNERS */}
            <div className="flex flex-col items-center">
              <p className="font-bebas text-[#FFD200] tracking-[0.3em] text-base md:text-xl mb-6 md:mb-8">IT COMMUNITY PARTNERS</p>
              <div className="flex flex-wrap gap-6 md:gap-8 items-center justify-center">
                {[
                  { name: "AWS User Group Kolkata", logo: "/it community partners/Aws usergroup Kolkata.jfif" },
                  { name: "Databricks User Group", logo: "/it community partners/Databrickes usergroup.jfif" },
                  { name: "Kolkata WordPress", logo: "/it community partners/Kolkata Wordpress.jfif" },
                ].map(s => (
                  <div key={s.name} className="h-16 md:h-20 px-5 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#FFD200]/40 transition-colors duration-300">
                    <img src={s.logo} alt={s.name} className="h-full w-auto object-contain max-w-[140px]"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* MEDIA PARTNERS */}
            <div className="flex flex-col items-center">
              <p className="font-bebas text-[#FFD200] tracking-[0.3em] text-base md:text-xl mb-6 md:mb-8">MEDIA PARTNERS</p>
              <div className="flex flex-wrap gap-6 md:gap-8 items-center justify-center">
                {[
                  { name: "Oh Kolkata", logo: "/media partners/Oh Kolkata.jpg" },
                  { name: "S Newz", logo: "/media partners/S Newz Logo.png" },
                  { name: "Wiki Kolkata", logo: "/media partners/wiki kolkata.png" },
                ].map(s => (
                  <div key={s.name} className="h-16 md:h-20 px-5 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#FFD200]/40 transition-colors duration-300">
                    <img src={s.logo} alt={s.name} className="h-full w-auto object-contain max-w-[140px]"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-px bg-white/10"></div>

            {/* COMMUNITY PARTNERS — moving marquee */}
            <div>
              <p ref={partnersHeadingRef} className="font-bebas text-[#FFD200] tracking-[0.3em] text-base md:text-xl mb-6 md:mb-8 opacity-0 text-center">COMMUNITY PARTNERS</p>
              <div ref={partnersStripRef} className="relative w-full overflow-hidden opacity-0">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
                <div className="flex w-max items-center gap-8 py-2" style={{ animation: 'scroll-left 90s linear infinite' }}
                  onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
                  onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
                >
                  {[...partnersList, ...partnersList, ...partnersList].map((partner, idx) => (
                    <div key={idx} className="h-14 md:h-16 px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <img src={partner.logo} alt={partner.name} className="h-full w-auto object-contain max-w-[120px]"
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          MEDIA COVERAGE SECTION
      ========================================== */}
      <section ref={mediaSectionRef} className="relative w-full bg-black py-20 md:py-28 px-6 md:px-[8%] overflow-hidden">

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#FFD200]/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Heading */}
          <div className="mb-12 md:mb-16">
            <p className="font-bebas text-[#FFD200] tracking-[0.3em] text-sm md:text-base mb-3">AS SEEN ON</p>
            <h2 className="font-koyoto text-white text-[10vw] md:text-[72px] lg:text-[80px] leading-none tracking-wide">MEDIA COVERAGE</h2>
            <div className="w-16 h-[3px] bg-[#FFD200] mt-4 rounded-full"></div>
            <p className="font-[family-name:var(--font-inter)] text-white/50 text-sm md:text-base mt-4 max-w-xl">
              Our events and community have been featured by media outlets — watch interviews and event coverage below.
            </p>
          </div>

          {/* Video grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

            {/* Video 1 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-[#FFD200]/40 transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/Q8THfAkNBzE"
                  title="SAP Inside Track Kolkata - Media Coverage 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-3 border-t border-white/10">
                <p className="font-[family-name:var(--font-inter)] text-white/70 text-sm font-medium">S Newz — Event Coverage</p>
              </div>
            </div>

            {/* Video 2 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-[#FFD200]/40 transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/-0eUrIdtmXs"
                  title="SAP Inside Track Kolkata - Media Coverage 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-3 border-t border-white/10">
                <p className="font-[family-name:var(--font-inter)] text-white/70 text-sm font-medium">S Newz — Community Interview</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          FAQ SECTION
      ========================================== */}

      {/* ==========================================
          2025 RECAP SECTION
      ========================================== */}
      <section ref={recapSectionRef} className="relative w-full bg-black py-20 md:py-28 px-6 md:px-[8%] overflow-hidden">

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#FFD200]/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">

          {/* Heading */}
          <div className="mb-10 md:mb-14">
            <p className="font-bebas text-[#FFD200] tracking-[0.3em] text-sm md:text-base mb-3">RELIVE THE MOMENT</p>
            <h2 className="font-koyoto text-white text-[8vw] md:text-[56px] lg:text-[68px] leading-tight">
              SAP INSIDE TRACK<br /><span className="text-[#FFD200]">KOLKATA 2025</span> RECAP
            </h2>
            <div className="w-16 h-[3px] bg-[#FFD200] mt-5 rounded-full mx-auto"></div>
          </div>

          {/* Instagram Reel embed */}
          <div className="w-full max-w-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(255,210,0,0.08)]">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/reel/DX4kks0t5pj/?igsh=N204bnVnZ2V3dWIx"
              data-instgrm-version="14"
              style={{
                background: '#000',
                border: 0,
                borderRadius: '16px',
                margin: 0,
                maxWidth: '100%',
                minWidth: '326px',
                padding: 0,
                width: '100%',
              }}
            >
              <div style={{ padding: '16px' }}>
                <a
                  href="https://www.instagram.com/reel/DX4kks0t5pj/?igsh=N204bnVnZ2V3dWIx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-inter)] text-[#FFD200] text-sm underline"
                >
                  View SAP Inside Track Kolkata 2025 Recap on Instagram
                </a>
              </div>
            </blockquote>
            <InstagramEmbed />
          </div>

        </div>
      </section>
      <section id="faq" ref={faqSectionRef} className="relative w-full bg-black py-20 md:py-32 px-6 md:px-[8%] overflow-hidden">

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