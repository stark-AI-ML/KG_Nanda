import React, { useState, useEffect, useRef } from "react";
import "./HelplineDesk.css";

export default function HelplineDesk() {
  const [isOpen, setIsOpen] = useState(false);
  const deskRef = useRef(null);

  // Close desk on click outside or Escape key press
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (deskRef.current && !deskRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div 
      ref={deskRef}
      className={`kg-helpline-side-desk ${isOpen ? "is-active" : ""}`}
    >
      {/* 1. VERTICAL DOCK TRIGGER TAB */}
      <div 
        className="kg-helpline-vertical-bar"
        onClick={() => setIsOpen((prev) => !prev)}
        title="24x7 मरीज़ सहायता केंद्र - KG Nanda Hospital"
        aria-label="24x7 सहायता केंद्र खोलें"
      >
        <div className="kg-helpline-shimmer"></div>
        
        {/* Live Active Beacon Indicator */}
        <div className="kg-helpline-beacon-wrap">
          <span className="kg-helpline-indicator"></span>
        </div>

        {/* Headset Icon */}
        <div className="kg-helpline-icon-wrap">
          <svg className="kg-helpline-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
          </svg>
        </div>

        {/* Hindi Bold Text (Unbroken Ligature Rendering) */}
        <div className="kg-helpline-text-container">
          <span className="kg-helpline-text">सहायता केंद्र</span>
        </div>
      </div>

      {/* 2. EXPANDABLE DRAWER CARD */}
      <div className="kg-helpline-expanded-content">
        <div className="kg-helpline-inner-wrapper">
          {/* Header Row */}
          <div className="kg-helpline-top-row">
            <div className="kg-helpline-badge-group">
              <span className="kg-helpline-live-dot"></span>
              <span className="kg-helpline-badge">24X7 HELP DESK</span>
            </div>
            <button 
              className="kg-helpline-close"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Close Helpline Desk"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Titles */}
          <h4 className="kg-helpline-heading">मरीज़ सहायता केंद्र</h4>
          <p className="kg-helpline-sub">KG Nanda Hospital • 24x7 Helpline</p>

          {/* Action Links List */}
          <div className="kg-helpline-links">
            {/* Helpline 1 */}
            <a href="tel:8840376333" className="kg-hdesk-item kg-hdesk-phone">
              <div className="kg-hdesk-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="kg-hdesk-details">
                <span className="kg-hdesk-tag">HELPLINE 1 (डॉक्टर व भर्ती)</span>
                <strong className="kg-hdesk-val">8840376333</strong>
              </div>
              <span className="kg-hdesk-arrow">→</span>
            </a>

            {/* Helpline 2 */}
            <a href="tel:9838850287" className="kg-hdesk-item kg-hdesk-phone">
              <div className="kg-hdesk-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="kg-hdesk-details">
                <span className="kg-hdesk-tag">HELPLINE 2 (आपातकालीन)</span>
                <strong className="kg-hdesk-val">9838850287</strong>
              </div>
              <span className="kg-hdesk-arrow">→</span>
            </a>

            {/* Medicine Order - WhatsApp & Call */}
            <a 
              href="https://wa.me/918707233274?text=नमस्ते,%20मुझे%20KG%20Nanda%20Hospital%20से%20दवाईयां%20मंगवानी%20हैं।" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="kg-hdesk-item kg-hdesk-whatsapp"
            >
              <div className="kg-hdesk-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <div className="kg-hdesk-details">
                <span className="kg-hdesk-tag">ऑनलाइन दवाई मंगवाएं (WhatsApp)</span>
                <strong className="kg-hdesk-val">8707233274</strong>
              </div>
              <span className="kg-hdesk-arrow">→</span>
            </a>

            {/* Official Email */}
            <a href="mailto:admin@kgnandahospital.com" className="kg-hdesk-item kg-hdesk-email">
              <div className="kg-hdesk-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="kg-hdesk-details">
                <span className="kg-hdesk-tag">OFFICIAL EMAIL</span>
                <strong className="kg-hdesk-val">admin@kgnandahospital.com</strong>
              </div>
            </a>
          </div>

          {/* Safety Caution Notice */}
          <div className="kg-helpline-caution">
            <span>‼️ केवल इन्हीं नंबरों पर संपर्क करें एवं किसी भी अनजान भुगतान से सावधान रहें।</span>
          </div>

          {/* Footer Ticker */}
          <div className="kg-helpline-footer">
            ⚡ 24x7 आपातकालीन सेवा व परामर्श हेतु उपलब्ध
          </div>
        </div>
      </div>
    </div>
  );
}