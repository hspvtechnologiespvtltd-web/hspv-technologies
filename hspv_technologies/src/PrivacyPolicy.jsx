
import React from "react";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-page">

      {/* Header */}
      <header className="privacy-header">
        <a href="/" className="privacy-logo">
          <img src="/hspv-logo.png" alt="HSPV Technologies" />
        </a>

        <a href="/" className="privacy-home-btn">
          ← Back to Home
        </a>
      </header>

      {/* Hero */}
      <section className="privacy-hero">
        <span>HSPV TECHNOLOGIES</span>
        <h1>Privacy Policy</h1>
        <p>
          Your privacy matters to us. Learn how we handle
          information when you interact with our website
          and services.
        </p>
        <div className="privacy-date">
          Effective Date: August 08, 2024
        </div>
      </section>

      {/* Content */}
      <main className="privacy-container">

        <aside className="privacy-sidebar">
          <h3>On This Page</h3>
          <a href="#introduction">Introduction</a>
          <a href="#information">Information We Collect</a>
          <a href="#usage">How We Use Information</a>
          <a href="#protection">Data Protection</a>
          <a href="#cookies">Cookies Policy</a>
          <a href="#third-party">Third-Party Services</a>
          <a href="#rights">Your Privacy Rights</a>
          <a href="#changes">Policy Updates</a>
          <a href="#contact-privacy">Contact Us</a>
        </aside>

        <article className="privacy-content">

          <section id="introduction">
            <h2>01. Introduction</h2>
            <p>
              Welcome to HSPV Technologies Pvt. Ltd.
              We respect your privacy and are committed
              to protecting your personal information.
            </p>
            <p>
              This Privacy Policy explains what information
              may be collected when you visit our website,
              contact us or use our services, and how that
              information may be handled.
            </p>
          </section>

          <section id="information">
            <h2>02. Information We Collect</h2>
            <p>
              Depending on how you interact with us,
              the following types of information may be collected:
            </p>

            <ul>
              <li>
                <strong>Personal Information:</strong>
                Name, email address, phone number and other
                details you voluntarily provide.
              </li>
              <li>
                <strong>Enquiry Information:</strong>
                Project details, business requirements and
                messages submitted through our contact forms.
              </li>
              <li>
                <strong>Technical Information:</strong>
                Browser type, device information, IP address
                and website usage data, where applicable.
              </li>
            </ul>
          </section>

          <section id="usage">
            <h2>03. How We Use Your Information</h2>
            <p>
              Information provided to HSPV Technologies
              may be used for the following purposes:
            </p>
            <ul>
              <li>To respond to enquiries and requests.</li>
              <li>To provide information about our services.</li>
              <li>To understand project requirements.</li>
              <li>To improve website functionality and user experience.</li>
              <li>To communicate important service-related updates.</li>
              <li>To maintain website security and prevent misuse.</li>
            </ul>
          </section>

          <section id="protection">
            <h2>04. Data Protection</h2>
            <p>
              We take reasonable technical and organizational
              measures intended to protect personal information
              against unauthorized access, alteration,
              disclosure or destruction.
            </p>
            <p>
              However, no method of transmission over the
              internet or electronic storage is completely
              secure. Absolute security cannot be guaranteed.
            </p>
          </section>

          <section id="cookies">
            <h2>05. Cookies Policy</h2>
            <p>
              Our website may use cookies or similar
              technologies to improve functionality,
              understand website usage and enhance
              the browsing experience.
            </p>
            <p>
              You can manage or disable cookies through
              your browser settings. Some website features
              may not function properly if cookies are disabled.
            </p>
          </section>

          <section id="third-party">
            <h2>06. Third-Party Services</h2>
            <p>
              Our website or services may contain links to
              third-party websites or use third-party tools.
              These services may have their own privacy
              policies and data handling practices.
            </p>
            <p>
              We encourage you to review the privacy policies
              of third-party services before sharing your
              personal information with them.
            </p>
          </section>

          <section id="rights">
            <h2>07. Your Privacy Rights</h2>
            <p>
              Subject to applicable laws, you may have the
              right to:
            </p>
            <ul>
              <li>Request access to your personal information.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Raise concerns about how your information is handled.</li>
            </ul>
            <p>
              To exercise these rights, please contact us
              using the details provided below.
            </p>
          </section>

          <section id="changes">
            <h2>08. Changes to This Privacy Policy</h2>
            <p>
              HSPV Technologies may update this Privacy Policy
              from time to time to reflect changes in our
              services, practices or applicable legal requirements.
            </p>
            <p>
              Any updated version will be published on this page
              with a revised effective date.
            </p>
          </section>

          <section id="contact-privacy">
            <h2>09. Contact Us</h2>
            <p>
              If you have questions, concerns or requests
              regarding this Privacy Policy, please contact us:
            </p>

            <div className="privacy-contact-card">
              <h3>HSPV TECHNOLOGIES PVT. LTD.</h3>
              <p>Empowering Businesses Through Technology.</p>

              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:info@hspvtechnologies.com">
                  info@hspvtechnologies.com
                </a>
              </p>

              <p>
                <strong>Website:</strong>{" "}
                <a href="https://www.hspvtechnologies.com">
                  www.hspvtechnologies.com
                </a>
              </p>
            </div>
          </section>

        </article>
      </main>

      {/* Footer */}
      <footer className="privacy-footer">
        <p>
          © {new Date().getFullYear()-2} HSPV Technologies Pvt. Ltd.
          All Rights Reserved.
        </p>
        <a href="/">Back to Home</a>
      </footer>

    </div>
  );
}

export default PrivacyPolicy;
