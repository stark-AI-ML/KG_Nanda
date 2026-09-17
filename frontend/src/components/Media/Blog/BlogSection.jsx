import { useState, useEffect } from "react";
import { ChevronRight, FileText, Calendar } from "lucide-react";
import "./BlogSection.css";

const rawEnv = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE_URL = rawEnv.replace(/\/api\/?$/, "").replace(/\/+$/, "");

const mockBlogs = [
  {
    _id: "1",
    title: "10 Essential Tips for Heart Health and Prevention",
    category: "Cardiology",
    author: "Dr. P.S. Dubey",
    imageUrl: "/Department/BlogHeart.jpg",
    description: "Discover critical everyday habits and medical diagnostics to maintain peak cardiovascular performance and reduce chronic cardiac risks. Cardiovascular health is the cornerstone of general longevity. According to clinical consensus, engaging in structured aerobic exercises for 150 minutes weekly, paired with a diet rich in leafy greens, healthy omega-3 fatty acids, and minimal processed sodium, dramatically reduces the incidence of coronary artery disease. Furthermore, routine lipid profiles and ECG screenings are critical for early detection of arterial plaque accumulation. Our specialized cardiac care unit recommends custom therapeutic screenings starting at age 35.",
    createdAt: "2026-06-15T09:00:00Z"
  },
  {
    _id: "2",
    title: "Understanding Neurological Well-being and Mental Wellness",
    category: "Neurology",
    author: "Dr. Sunil Sharma",
    imageUrl: "/Department/BlogNeur.jpg",
    description: "A comprehensive guide to managing cognitive performance, sleep optimization techniques, and understanding neurodegenerative signs early. Cognitive performance relies on a delicate balance of sleep hygiene, mental stimulation, and neurological health. Clinical diagnostics show that chronic sleep deprivation correlates with a high accumulation of amyloid plaques in the cerebral cortex. To protect your brain health, prioritize consistent sleep schedules, practice mindful meditation to regulate cortisol levels, and stay socially engaged. Watch for early warning signs like persistent brain fog or motor imbalance, and consult our neurology clinic immediately.",
    createdAt: "2026-06-18T10:30:00Z"
  },
  {
    _id: "3",
    title: "Advanced Infrastructure: The Importance of Modern Diagnostics",
    category: "Healthcare Tech",
    author: "Dr. Saurabh Singh",
    imageUrl: "/Department/BlogInfra.jpg",
    description: "How advanced diagnostic facilities, high-resolution imaging, and state-of-the-art pathology labs are redefining clinical precision. Modern clinical precision is heavily reliant on advanced hardware technologies. With high-field MRI scans, ultra-fast CT systems, and AI-assisted pathology diagnostic panels, doctors can identify microscopic anomalies months before physical symptoms manifest. At KG Nanda Hospital, our emergency ward and main labs are equipped with high-precision infrastructure to ensure rapid turnaround times and pinpoint diagnostic accuracy. Early intervention based on precise imaging is key to successful oncology and orthopedic recovery pathways.",
    createdAt: "2026-06-19T08:15:00Z"
  }
];

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [activeBlog, setActiveBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/blogs`);
        const data = await res.json();
        const blogList = data.data || (Array.isArray(data) ? data : null);
        if (blogList && blogList.length > 0) {
          setBlogs(blogList);
          setActiveBlog(blogList[0]);
        } else {
          setBlogs(mockBlogs);
          setActiveBlog(mockBlogs[0]);
        }
      } catch (error) {
        console.log("Blog fetch error, loading fallback:", error);
        setBlogs(mockBlogs);
        setActiveBlog(mockBlogs[0]);
      }
    };
    fetchBlogs();
  }, []);

  if (!activeBlog) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-[#f6fcfa]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#02acf0] mb-4"></div>
        <p className="text-[#60a9bd] font-medium text-sm">Loading specialized medical insights...</p>
      </div>
    );
  }

  return (
    <section className="premium-blog-section">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center mb-12 sm:mb-16 px-4">
         
          <h2 className="premium-section-heading">Read Our Latest Articles</h2>
          <p className="text-sm sm:text-base text-[#60a9bd] max-w-xl mx-auto mt-2">
            Select a medical category below to review active publications and specialized health logs.
          </p>
        </div>

        <div className="blog-layout">
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="blog-sidebar">
            <div className="sidebar-sticky-wrap">
              <span className="sidebar-header-label">Available Publications</span>
              <div className="sidebar-items-stack">
                {blogs.map((blog) => (
                  <button
                    key={blog._id}
                    className={`sidebar-item ${activeBlog._id === blog._id ? "active" : ""}`}
                    onClick={() => setActiveBlog(blog)}
                  >
                    <div className="sidebar-item-inner">
                      <span className="title-text-wrap">{blog.title}</span>
                      <ChevronRight className="arrow-icon" size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT DOCUMENT VIEWPORT */}
          <article className="blog-content">
            <div className="premium-img-container">
              <img src={activeBlog.imageUrl} alt={activeBlog.title} />
              <div className="img-gloss-overlay" />
            </div>

            <div className="article-body-wrapper">
              <div className="article-meta-row">
                <div className="meta-tag inline-flex items-center gap-1 text-[#02acf0]">
                  <Calendar size={12} />
                  <span>
                    {activeBlog.createdAt ? new Date(activeBlog.createdAt).toDateString() : "Verified Insight"}
                  </span>
                </div>
                <span className="meta-divider"></span>
                <span className="author-badge text-[#2f3395]">KG Nanda Board Certified</span>
              </div>

              <h3 className="article-main-title">{activeBlog.title}</h3>
              <div className="article-separator-line"></div>
              <p className="article-main-desc">{activeBlog.description}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}