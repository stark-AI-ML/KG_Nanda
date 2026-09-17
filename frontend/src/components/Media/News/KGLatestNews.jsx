import React, { useState, useEffect } from "react";
import "./KGLatestNews.css";

// Helper for dynamic or mockup description content
const getDescription = (item) =>
  item?.description || item?.content || item?.summary || item?.desc || "";

const getFullContent = (item) =>
  item?.full || item?.description || item?.content || "";

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

// UPDATED: Local folder aur API dono handle karne ke liye image URL function
function getImageUrl(baseUrl, imagePath) {
  if (!imagePath || typeof imagePath !== "string") return PLACEHOLDER_IMAGE;
  
  // Agar image path direct HTTP se suru ho rha hai (jaise live API me)
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
  
  // Agar image path relative hai (jaise local public folder ke liye)
  const normalized = imagePath.replace(/\\/g, "/").trim();
  
  // Agar normalization ke baad path direct root ya assets path handle kare
  if (normalized.startsWith("/")) {
    return normalized;
  }
  
  // Local development ke liye public folder se image display karne ke liye path fix kiya
  return `/${normalized}`;
}

const KGLatestNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [activeNews, setActiveNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const rawEnv = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "http://localhost:5000";
  const BASE_URL = rawEnv.replace(/\/api\/?$/, "").replace(/\/+$/, "");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/news/latest`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setNewsData(data.data);
        } else {
          setNewsData(mockNewsData);
        }
      } catch (error) {
        console.error("Error fetching news, loading mockup data:", error);
        setNewsData(mockNewsData);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section id="kg-latest-news" className="kg-news-section">
      <div className="kg-news-container">
        {/* Header Block */}
        <div className="kg-news-header">
          <span className="kg-badge">MEDIA & UPDATES</span>
          <h2 className="kg-main-heading">KG Nanda Hospital Latest News</h2>
          <p className="kg-sub-heading">Chandauli's premier healthcare institution bringing you health insights, innovations, and community updates.</p>
          <div className="kg-heading-separator"></div>
        </div>

        {loading && (
          <div className="kg-news-loading">
            <div className="kg-spinner"></div>
            <p>Fetching latest healthcare updates...</p>
          </div>
        )}

        {/* News Grid Mode */}
        {!loading && !activeNews && newsData.length === 0 && (
          <p className="kg-news-empty">No news available at the moment.</p>
        )}

        {!loading && !activeNews && newsData.length > 0 && (
          <div className="kg-news-grid">
            {newsData.map((item, index) => (
              <div
                key={item._id || item.id || index}
                className="kg-news-card"
                onClick={() => {
                  setActiveNews(item);
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
              >
                <div className="kg-card-img-wrapper">
                  <img
                    src={getImageUrl(BASE_URL, item.image)}
                    alt={item.title || "Hospital News"}
                    onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                    loading="lazy"
                  />
                  <div className="kg-card-date">
                    <span>⚡</span> Latest Updates
                  </div>
                </div>
                <div className="kg-card-info">
                  <h4 className="kg-card-title">{item.title}</h4>
                  <p className="kg-card-desc">{getDescription(item)}</p>
                  <div className="kg-card-footer">
                    <span className="kg-readmore">Read Detailed Report</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expanded Premium Detail View */}
        {!loading && activeNews && (
          <div className="kg-news-expanded-wrapper">
            <button className="kg-back-btn" onClick={() => setActiveNews(null)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to All News
            </button>

            <div className="kg-news-expanded-layout">
              {/* Left Column: Image/Visuals */}
              <div className="kg-expanded-media">
                <div className="kg-expanded-img-container">
                  <img
                    src={getImageUrl(BASE_URL, activeNews.image)}
                    alt={activeNews.title}
                    onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                  />
                </div>
                <div className="kg-snippet-box">
                  <h5>Brief Overview</h5>
                  <p>{getDescription(activeNews)}</p>
                </div>
              </div>

              {/* Right Column: Content Body */}
              <div className="kg-expanded-body">
                <span className="kg-expanded-tag">Official Announcement</span>
                <h3 className="kg-expanded-title">{activeNews.title}</h3>
                
                <div className="kg-expanded-content-text">
                  <p>{getFullContent(activeNews)}</p>
                </div>

                <div className="kg-expanded-meta-actions">
                  <div className="kg-share-box">
                    <span className="kg-share-label">Share Report:</span>
                    <div className="kg-share-buttons">
                      <button className="kg-share-icon fb">Facebook</button>
                      <button className="kg-share-icon tw">Twitter</button>
                      <button className="kg-share-icon wa">WhatsApp</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// UPDATED: Local project ke relative paths ke sath mock data
const mockNewsData = [
  { 
    id: 1, 
    title: "Advanced Cardiac Surgery Successfully Performed", 
    image: "Media/N.png", // Aapki image ka naam yahan likhein
    desc: "KG Nanda Hospital achieved another milestone with a successful advanced cardiac surgery performed by expert doctors.", 
    full: "This surgery marks a significant step forward in advanced cardiac care at KG Nanda Hospital. Our specialists used modern technology ensuring faster recovery and better patient outcomes." 
  },
  { 
    id: 2, 
    title: "Free Health Checkup Camp Announced", 
    image: "Media/M1.png", 
    desc: "KG Nanda Hospital announces a free health checkup camp for citizens.", 
    full: "The free health camp aims to provide early diagnosis and preventive care to the community. Multiple departments will participate." 
  },
  { 
    id: 3, 
    title: "New ICU Wing Inaugurated", 
    image: "Media/M2.png", 
    desc: "State-of-the-art ICU wing inaugurated with latest equipment.", 
    full: "The newly inaugurated ICU wing enhances critical care capacity with advanced monitoring and life-support systems." 
  },
  { 
    id: 4, 
    title: "Expert Doctors Join Medical Team", 
    image: "Media/M3.png", 
    desc: "Renowned specialists join KG Nanda Hospital medical team.", 
    full: "The addition of experienced doctors strengthens KG Nanda Hospital’s commitment to excellence and quality healthcare." 
  },
  { 
    id: 5, 
    title: "24x7 Emergency Services Upgraded", 
    image: "Media/M4.png", 
    desc: "Emergency services upgraded with new equipment.", 
    full: "Emergency services are now upgraded with faster response systems and modern ambulances for critical cases." 
  },
  { 
    id: 6, 
    title: "Advanced MRI Facility Launched", 
    image: "Media/m6.png", 
    desc: "High-resolution MRI facility available.", 
    full: "The newly launched MRI facility ensures faster scans with accurate diagnostic results for patients." 
  }
];

export default KGLatestNews;