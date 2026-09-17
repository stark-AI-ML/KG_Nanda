import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Menu, X, Activity, ShieldAlert, HeartPulse, BedDouble, Scan, FlaskConical, Baby, Flame, Sparkles, Pill, Stethoscope, Scissors, ClipboardCheck } from 'lucide-react';
import LanguageTranslator from './LanguageTranslator';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null); // 'facilities' | 'department' | 'media' | null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(prev => {
        const offset = window.scrollY;
        if (prev) {
          return offset > 20;
        } else {
          return offset > 100;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenAccordion(null);
  };

  const toggleAccordion = (key) => {
    setOpenAccordion(prev => prev === key ? null : key);
  };


  const facilitiesData = [
    {
      title: "Emergency Care",
      icon: <ShieldAlert className="w-5 h-5 text-red-500 transition-transform duration-300 group-hover/item:scale-110" />,
      href: "/emergency"
    },
    {
      title: "OPD",
      icon: <HeartPulse className="w-5 h-5 text-blue-500 transition-transform duration-300 group-hover/item:scale-110" />,
      href: "/opd"
    },
    {
      title: "Diagnostic Center",
      icon: <Scan className="w-5 h-5 text-purple-500 transition-transform duration-300 group-hover/item:scale-110" />,
      href: "/diagnostic"
    },
    {
      title: "ICU",
      icon: <Activity className="w-5 h-5 text-rose-600 transition-transform duration-300 group-hover/item:scale-110" />,
      href: "/icu"
    },
    {
      title: "NICU & PICU",
      icon: <Baby className="w-5 h-5 text-pink-500 transition-transform duration-300 group-hover/item:scale-110" />,
      href: "/nicupicu"
    },
    {
      title: "Digital X-Ray",
      icon: <Scan className="w-5 h-5 text-cyan-500 transition-transform duration-300 group-hover/item:scale-110" />,
      href: "/xray"
    },
    {
      title: "Pathology",
      icon: <Stethoscope className="w-5 h-5 text-indigo-500 transition-transform duration-300 group-hover/item:scale-110" />,
      href: "/pathology"
    },
    {
      title: "OT & Surgery",
      icon: <Scissors className="w-5 h-5 text-slate-600 transition-transform duration-300 group-hover/item:scale-110" />,
      href: "/ot-surgery"
    },
  ];
  const departmentsData = [
    "Gynecology & Obstetrics",
     "General Surgery",
     "Urology",
      "Pediatrics",
       "Orthopedics",
        "ENT",
        "Dental Care",
    "General Medicine",
  ];

  return (
    <>
      <header className={`w-full font-sans select-none sticky top-0 z-[999] transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-3xl shadow-[0_12px_40px_-15px_rgba(0,70,132,0.15)] border-b border-[#35b6b4]/30'
        : 'bg-white/98 backdrop-blur-2xl shadow-[0_10px_30px_-10px_rgba(0,58,112,0.08)] border-b border-white/50'
        }`}>


        {/* 1. TOP PREMIUM BLUE STRIP - Fixed flickering layout shift */}
        <div className={`bg-gradient-to-r from-[#002850] via-[#004684] to-[#002850] text-white text-[11px] sm:text-[13px] md:text-[14px] font-medium px-4 sm:px-6 flex justify-center items-center text-center shadow-inner relative overflow-hidden transition-all duration-500 ease-in-out origin-top ${isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none scale-y-0' : 'max-h-12 py-2.5 opacity-100 scale-y-100'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]"></div>
          <div className="max-w-7xl w-full flex justify-between items-center opacity-90 tracking-wide relative z-10 gap-2">

            {/* Left - Updated Address with responsive display */}
            <div className="flex-1 min-w-0 px-2 sm:px-4 text-left border-r border-white/20 truncate">
              <span className="hidden sm:inline">Bichhiya Kala, Chandauli, Uttar Pradesh 232104</span>
             
            </div>

            {/* Right - Helpline Numbers */}
            <div className="flex-shrink-0 px-2 sm:px-4 text-right flex justify-end items-center gap-2 sm:gap-4">

              {/* Helpline No. 1 */}
              <a href="tel:8840376333" className="inline-flex items-center gap-1.5 hover:text-blue-200 transition-colors" title="Call Helpline No. 1">
                <svg className="w-[14px] h-[14px] text-[#35b6b4]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.366 16.918l-3.234-1.618a1.364 1.364 0 00-1.593.303l-1.428 1.428a15.707 15.707 0 01-6.567-6.567l1.428-1.428a1.364 1.364 0 00.303-1.593L8.665 4.21a1.366 1.366 0 00-1.536-.777l-4.14 1.035A1.364 1.364 0 002 5.803C2 14.733 9.267 22 18.197 22a1.364 1.364 0 001.335-1.014l1.035-4.14a1.367 1.367 0 00-.201-1.928z" />
                </svg>
                <span className="whitespace-nowrap text-[11px] sm:text-[13px]">
                  <span className="text-white/80 font-medium hidden sm:inline">Helpline No. 1: </span>
                  <strong className="font-bold text-white">8840376333</strong>
                </span>
              </a>

              {/* HelpLine No. 2 */}
              <a href="tel:9838850287" className="inline-flex items-center gap-1.5 hover:text-blue-200 transition-colors border-l border-white/20 pl-2 sm:pl-3" title="Call HelpLine No. 2">
                <svg className="w-[14px] h-[14px] text-[#35b6b4]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.366 16.918l-3.234-1.618a1.364 1.364 0 00-1.593.303l-1.428 1.428a15.707 15.707 0 01-6.567-6.567l1.428-1.428a1.364 1.364 0 00.303-1.593L8.665 4.21a1.366 1.366 0 00-1.536-.777l-4.14 1.035A1.364 1.364 0 002 5.803C2 14.733 9.267 22 18.197 22a1.364 1.364 0 001.335-1.014l1.035-4.14a1.367 1.367 0 00-.201-1.928z" />
                </svg>
                <span className="whitespace-nowrap text-[11px] sm:text-[13px]">
                  <span className="text-white/80 font-medium hidden sm:inline">HelpLine No. 2: </span>
                  <strong className="font-bold text-white">9838850287</strong>
                </span>
              </a>

            </div>
          </div>
        </div>
        {/* 2. MAIN NAVIGATION BAR */}
        <div className={`w-full px-4 sm:px-6 md:px-10 lg:px-16 flex justify-between items-center max-w-7xl mx-auto transition-all duration-500 ${isScrolled ? 'py-2' : 'py-3 sm:py-4'}`}>

          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 sm:space-x-3 cursor-pointer no-underline group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-[#35b6b4] blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"></div>
              <img
                src="/Logo/Logo.png"
                alt="K. G. Nanda Hospital Logo"
                className={`object-contain transition-all duration-500 group-hover:rotate-[6deg] group-hover:scale-110 relative z-10 ${isScrolled ? 'w-9 h-9 sm:w-11 sm:h-11' : 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'}`}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-extrabold text-[#003a70] group-hover:font-black transition-all duration-300 ${isScrolled ? 'text-[16px] sm:text-[18px]' : 'text-[17px] sm:text-[19px] md:text-[22px]'}`}>
                K. G. Nanda
              </span>
              <span className={`text-[#35b6b4] tracking-[0.15em] uppercase font-semibold group-hover:font-bold transition-all duration-300 ${isScrolled ? 'text-[10px] sm:text-[11px]' : 'text-[11px] sm:text-[12px] md:text-[14px]'}`}>
                Hospital
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-[#003a70] text-[14px] xl:text-[15px] font-semibold">
            <a href="/about-us" className="relative group py-2 hover:text-[#35b6b4] transition-colors duration-300">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#dd5200] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>

            {/* Premium Facilities Dropdown */}
            <div className="relative group py-2 cursor-pointer flex items-center">
              <div className="flex items-center space-x-1 hover:text-[#35b6b4] transition-colors duration-300">
                <span>Facilities</span>
                <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </div>
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#dd5200] transition-all duration-300 group-hover:w-full rounded-full"></span>

              {/* Premium Compact Floating Card Container */}
              <div className="absolute top-full left-0 pt-3 w-[280px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white border border-slate-100/80 shadow-[0_20px_50px_rgba(0,26,56,0.18)] rounded-xl flex flex-col relative z-0 overflow-hidden">
                  {/* Decorative subtle header line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#35b6b4] to-[#004684] z-10"></div>

                  <div className="py-1">
                    {facilitiesData.map((facility, index) => (
                      <a
                        key={index}
                        href={facility.href}
                        className="flex items-center gap-3.5 px-4 py-2.5 text-[#003a70] border-b border-slate-50 last:border-0 hover:bg-[#f6f5ee] transition-colors group/item"
                      >
                        {/* Compact Icon with Uniform Teal Color */}
                        <div className="flex-shrink-0 [&_svg]:!w-[18px] [&_svg]:!h-[18px] [&_svg]:!text-[#35b6b4] group-hover/item:[&_svg]:!text-[#dd5200] transition-colors">
                          {facility.icon}
                        </div>

                        {/* Compact Title */}
                        <span className="text-[14.5px] font-semibold leading-tight group-hover/item:text-[#dd5200] transition-colors">
                          {facility.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="relative group py-2 cursor-pointer flex items-center">
              <div className="flex items-center space-x-1 hover:text-[#35b6b4] transition-colors duration-300">
                <span>Department</span>
                <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </div>
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#dd5200] transition-all duration-300 group-hover:w-full rounded-full"></span>
              <div className="absolute top-full left-0 pt-6 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,58,112,0.15)] rounded-2xl flex flex-col overflow-y-auto text-[#003a70] text-[14px] font-medium translate-y-4 group-hover:translate-y-0 transition-all duration-300 max-h-[420px]">
                  {departmentsData.map((dept, index) => (
                    <a key={index} href={`/${dept.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="px-6 py-3.5 hover:bg-[#f6f5ee] hover:text-[#dd5200] hover:font-bold transition-all border-b border-[#003a70]/5 last:border-none flex items-center gap-3 group/item relative overflow-hidden">
                      <span className="absolute left-0 top-0 w-1 h-full bg-[#dd5200] transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#35b6b4] opacity-50 group-hover/item:opacity-100 transition-all duration-300"></span>
                      {dept}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Media Dropdown */}
            <div className="relative group py-2 cursor-pointer flex items-center">
              <div className="flex items-center space-x-1 hover:text-[#35b6b4] transition-colors duration-300">
                <span>Media</span>
                <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </div>
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#dd5200] transition-all duration-300 group-hover:w-full rounded-full"></span>
              <div className="absolute top-full left-0 pt-6 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,58,112,0.15)] rounded-2xl flex flex-col overflow-hidden text-[#003a70] text-[14px] font-medium translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <a href="/news" className="px-6 py-3.5 hover:bg-[#f6f5ee] hover:text-[#dd5200] hover:font-bold transition-all border-b border-[#003a70]/5 flex items-center gap-3 group/item relative overflow-hidden">
                    <span className="absolute left-0 top-0 w-1 h-full bg-[#dd5200] transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#35b6b4] opacity-50"></span>
                    News
                  </a>
                  <a href="/blog" className="px-6 py-3.5 hover:bg-[#f6f5ee] hover:text-[#dd5200] hover:font-bold transition-all flex items-center gap-3 group/item relative overflow-hidden">
                    <span className="absolute left-0 top-0 w-1 h-full bg-[#dd5200] transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#35b6b4] opacity-50"></span>
                    Blog
                  </a>
                </div>
              </div>
            </div>

            <a href="/team" className="relative group py-2 hover:text-[#35b6b4] transition-colors duration-300">
              Team
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#dd5200] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="/location" className="relative group py-2 hover:text-[#35b6b4] transition-colors duration-300">
              Location
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#dd5200] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
          </nav>

          <div className="flex items-center gap-3">
            
            <LanguageTranslator />

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-[#004684] p-2 hover:bg-slate-100 rounded-lg focus:outline-none transition-colors active:scale-95"
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN DRAWER OVERLAY */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMobileMenu}
      />

      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full w-[85vw] max-w-[360px] bg-white z-[70] lg:hidden flex flex-col shadow-[0_0_60px_rgba(0,58,112,0.2)] transition-transform duration-400 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#003a70]/8 flex-shrink-0 bg-white">
          <a href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5">
            <img src="/Logo/Logo.png" alt="K. G. Nanda Hospital Logo" className="w-10 h-10 object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="text-[17px] font-extrabold text-[#003a70]">K. G. Nanda</span>
              <span className="text-[11px] text-[#35b6b4] tracking-[0.15em] uppercase font-semibold">Hospital</span>
            </div>
          </a>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-full hover:bg-slate-100 text-[#003a70] transition-colors active:scale-95"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-1">

          {/* About Us */}
          <a
            href="/about-us"
            onClick={closeMobileMenu}
            className="flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-[#f6f5ee] text-[#003a70] font-semibold text-[16px] transition-colors border-b border-[#003a70]/5"
          >
            About Us
          </a>

          {/* Facilities Accordion */}
          <div className="border-b border-[#003a70]/5">
            <button
              onClick={() => toggleAccordion('facilities')}
              className="w-full flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-[#f6f5ee] text-[#003a70] font-semibold text-[16px] transition-colors"
            >
              Facilities
              <ChevronDown size={18} className={`text-[#35b6b4] transition-transform duration-300 ${openAccordion === 'facilities' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'facilities' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-4 pb-3 flex flex-col gap-1">
                {facilitiesData.map((facility, index) => (
                  <a
                    key={index}
                    href={facility.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#f6f5ee] text-[#003a70]/80 hover:text-[#dd5200] font-medium text-[14px] transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#35b6b4] flex-shrink-0"></span>
                    {facility.title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Department Accordion */}
          <div className="border-b border-[#003a70]/5">
            <button
              onClick={() => toggleAccordion('department')}
              className="w-full flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-[#f6f5ee] text-[#003a70] font-semibold text-[16px] transition-colors"
            >
              Department
              <ChevronDown size={18} className={`text-[#35b6b4] transition-transform duration-300 ${openAccordion === 'department' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'department' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-4 pb-3 flex flex-col gap-1">
                {departmentsData.map((dept, index) => (
                  <a
                    key={index}
                    href={`/${dept.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#f6f5ee] text-[#003a70]/80 hover:text-[#dd5200] font-medium text-[14px] transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#35b6b4] flex-shrink-0"></span>
                    {dept}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Media Accordion */}
          <div className="border-b border-[#003a70]/5">
            <button
              onClick={() => toggleAccordion('media')}
              className="w-full flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-[#f6f5ee] text-[#003a70] font-semibold text-[16px] transition-colors"
            >
              Media
              <ChevronDown size={18} className={`text-[#35b6b4] transition-transform duration-300 ${openAccordion === 'media' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'media' ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-4 pb-3 flex flex-col gap-1">
                <a href="/news" onClick={closeMobileMenu} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#f6f5ee] text-[#003a70]/80 hover:text-[#dd5200] font-medium text-[14px] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#35b6b4] flex-shrink-0"></span>
                  News
                </a>
                <a href="/blog" onClick={closeMobileMenu} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#f6f5ee] text-[#003a70]/80 hover:text-[#dd5200] font-medium text-[14px] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#35b6b4] flex-shrink-0"></span>
                  Blog
                </a>
              </div>
            </div>
          </div>

          {/* Team */}
          <a href="/team" onClick={closeMobileMenu} className="flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-[#f6f5ee] text-[#003a70] font-semibold text-[16px] transition-colors border-b border-[#003a70]/5">
            Team
          </a>

          {/* Location */}
          <a href="/location" onClick={closeMobileMenu} className="flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-[#f6f5ee] text-[#003a70] font-semibold text-[16px] transition-colors border-b border-[#003a70]/5">
            Location
          </a>
        </div>

       
      </div>
    </>
  );
};

export default Header;