import { useState, useEffect } from "react";
import doctorService from "../../services/doctorService";
import bookingService from "../../services/bookingService";
import "./BookAppointment.css";

const getTodayStr = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getMaxDateAnandPrakashStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 2); // Today + 2 days
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function BookAppointment() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    department: "",
    doctor: "",
    doctorId: "",
    preferredDate: "",
    preferredTime: "",
    gender: "",
    message: "",
    patientType: "New Patient",
    uhid: "",
  });

  // Old Patient Lookup state
  const [uhidQuery, setUhidQuery] = useState("");
  const [searchingPatient, setSearchingPatient] = useState(false);
  const [patientMemory, setPatientMemory] = useState(null);
  const [lookupMessage, setLookupMessage] = useState({ text: "", type: "" });

  const [doctorsList, setDoctorsList] = useState([]);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [patientUhid, setPatientUhid] = useState("");
  const [tokenNumber, setTokenNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load active doctors from doctorService on mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const docs = await doctorService.getDoctors();
        if (isMounted) {
          setDoctorsList(docs);
          const depts = Array.from(new Set(docs.map((d) => d.department).filter(Boolean)));
          setAvailableDepartments(depts);
        }
      } catch (err) {
        console.warn("Could not load dynamic doctor dataset:", err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "department") {
        const filteredDocs = doctorsList.filter(
          (d) => !value || d.department === value
        );
        setAvailableDoctors(filteredDocs);

        if (filteredDocs.length === 1) {
          updated.doctor = filteredDocs[0].name;
          updated.doctorId = filteredDocs[0].id;
        } else {
          updated.doctor = "";
          updated.doctorId = "";
        }

        if (updated.doctor === "Dr. Anand Prakash Tiwari") {
          const today = getTodayStr();
          const maxDate = getMaxDateAnandPrakashStr();
          if (
            updated.preferredDate &&
            (updated.preferredDate < today || updated.preferredDate > maxDate)
          ) {
            updated.preferredDate = "";
          }
        }
      }

      if (name === "doctor") {
        const selectedDoc = doctorsList.find(
          (d) => d.name === value || String(d.id) === String(value)
        );
        if (selectedDoc) {
          updated.doctor = selectedDoc.name;
          updated.doctorId = selectedDoc.id;
        }
        if (value === "Dr. Anand Prakash Tiwari" || updated.doctor === "Dr. Anand Prakash Tiwari") {
          const today = getTodayStr();
          const maxDate = getMaxDateAnandPrakashStr();
          if (
            updated.preferredDate &&
            (updated.preferredDate < today || updated.preferredDate > maxDate)
          ) {
            updated.preferredDate = "";
          }
        }
      }

      return updated;
    });
  };

  // Handle Patient Type Tab Switch (New Patient vs Old Patient)
  const handlePatientTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      patientType: type,
    }));
    setLookupMessage({ text: "", type: "" });
  };

  // Execute Patient Memory Lookup from DocBot / Backend
  const handlePatientLookup = async (e) => {
    if (e) e.preventDefault();
    const query = uhidQuery.trim();
    if (!query) {
      setLookupMessage({
        text: "कृपया UHID या 10-अंकों का रजिस्टर्ड मोबाइल नंबर दर्ज करें (Please enter UHID or registered phone)",
        type: "error",
      });
      return;
    }

    setSearchingPatient(true);
    setLookupMessage({ text: "DocBot memory lookup in progress...", type: "info" });
    setPatientMemory(null);

    try {
      const res = await bookingService.lookupPatient(query);
      if (res.success && res.patient) {
        const p = res.patient;
        setPatientMemory(p);
        setForm((prev) => ({
          ...prev,
          fullName: p.name || prev.fullName,
          phone: p.phone || prev.phone,
          email: p.email || prev.email,
          gender: p.gender || prev.gender,
          uhid: p.uhid,
          patientType: "Old Patient",
        }));
        setLookupMessage({
          text: `✅ Existing Patient Memory Found! UHID: ${p.uhid} | Total Visits: ${p.visitCount || 1}`,
          type: "success",
        });
      } else {
        setPatientMemory(null);
        setLookupMessage({
          text: res.message || "No previous patient record found. You can fill details manually below.",
          type: "warning",
        });
      }
    } catch (err) {
      setLookupMessage({
        text: "Error searching patient memory. Please check connection.",
        type: "error",
      });
    } finally {
      setSearchingPatient(false);
    }
  };

  const handleReset = () => {
    setForm({
      fullName: "",
      phone: "",
      email: "",
      department: "",
      doctor: "",
      doctorId: "",
      preferredDate: "",
      preferredTime: "",
      gender: "",
      message: "",
      patientType: "New Patient",
      uhid: "",
    });
    setUhidQuery("");
    setPatientMemory(null);
    setLookupMessage({ text: "", type: "" });
    setAvailableDoctors([]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.doctor === "Dr. Anand Prakash Tiwari") {
      const today = getTodayStr();
      const maxDate = getMaxDateAnandPrakashStr();
      if (form.preferredDate < today || form.preferredDate > maxDate) {
        setError(
          "Dr. Anand Prakash Tiwari का अपॉइंटमेंट आज, कल या परसों (2 दिन के भीतर) के लिए ही बुक किया जा सकता है।"
        );
        setLoading(false);
        return;
      }
    }

    try {
      const result = await bookingService.createBooking(form);
      if (result.success) {
        setBookingId(result.bookingId);
        setPatientUhid(result.uhid);
        setTokenNumber(result.tokenNumber);
        setSubmitted(true);
      } else {
        setError(result.message || "Failed to submit booking request.");
      }
    } catch (err) {
      setError(
        err.message || "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="kg-app-wrapper">
        <div className="kg-success-container">
          <div className="kg-success-card">
            <div className="kg-success-icon-ring">
              <svg viewBox="0 0 24 24" className="kg-check-icon">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <span className="kg-success-badge">Booking Confirmed</span>
            <h1 className="kg-success-title">
              {form.patientType === "Old Patient" ? "Returning Patient Appointment Confirmed!" : "New Patient Registration & Booking Complete!"}
            </h1>

            {/* Badges for Patient Type, Booking Reference, Patient UHID, and OPD Token Number */}
            <div className="flex flex-wrap items-center justify-center gap-3 my-4">
              <div className="kg-booking-id-pill bg-purple-50 border-purple-200 text-purple-900">
                <span>Category:</span> <strong>{form.patientType}</strong>
              </div>
              {bookingId && (
                <div className="kg-booking-id-pill">
                  <span>Booking Ref:</span> <strong>{bookingId}</strong>
                </div>
              )}
              {patientUhid && (
                <div className="kg-booking-id-pill bg-emerald-50 border-emerald-200 text-emerald-800">
                  <span>Patient UHID:</span> <strong>{patientUhid}</strong>
                </div>
              )}
              {tokenNumber && (
                <div className="kg-booking-id-pill bg-amber-50 border-amber-200 text-amber-900">
                  <span>OPD Token #:</span> <strong>{tokenNumber}</strong>
                </div>
              )}
            </div>

            <p className="kg-success-desc">
              Namaste <strong>{form.fullName}</strong>, your OPD appointment request for{" "}
              <strong>{form.department}</strong>{" "}
              {form.doctor ? `with ${form.doctor}` : ""} has been registered successfully.
            </p>

            <div className="kg-success-divider" />

            <div className="kg-success-details-grid">
              <div>
                <span className="kg-detail-label">Preferred Date</span>
                <p className="kg-detail-val">{form.preferredDate || "As per availability"}</p>
              </div>
              <div>
                <span className="kg-detail-label">Slot Time</span>
                <p className="kg-detail-val">{form.preferredTime || "Routine Hours"}</p>
              </div>
              <div>
                <span className="kg-detail-label">Contact Phone</span>
                <p className="kg-detail-val">{form.phone}</p>
              </div>
            </div>

            <p className="kg-success-callout">
              Our patient coordinator will contact you shortly to verify your OPD slot and token timing.
            </p>

            <div className="kg-success-emergency-box">
              <span>For immediate critical care or emergency assistance:</span>
              <a href="tel:09628300438" className="kg-emergency-btn">
                📞 Emergency Desk: 096283 00438
              </a>
            </div>

            <button
              className="kg-btn-secondary kg-new-booking-btn"
              onClick={() => {
                setSubmitted(false);
                handleReset();
              }}
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kg-app-wrapper">
      {/* HERO BANNER SECTION */}
      <div className="kg-hero-banner">
        <div className="kg-hero-container">
          <div className="kg-hero-text-content">
            <h1 className="kg-hero-title">Book your visit with KG Nanda Hospital</h1>
            <p className="kg-hero-subtitle">
              Unified Patient Registration & OPD Appointment Desk. Register as a new patient or lookup your existing patient record instantly.
            </p>
          </div>

          {/* Right Support Card */}
          <div className="kg-support-card">
            <div className="kg-support-header">
              <span className="kg-support-title">Appointment support</span>
              <span className="kg-badge-247">24/7</span>
            </div>
            <div className="kg-support-call-box">
              <div className="kg-call-info">
                <span className="kg-call-label">Call Emergency Helpdesk</span>
                <a href="tel:09628300438" className="kg-call-number">
                  096283 00438
                </a>
              </div>
              <a href="tel:09628300438" className="kg-tap-call-btn">
                Tap to call →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SECTION: Features + Form */}
      <div className="kg-main-container">
        <div className="kg-content-grid">
          {/* LEFT COLUMN: Feature Highlight Cards & Address */}
          <div className="kg-features-column">
            <div className="kg-feature-card">
              <div className="kg-feature-accent-line"></div>
              <h3 className="kg-feature-title">Quick confirmation</h3>
              <p className="kg-feature-desc">
                Our team verifies your selected OPD slot quickly and sends confirmation to your mobile number.
              </p>
            </div>

            <div className="kg-feature-card">
              <div className="kg-feature-accent-line"></div>
              <h3 className="kg-feature-title">Expert doctors</h3>
              <p className="kg-feature-desc">
                Pick targeted top specialists across specialized departments for personalized medical consultation.
              </p>
            </div>

            <div className="kg-feature-card">
              <div className="kg-feature-accent-line"></div>
              <h3 className="kg-feature-title">24/7 Processing</h3>
              <p className="kg-feature-desc">
                Your emergency appointments and critical slot requests get verified on priority round-the-clock.
              </p>
            </div>

            {/* Hospital Address Info Card */}
            <div className="kg-location-card">
              <div className="kg-location-icon">📍</div>
              <div>
                <h4 className="kg-location-heading">Hospital Location</h4>
                <p className="kg-location-address">
                  Sanjay Nagar, Infront of Chaurashia Petrol Pump, Bichhiya Kala, Chandauli, UP
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form Card */}
          <div className="kg-form-column">
            <div className="kg-form-card">
              <div className="kg-form-section-badge">PATIENT REGISTRATION & APPOINTMENT</div>
              <h2 className="kg-form-heading">
                Patient Registration & OPD Appointment Desk
              </h2>

              {/* PATIENT TYPE TOGGLE SELECTOR */}
              <div className="kg-patient-type-wrapper">
                <label className="kg-type-label">Select Patient Category:</label>
                <div className="kg-patient-type-tabs">
                  <button
                    type="button"
                    className={`kg-patient-tab-btn ${form.patientType === "New Patient" ? "active" : ""}`}
                    onClick={() => handlePatientTypeChange("New Patient")}
                  >
                    <span className="kg-tab-icon">🆕</span>
                    <span>New Patient (नया मरीज)</span>
                  </button>
                  <button
                    type="button"
                    className={`kg-patient-tab-btn ${form.patientType === "Old Patient" ? "active" : ""}`}
                    onClick={() => handlePatientTypeChange("Old Patient")}
                  >
                    <span className="kg-tab-icon">🏥</span>
                    <span>Old Patient (पुराना मरीज / UHID)</span>
                  </button>
                </div>
              </div>

              {/* OLD PATIENT LOOKUP SECTION */}
              {form.patientType === "Old Patient" && (
                <div className="kg-old-patient-box">
                  <div className="kg-lookup-header">
                    <span className="kg-lookup-title">🔍 Lookup Registered Patient Profile</span>
                    <span className="kg-lookup-sub">Enter UHID or Mobile Number to retrieve patient memory</span>
                  </div>
                  <div className="kg-lookup-input-group">
                    <input
                      type="text"
                      className="kg-input"
                      placeholder="e.g. UHID-108245 or 9876543210"
                      value={uhidQuery}
                      onChange={(e) => setUhidQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handlePatientLookup(e);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="kg-btn-lookup"
                      onClick={handlePatientLookup}
                      disabled={searchingPatient}
                    >
                      {searchingPatient ? "Searching..." : "Fetch Memory"}
                    </button>
                  </div>

                  {lookupMessage.text && (
                    <div className={`kg-lookup-alert kg-alert-${lookupMessage.type}`}>
                      {lookupMessage.text}
                    </div>
                  )}

                  {patientMemory && (
                    <div className="kg-memory-card">
                      <div className="kg-memory-badge">✅ Verified Patient Memory</div>
                      <div className="kg-memory-grid">
                        <div>
                          <span>UHID:</span> <strong>{patientMemory.uhid}</strong>
                        </div>
                        <div>
                          <span>Name:</span> <strong>{patientMemory.name}</strong>
                        </div>
                        <div>
                          <span>Phone:</span> <strong>{patientMemory.phone}</strong>
                        </div>
                        <div>
                          <span>Visits:</span> <strong>{patientMemory.visitCount || 1}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* NEW PATIENT BANNER */}
              {form.patientType === "New Patient" && (
                <div className="kg-new-patient-banner">
                  <span>✨ New Registration: A new <strong>Patient UHID</strong> and <strong>OPD Token</strong> will be automatically issued upon booking confirmation.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="kg-booking-form">
                {/* Row 1: Department, Doctor, Date */}
                <div className="kg-form-row kg-row-3col">
                  <div className="kg-field-group">
                    <label htmlFor="department">
                      Department <span className="kg-required">*</span>
                    </label>
                    <div className="kg-select-wrapper">
                      <select
                        id="department"
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        required
                        className="kg-input"
                      >
                        <option value="">Select Department</option>
                        {availableDepartments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="kg-field-group">
                    <label htmlFor="doctor">
                      Doctor <span className="kg-required">*</span>
                    </label>
                    <div className="kg-select-wrapper">
                      <select
                        id="doctor"
                        name="doctor"
                        value={form.doctor}
                        onChange={handleChange}
                        disabled={!form.department}
                        required
                        className="kg-input"
                      >
                        <option value="">
                          {form.department ? "Select Doctor" : "← First select a department"}
                        </option>
                        {availableDoctors.map((doc) => (
                          <option key={doc.id} value={doc.name}>
                            {doc.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="kg-field-group">
                    <label htmlFor="preferredDate">
                      Date <span className="kg-required">*</span>
                    </label>
                    <input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      min={getTodayStr()}
                      max={
                        form.doctor === "Dr. Anand Prakash Tiwari"
                          ? getMaxDateAnandPrakashStr()
                          : undefined
                      }
                      value={form.preferredDate}
                      onChange={handleChange}
                      required
                      className="kg-input"
                    />
                  </div>
                </div>

                <hr className="kg-form-divider" />

                <div className="kg-form-section-badge">PATIENT PERSONAL INFORMATION</div>

                {/* Row 2: Name & Phone */}
                <div className="kg-form-row kg-row-2col">
                  <div className="kg-field-group">
                    <label htmlFor="fullName">
                      Patient Full Name <span className="kg-required">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter full name"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="kg-input"
                    />
                  </div>

                  <div className="kg-field-group">
                    <label htmlFor="phone">
                      Mobile Number <span className="kg-required">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="kg-input"
                    />
                  </div>
                </div>

                {/* Row 3: Gender & Email */}
                <div className="kg-form-row kg-row-2col">
                  <div className="kg-field-group">
                    <label htmlFor="gender">
                      Gender <span className="kg-optional">(Optional)</span>
                    </label>
                    <div className="kg-select-wrapper">
                      <select
                        id="gender"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="kg-input"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="kg-field-group">
                    <label htmlFor="email">
                      Email address <span className="kg-optional">(Optional)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      value={form.email}
                      onChange={handleChange}
                      className="kg-input"
                    />
                  </div>
                </div>

                {/* Row 4: Message */}
                <div className="kg-form-row kg-row-1col">
                  <div className="kg-field-group">
                    <label htmlFor="message">
                      Patient Problem / Reason for Visit <span className="kg-optional">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Mention active symptoms, health history, or chronic conditions..."
                      value={form.message}
                      onChange={handleChange}
                      className="kg-input kg-textarea"
                    />
                  </div>
                </div>

                {error && <div className="kg-error-alert">⚠️ {error}</div>}

                {/* Form Action Buttons */}
                <div className="kg-form-actions">
                  <button type="submit" disabled={loading} className="kg-btn-primary">
                    {loading ? (
                      <span className="kg-spinner-text">
                        <span className="kg-spinner"></span> Processing Registration...
                      </span>
                    ) : (
                      form.patientType === "Old Patient" ? "Confirm Returning Patient Booking" : "Register & Confirm Booking"
                    )}
                  </button>
                  <button type="button" onClick={handleReset} className="kg-btn-cancel">
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}