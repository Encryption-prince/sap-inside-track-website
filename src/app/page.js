"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const isCarouselHovered = useRef(false);
  const isCarouselDragging = useRef(false);
  const carouselStartX = useRef(0);
  const carouselScrollLeft = useRef(0);

  // Past Events accordion state
  const [activeEvent, setActiveEvent] = useState('mini');

  const eventData = {
    mini: {
      label: 'MINI SESSIONS',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.',
      image: '/past-events-thumb.png',
      pill: 'MINI SESSION',
    },
    sit2025: {
      label: 'SIT 2025',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.',
      image: '/moment-1.png',
      pill: 'SIT 2025',
    },
    sit2024: {
      label: 'SIT 2024',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.',
      image: '/moment-2.png',
      pill: 'SIT 2024',
    },
  };

  const allTabs = ['mini', 'sit2025', 'sit2024'];
  const navLinks = ['HOME', 'ABOUT', 'EVENT', 'TEAM', 'FAQ'];

  // Dummy data for Speakers Carousel
  const speakersData = [
    { id: 1, name: "NAME", designation: "Designation", image: "/speaker-1.png" },
    { id: 2, name: "NAME", designation: "Designation", image: "/speaker-2.png" },
    { id: 3, name: "NAME", designation: "Designation", image: "/speaker-3.jpg" },
    { id: 4, name: "NAME", designation: "Designation", image: "/speaker-1.png" },
    { id: 5, name: "NAME", designation: "Designation", image: "/speaker-2.png" },
  ];
  // Duplicating for the infinite seamless loop effect
  const infiniteSpeakers = [...speakersData, ...speakersData, ...speakersData, ...speakersData];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // 1. HERO SECTION ANIMATIONS
    // ==========================================
    if (chainRef.current) {
      gsap.fromTo(chainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: "power2.out", onComplete: () => {
          gsap.to(chainRef.current, { y: 12, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true });
          gsap.to(chainRef.current, { x: 6, duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true });
          gsap.to(chainRef.current, { rotation: 0.8, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true });
        }}
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
      .fromTo(peHeadingRef.current,  { y: 40, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }, "<0.1")
      .fromTo(peLeftColRef.current,  { y: 30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }, "<0.3")
      .fromTo(peRightColRef.current, { y: 30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }, "<0.2");

    // ==========================================
    // 4. PAST SPEAKERS ENTRANCE ANIMATION
    // ==========================================
    gsap.fromTo(pastHeadingRef.current,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: speakersSectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      }
    );
    gsap.fromTo(speakersHeadingRef.current,
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: speakersSectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      }
    );
    gsap.fromTo(speakersCarouselRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.4,
        scrollTrigger: { trigger: speakersSectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      }
    );

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

  // Mouse & Touch events for manual dragging of the carousel
  const handleCarouselMouseDown = (e) => {
    isCarouselDragging.current = true;
    carouselStartX.current = e.pageX - speakersScrollRef.current.offsetLeft;
    carouselScrollLeft.current = speakersScrollRef.current.scrollLeft;
  };

  const handleCarouselMouseMove = (e) => {
    if (!isCarouselDragging.current) return;
    e.preventDefault();
    const x = e.pageX - speakersScrollRef.current.offsetLeft;
    const walk = (x - carouselStartX.current) * 2;
    speakersScrollRef.current.scrollLeft = carouselScrollLeft.current - walk;
  };

  const handleCarouselMouseUpOrLeave = () => {
    isCarouselDragging.current = false;
  };

  const handleCarouselTouchStart = (e) => {
    isCarouselDragging.current = true;
    carouselStartX.current = e.touches[0].pageX - speakersScrollRef.current.offsetLeft;
    carouselScrollLeft.current = speakersScrollRef.current.scrollLeft;
  };

  const handleCarouselTouchMove = (e) => {
    if (!isCarouselDragging.current) return;
    const x = e.touches[0].pageX - speakersScrollRef.current.offsetLeft;
    const walk = (x - carouselStartX.current) * 2;
    speakersCarouselRef.current.scrollLeft = carouselScrollLeft.current - walk;
  };

  return (
    <div className="relative w-full bg-black selection:bg-[#FFD200] selection:text-black">
      
      {/* --- HERO SECTION --- */}
      <section ref={heroSectionRef} className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-background.png" alt="Dark noisy background" fill priority className="object-cover opacity-80" />
        </div>

        <div className="absolute top-6 left-[4%] md:left-[6%] z-30 flex items-center">
          <Image src="/sap-logo.png" alt="SAP Inside Track Kolkata" width={160} height={90} className="object-contain" />
        </div>

        <div className="absolute top-4 right-[2%] md:right-[3%] z-30 flex flex-col items-end leading-[1.2]">
          {navLinks.map((link, i) => (
            <a key={link} ref={(el) => (navRefs.current[i] = el)} href={`#${link.toLowerCase()}`} className="font-bebas text-xl md:text-[26px] text-white tracking-[0.05em] hover:text-[#FFD200] transition-colors duration-300 relative group opacity-0">
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFD200] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div ref={pillRef} className="absolute bottom-16 md:bottom-20 left-[4%] md:left-[6%] z-30 opacity-0">
          <div className="px-6 md:px-10 py-2 md:py-3 rounded-full border border-white/10 bg-white/10 backdrop-blur-md flex items-center gap-5 md:gap-8 shadow-2xl">
            <span className="font-bebas text-lg md:text-[22px] text-white tracking-widest mt-1">INNOVATE</span>
            <span className="font-bebas text-lg md:text-[22px] text-white tracking-widest mt-1">CONNECT</span>
            <span className="font-bebas text-lg md:text-[22px] text-white tracking-widest mt-1">LEARN</span>
          </div>
        </div>

        <div ref={textRef} className="absolute top-[22%] md:top-[28%] left-0 w-full h-full z-20 pointer-events-none opacity-0">
          <div className="absolute left-[4%] md:left-[6%]">
            <h1 className="font-koyoto text-[22vw] md:text-[220px] lg:text-[260px] xl:text-[300px] leading-[0.75] text-white">SAP</h1>
          </div>
          <div className="absolute top-[10%] md:top-[5%] left-[48%] md:left-[48%] pr-[12%] md:pr-[10%] flex flex-col items-start">
            <h1 className="font-koyoto text-[8vw] md:text-[85px] lg:text-[100px] xl:text-[118px] leading-[0.85] text-white tracking-wide whitespace-nowrap">
              INSIDE TRACK
            </h1>
            <h2 ref={(el) => (kolkataRefs.current[0] = el)} className="font-koyoto text-[8vw] md:text-[85px] lg:text-[100px] xl:text-[118px] leading-[0.85] text-[#FFD200] tracking-wide mt-1 ml-[12%] md:ml-[33%] opacity-0">
              KOLKATA
            </h2>
            <div className="flex flex-col -space-y-2 md:-space-y-0 lg:-space-y-2 mt-[-6px] md:mt-[-16px] ml-[12%] md:ml-[33%]">
              {[0.6, 0.30, 0.1, 0.04].map((opacity, i) => (
                <h2 key={i} ref={(el) => (kolkataRefs.current[i + 1] = el)} className="font-koyoto text-[8vw] md:text-[85px] lg:text-[100px] xl:text-[118px] leading-[0.85] text-outline-yellow tracking-wide opacity-0">
                  KOLKATA
                </h2>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <img ref={chainRef} src="/hero-chain.png" alt="Floating chain" className="h-[95vh] md:h-[105vh] w-auto object-contain max-w-none opacity-0" />
        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section ref={aboutSectionRef} className="relative w-full h-screen bg-white overflow-hidden">
        
        <div ref={aboutContentRef} className="absolute inset-0 w-full h-full z-10 opacity-0 invisible text-black overflow-hidden">

          <div className="absolute left-[2%] md:left-[3%] top-[4%] flex flex-row items-start gap-4 md:gap-6 leading-none">
            <span ref={usRef} className="font-koyoto font-extrabold text-[13vw] md:text-[11vw] lg:text-[10vw] text-[#0d2b5c] leading-[0.85] [writing-mode:vertical-lr]">
              US
            </span>
            <span ref={aboutTextRef} className="font-koyoto font-extrabold text-[13vw] md:text-[11vw] lg:text-[10vw] text-[#0d2b5c] leading-[0.85] [writing-mode:vertical-lr] mt-[12%] md:mt-[34%]">
              ABOUT
            </span>
          </div>

          {(() => {
            const p1Words = `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. This is a new world, we are born to rule and conquer the entire world with domination. Lets show the nation what true independence means.`.split(" ");
            const p2Words = `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Keep following us in the same way u did and let us grow together and make a family united and unbreakable`.split(" ");
            return (
              <>
                <div className="absolute top-[10%] left-[24%] md:left-[26%] right-[3%] md:right-[23%] z-10">
                  <p className="font-[family-name:var(--font-inter)] text-black/80 font-medium text-base md:text-lg lg:text-[1.1rem] leading-relaxed">
                    {p1Words.map((word, i) => (
                      <span key={`p1-${i}`} ref={(el) => (wordRefs.current[i] = el)} className="inline-block mr-[0.3em] opacity-0">{word}</span>
                    ))}
                  </p>
                </div>

                <div className="absolute top-[32%] left-[76%] md:left-[76%] right-[3%] md:right-[4%] z-10">
                  <p className="font-[family-name:var(--font-inter)] text-black/80 font-medium text-sm md:text-base lg:text-[1rem] leading-relaxed">
                    {p2Words.map((word, i) => (
                      <span key={`p2-${i}`} ref={(el) => (wordRefs.current[p1Words.length + i] = el)} className="inline-block mr-[0.3em] opacity-0">{word}</span>
                    ))}
                  </p>
                </div>
              </>
            );
          })()}

          <div ref={victoriaRef} className="absolute bottom-[-2%] left-[28%] md:left-[26%] w-[52%] md:w-[48%] pointer-events-none z-0">
            <img src="/victoria.png" alt="Victoria Memorial" className="w-full h-auto mix-blend-multiply opacity-90" />
          </div>

        </div>

        <div ref={blackFadeOverlayRef} className="absolute inset-0 bg-black z-50 opacity-0 pointer-events-none"></div>

      </section>

      {/* --- PAST EVENTS SECTION --- */}
      <section ref={pastEventsSectionRef} className="relative w-full h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6 md:px-16">
        
        <div ref={peVideoRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-video overflow-hidden z-20">
          <video src="/past-events-video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>

        <div ref={peContentRef} className="absolute inset-0 z-10 w-full h-full flex items-center opacity-0 invisible px-[6%] md:px-[8%]">
          
          <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">
            <div ref={peLeftColRef} className="w-full lg:w-1/2 flex flex-col">

              <div ref={peHeadingRef} className="mb-4 md:mb-6">
                <h2 className="font-koyoto text-[#FFD200] text-[8vw] md:text-[56px] lg:text-[64px] leading-none tracking-wide">
                  PAST EVENTS
                </h2>
              </div>

              <p className="font-[family-name:var(--font-inter)] text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.
              </p>

              <div className="flex flex-col">
                {allTabs.map((key) => {
                  const item = eventData[key];
                  const isActive = activeEvent === key;
                  return (
                    <div key={key} className="border-t border-white/10">
                      <button
                        onClick={() => setActiveEvent(key)}
                        className={`w-full text-left font-bebas tracking-widest py-3 md:py-4 transition-colors duration-300 text-2xl md:text-[32px] ${isActive ? 'text-[#FFD200]' : 'text-[#A68A00] hover:text-[#FFD200]'}`}
                      >
                        {item.label}
                      </button>

                      <div
                        className="overflow-hidden transition-all duration-500 ease-in-out"
                        style={{ maxHeight: isActive ? '300px' : '0px', opacity: isActive ? 1 : 0 }}
                      >
                        <p className="font-[family-name:var(--font-inter)] text-white/70 text-sm md:text-base leading-relaxed pb-4 md:pb-6 max-w-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            <div ref={peRightColRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl group">
                <img
                  key={activeEvent}
                  src={eventData[activeEvent].image}
                  alt={eventData[activeEvent].label}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ animation: 'imgFadeIn 0.5s ease' }}
                />
                <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6">
                  <div className="px-5 md:px-7 py-2 rounded-full bg-gradient-to-r from-[#d97706] to-[#eab308] border border-white/30 backdrop-blur-md shadow-xl text-white font-bebas tracking-widest text-base md:text-lg">
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
      <section ref={speakersSectionRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
        
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
        <div ref={pastHeadingRef} className="absolute top-6 left-6 md:top-1 md:left-12 z-10 pointer-events-none" style={{opacity: 0}}>
          <h2 className="font-koyoto text-white text-[18vw] md:text-[140px] lg:text-[140px] leading-none tracking-wide drop-shadow-2xl">
            PAST
          </h2>
        </div>
        <div ref={speakersHeadingRef} className="absolute bottom-6 right-6 md:bottom-1 md:right-12 z-10 pointer-events-none" style={{opacity: 0}}>
          <h2 className="font-koyoto text-white text-[15vw] md:text-[120px] lg:text-[140px] leading-none tracking-wide drop-shadow-2xl">
            SPEAKERS
          </h2>
        </div>

        {/* Circular Glassmorphism Drag & Auto-scroll Carousel */}
        <div className="relative z-20 w-full h-full flex items-center" ref={speakersCarouselRef} style={{opacity: 0}}>
          <div
            ref={speakersScrollRef}
            /* Hide scrollbars natively but allow overflow logic */
            className="flex gap-8 md:gap-16 overflow-x-auto overflow-y-hidden px-[10vw] cursor-grab active:cursor-grabbing w-full items-center [&::-webkit-scrollbar]:hidden"
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
                className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[400px] rounded-full overflow-hidden shrink-0 select-none border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#1a1a1a]/60 backdrop-blur-sm"
              >
                {/* Concentric Arch Image Container: 
                  Geometrically exact math. If width is 84%, pushing it 8% from the top 
                  and applying rounded-t-full creates a perfect semi-circle that aligns 
                  flawlessly with the outer border radius!
                */}
                <div className="absolute top-[8%] left-[8%] w-[84%] h-[42%] rounded-t-full overflow-hidden pointer-events-none">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Text Container - Centered in the bottom 50% of the circle */}
                <div className="absolute bottom-0 left-0 w-full h-[50%] flex flex-col items-center justify-center text-white pointer-events-none pb-[4%]">
                  <h3 className="font-[family-name:var(--font-inter)] font-bold text-lg md:text-xl tracking-wide leading-tight">
                    {speaker.name}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-white/70 font-normal mt-1 md:mt-1.5">
                    {speaker.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}