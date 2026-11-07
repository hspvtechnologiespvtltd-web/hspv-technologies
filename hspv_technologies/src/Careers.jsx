
import React, { useRef, useState } from "react";
import "./Careers.css";

function Careers() {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  // Resume validation
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setSelectedFile("");
      return;
    }

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setStatus({
        type: "error",
        message: "Only PDF, DOC and DOCX resumes are allowed."
      });
      e.target.value = "";
      setSelectedFile("");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setStatus({
        type: "error",
        message: "Resume size must not exceed 4 MB."
      });
      e.target.value = "";
      setSelectedFile("");
      return;
    }

    setStatus({ type: "", message: "" });
    setSelectedFile(file.name);
  };

  // Submit application using Nodemailer backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const formData = new FormData(formRef.current);

      // Consent validation
      formData.set(
        "consent",
        formData.get("consent") ? "true" : "false"
      );

      // Send application to Vercel API
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Application submission failed."
        );
      }

      setStatus({
        type: "success",
        message:
          "Your application has been submitted successfully! Our HR team will contact you soon."
      });

      // Reset form
      formRef.current.reset();
      setSelectedFile("");

    } catch (error) {
      console.error("Application submission failed:", error);

      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again or contact HR at hr@hspvtechnologies.com."
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="careers-page">

      {/* BACK TO HOME BUTTON */}
      <div className="careers-back-wrapper">
        <a href="/" className="careers-back-btn">
          <span>←</span> Back to Home
        </a>
      </div>

      {/* HERO SECTION */}
      <section className="careers-hero">
        <div className="careers-hero-overlay"></div>

        <div className="careers-hero-content">
          <span className="careers-tag">
            BUILD YOUR FUTURE WITH US
          </span>

          <h1>
            Careers at <span>HSPV Technologies</span>
          </h1>

          <p>
            Be part of an innovative team where ideas turn into
            technology and opportunities turn into success.
          </p>

          <a href="#apply-now" className="careers-hero-btn">
            Apply Now <span>→</span>
          </a>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="careers-intro">
        <div className="careers-container">
          <div className="careers-intro-heading">
            <span>JOIN OUR TEAM</span>

            <h2>
              Grow Your Career With <span>Us</span>
            </h2>
          </div>

          <p>
            At HSPV Technologies Pvt. Ltd., we believe that talented
            people are the foundation of innovation. We provide an
            environment where individuals can learn, collaborate,
            develop their skills and build a successful career.
            Whether you are a fresher or an experienced professional,
            we welcome passionate people to join our journey.
          </p>
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="careers-benefits">
        <div className="careers-container">
          <div className="careers-section-heading">
            <span>WHY HSPV TECHNOLOGIES</span>
            <h2>Why Join Our Team?</h2>
            <p>
              Discover opportunities to learn, innovate and grow.
            </p>
          </div>

          <div className="careers-benefits-grid">

            <div className="career-benefit-card">
              <div className="career-benefit-icon">🚀</div>
              <h3>Career Growth</h3>
              <p>
                Build your professional skills and explore
                opportunities for career advancement.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">💡</div>
              <h3>Innovation</h3>
              <p>
                Work on creative ideas and technology-driven
                solutions.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">🤝</div>
              <h3>Team Collaboration</h3>
              <p>
                Collaborate with talented people and achieve
                meaningful goals together.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">📚</div>
              <h3>Continuous Learning</h3>
              <p>
                Develop new skills and stay updated with
                emerging technologies.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="careers-application" id="apply-now">
        <div className="careers-container">

          <div className="careers-section-heading">
            <span>START YOUR JOURNEY</span>
            <h2>Apply for a Position</h2>
            <p>
              Fill out the application form below and share
              your details with our HR team.
            </p>
          </div>

          <div className="careers-form-wrapper">

            <div className="careers-form-sidebar">
              <h2>
                Let's Build Something <span>Great Together!</span>
              </h2>

              <p>
                We are always looking for motivated individuals
                who are passionate about technology and innovation.
              </p>

              <div className="careers-contact-info">

                <div>
                  <span>✉</span>
                  <div>
                    <strong>HR Email</strong>
                    <a href="mailto:hr@hspvtechnologies.com">
                      hr@hspvtechnologies.com
                    </a>
                  </div>
                </div>

                <div>
                  <span>☎</span>
                  <div>
                    <strong>Contact Number</strong>
                    <a href="tel:+919304094715">
                      +91 9304094715
                    </a>
                  </div>
                </div>

                <div>
                  <span>⌖</span>
                  <div>
                    <strong>Location</strong>
                    <p>Mumbai, Maharashtra, India</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="careers-form-content">
              <h2>Job Application Form</h2>

              <p className="careers-form-subtitle">
                Please provide accurate information.
              </p>

              {/* SUCCESS / ERROR MESSAGE */}
              {status.message && (
                <div
                  className={`careers-status ${status.type}`}
                  role="status"
                  aria-live="polite"
                >
                  {status.message}
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >

                <div className="careers-form-grid">

                  {/* FULL NAME */}
                  <div className="careers-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      required
                      minLength="2"
                      maxLength="100"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="careers-field">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      required
                      maxLength="254"
                    />
                  </div>

                  {/* MOBILE */}
                  <div className="careers-field">
                    <label>Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Enter mobile number"
                      pattern="[+]?[0-9\s-]{10,20}"
                      required
                    />
                  </div>

                  {/* POSITION */}
                  <div className="careers-field">
                    <label>Applying For *</label>
                    <select
                      name="applyingFor"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Position
                      </option>
                      <option value="Web Developer">
                        Web Developer
                      </option>
                      <option value="React Developer">
                        React Developer
                      </option>
                      <option value="Software Developer">
                        Software Developer
                      </option>
                      <option value="App Developer">
                        App Developer
                      </option>
                      <option value="UI/UX Designer">
                        UI/UX Designer
                      </option>
                      <option value="Digital Marketing">
                        Digital Marketing
                      </option>
                      <option value="Business Development">
                        Business Development
                      </option>
                      <option value="HR Executive">
                        HR Executive
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* QUALIFICATION */}
                  <div className="careers-field">
                    <label>Qualification *</label>
                    <select
                      name="qualification"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Qualification
                      </option>
                      <option value="10th">10th</option>
                      <option value="12th">12th</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Post Graduate">
                        Post Graduate
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* EXPERIENCE */}
                  <div className="careers-field">
                    <label>Work Experience *</label>
                    <select
                      name="workExperience"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Experience
                      </option>
                      <option value="Fresher">Fresher</option>
                      <option value="0-1 Years">0-1 Years</option>
                      <option value="1-3 Years">1-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>

                  {/* LOCATION */}
                  <div className="careers-field full-width">
                    <label>Current Location *</label>
                    <input
                      type="text"
                      name="currentLocation"
                      placeholder="Enter your city and state"
                      required
                      maxLength="150"
                    />
                  </div>

                  {/* RESUME */}
                  <div className="careers-field full-width">
                    <label>Upload Resume *</label>

                    <div className="careers-file-upload">
                      <input
                        type="file"
                        name="resume"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                      />

                      <label htmlFor="resume">
                        <span className="upload-icon">📎</span>

                        <span>
                          {selectedFile
                            ? selectedFile
                            : "Choose your Resume"}
                        </span>

                        <small>
                          PDF, DOC, DOCX (Maximum 4 MB)
                        </small>
                      </label>
                    </div>
                  </div>

                  {/* COVER LETTER */}
                  <div className="careers-field full-width">
                    <label>Cover Letter / Message</label>

                    <textarea
                      name="coverLetter"
                      rows="5"
                      placeholder="Tell us about yourself, your skills and why you want to join HSPV Technologies..."
                      maxLength="5000"
                    ></textarea>
                  </div>

                  {/* CONSENT */}
                  <div className="careers-field full-width">
                    <label className="careers-consent">
                      <input
                        type="checkbox"
                        name="consent"
                        value="true"
                        required
                      />

                      <span>
                        I confirm that the information provided by me
                        is accurate and I agree to share my details
                        with HSPV Technologies for recruitment purposes.
                      </span>
                    </label>
                  </div>

                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="careers-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Submitting Application..."
                    : "Submit Application →"}
                </button>

                <p className="careers-privacy-note">
                  Your information will be used for recruitment
                  purposes only.
                </p>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="careers-bottom">
        <div className="careers-container">
          <h2>Ready to Take the Next Step?</h2>

          <p>
            Your next career opportunity could start here.
          </p>

          <a href="#apply-now">
            Apply Today →
          </a>
        </div>
      </section>

    </div>
  );
}

export default Careers;
