
import React, { useState } from "react";
import Careers from "./Careers";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

import "./App.css";

const services = [
  {
    icon: "👥",
    title: "CRM Solutions",
    text: "Customer relationship management solutions to organize customer information, strengthen relationships and support your sales process."
  },
  {
    icon: "📄",
    title: "CLM Solutions",
    text: "Contract lifecycle management solutions to help create, organize, track and manage contracts more efficiently."
  },
  {
    icon: "⚙️",
    title: "CPQ Solutions",
    text: "Configure, price and quote solutions that help streamline product configuration, pricing and sales quotations."
  },
  {
    icon: "🗄️",
    title: "ERP Solutions",
    text: "Enterprise resource planning solutions to connect business processes and manage operations through a unified system."
  },
  {
    icon: "💻",
    title: "Web Design & Development",
    text: "Responsive, user-friendly websites designed and developed to strengthen your brand and online presence."
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    text: "Mobile application development focused on useful features, smooth experiences and business requirements."
  },
  {
    icon: "☁️",
    title: "Cloud Solutions & Hosting",
    text: "Cloud infrastructure and hosting solutions to support secure deployment, availability and business growth."
  },
  {
    icon: "🔄",
    title: "Business Automation & Data Management",
    text: "Business process automation and data management solutions to reduce repetitive work and organize information."
  },
  {
    icon: "💡",
    title: "IT Consulting & IT Support",
    text: "Technology consulting to assess business needs and guide smarter IT planning and decisions."
  },
  {
    icon: "📈",
    title: "Digital Marketing",
    text: "Digital marketing services to improve online visibility, connect with audiences and support business growth."
  },
  {
    icon: "⌨️",
    title: "Software Development",
    text: "Custom software development to address business requirements, streamline workflows and support productivity."
  },
  {
    icon: "🔗",
    title: "Technology Integration & Support",
    text: "Technology integration and support to help systems work together and keep business technology running smoothly."
  }
];

const advantages = [
  {
    number: "01",
    title: "Innovative Thinking",
    text: "We combine modern technologies with creative thinking to deliver meaningful solutions."
  },
  {
    number: "02",
    title: "Quality Solutions",
    text: "We focus on performance, reliability and quality in every project we undertake."
  },
  {
    number: "03",
    title: "Client Focus",
    text: "We understand your business requirements and work towards your goals."
  },
  {
    number: "04",
    title: "Scalable Technology",
    text: "We develop flexible solutions that can grow along with your business."
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  
const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message")
  };

  const button = form.querySelector('button[type="submit"]');

  try {
    button.disabled = true;
    button.textContent = "Sending...";

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Unable to send your enquiry."
      );
    }

    alert(
      "Thank you for contacting HSPV Technologies Pvt. Ltd.! Your enquiry has been successfully sent. A confirmation email has been sent to your email address."
    );

    form.reset();

  } catch (error) {
    console.error("Contact Form Error:", error);

    alert(
      error.message || "Something went wrong. Please try again later."
    );

  } finally {
    button.disabled = false;
    button.innerHTML = 'Send Message <span>→</span>';
  }
};


  if (window.location.pathname === "/careers") {
  return <Careers />;
}

  if (window.location.pathname === "/privacy-policy") {
    return <PrivacyPolicy />;
  }

  if (window.location.pathname === "/terms-of-service") {
    return <TermsOfService />;
  }

  return (
    <div className="website">

      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          <img
            src="/hspv-logo.png"
            alt="HSPV Technologies Logo"
            className="brand-logo"
          />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#why-us" onClick={closeMenu}>Why Choose Us</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="/careers">Careers</a>
        </nav>

        <a href="#contact" className="nav-btn">
          Get In Touch <span>↗</span>
        </a>
      </header>

      <main>

        {/* HERO SECTION */}
        <section className="hero" id="home">
          <div className="hero-content">

            <div className="tagline">
              <span className="tagline-dot"></span>
              WELCOME TO HSPV TECHNOLOGIES
            </div>

            <h1>
              Transforming Ideas Into
              <span> Digital Solutions.</span>
            </h1>

            <p className="hero-text">
              We are a technology-driven software solutions company
              helping businesses grow through innovative software,
              web development and digital transformation.
            </p>

            <div className="hero-buttons">
              <a href="#services" className="primary-btn">
                Explore Services <span>→</span>
              </a>

              <a href="#contact" className="secondary-btn">
                Contact Us
              </a>
            </div>

            <div className="hero-trust">
              <span>✓ Innovation</span>
              <span>✓ Quality</span>
              <span>✓ Growth</span>
            </div>
          </div>

         
<div className="hero-graphic">
  <div className="circle">
    <div className="code-icon">&lt; / &gt;</div>

    <h2 className="animated-hspv">
      {"HSPV".split("").map((letter, index) => (
        <span
          key={index}
          style={{ "--i": index }}
        >
          {letter}
        </span>
      ))}
    </h2>

    <p className="animated-technologies">
      {"TECHNOLOGIES".split("").map((letter, index) => (
        <span
          key={index}
          style={{ "--i": index }}
        >
          {letter}
        </span>
      ))}
    </p>

    <div className="circle-line"></div>

    <div className="circle-tagline">
      INNOVATE / DEVELOP / GROW
    </div>
  </div>
</div>


          <div className="hero-decoration"></div>
        </section>

        {/* BRAND STRIP */}
        <div className="brand-strip">
          <span>INNOVATION</span>
          <i>✦</i>
          <span>TECHNOLOGY</span>
          <i>✦</i>
          <span>CREATIVITY</span>
          <i>✦</i>
          <span>GROWTH</span>
        </div>

        {/* ABOUT SECTION */}
        <section className="about section-padding" id="about">

          <div className="section-heading">
            <p>WHO WE ARE</p>
            <h2>About HSPV Technologies</h2>
            <span>
              Building innovative technology for a better digital future.
            </span>
          </div>

          <div className="about-content">

            <div className="about-text">
              <span className="small-label">YOUR TECHNOLOGY PARTNER</span>

              <h3>
                Building Technology.
                <span> Empowering Businesses.</span>
              </h3>

              <p>
                HSPV Technologies Pvt. Ltd. is a software and IT
                services company focused on delivering innovative,
                scalable and reliable technology solutions.
              </p>

              <p>
                We help startups, small businesses and enterprises
                turn their ideas into powerful digital products.
                Our focus is on quality, innovation and long-term
                client success.
              </p>

              <a href="#services" className="text-link">
                Discover Our Services →
              </a>
            </div>

            <div className="about-card">
              <div className="about-card-item">
                <div className="about-card-icon">◎</div>
                <div>
                  <h3>Our Mission</h3>
                  <p>
                    To empower businesses with smart, modern and
                    technology-driven solutions.
                  </p>
                </div>
              </div>

              <div className="about-divider"></div>

              <div className="about-card-item">
                <div className="about-card-icon">◇</div>
                <div>
                  <h3>Our Vision</h3>
                  <p>
                    To become a trusted technology partner for
                    businesses worldwide.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="services section-padding" id="services">

          <div className="section-heading">
            <p>WHAT WE DO</p>
            <h2>Our IT Services</h2>
            <span>
              End-to-end technology solutions designed for your business.
            </span>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <div className="service-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="service-icon">
                  {service.icon}
                </div>

                <h3>{service.title}</h3>

                <p>{service.text}</p>

                <a href="#contact" className="service-link">
                  Learn More <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="why-us section-padding" id="why-us">

          <div className="section-heading">
            <p>WHY HSPV TECHNOLOGIES</p>
            <h2>Your Trusted Technology Partner</h2>
            <span>
              We turn business challenges into technology opportunities.
            </span>
          </div>

          <div className="why-grid">
            {advantages.map((item) => (
              <article className="why-card" key={item.number}>
                <span className="why-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section">
          <div className="cta-content">
            <p>LET'S BUILD SOMETHING GREAT</p>

            <h2>
              Have an Idea?
              <span> Let's Make It Happen.</span>
            </h2>

            <p>
              Partner with HSPV Technologies and take your business
              to the next level with innovative digital solutions.
            </p>

            <a href="#contact" className="cta-btn">
              Start Your Project <span>→</span>
            </a>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact section-padding" id="contact">

          <div className="section-heading">
            <p>LET'S CONNECT</p>
            <h2>Have a Project in Mind?</h2>
            <span>
              Let's discuss how technology can grow your business.
            </span>
          </div>

          <div className="contact-content">

            <div className="contact-info">
              <span className="small-label">GET IN TOUCH</span>

              <h3>
                Let's Talk About
                <span> Your Project.</span>
              </h3>

              <p>
                Have a question or a project idea?
                We would love to hear from you.
                Let's create something amazing together.
              </p>

              <div className="contact-detail">
                <span className="contact-icon">✉</span>
                <div>
                  <small>Email Address</small>
                  <a href="mailto:info@hspvtechnologies.com">
                    info@hspvtechnologies.com
                  </a>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-icon">◎</span>
                <div>
                  <small>Website</small>
                  <a
                    href="https://www.hspvtechnologies.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.hspvtechnologies.com
                  </a>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send Us a Message</h3>

              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
              />

              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />

              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="Enter message subject"
                required
              />

              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your project..."
                required
              ></textarea>

              <button type="submit" className="submit-btn">
                Send Message <span>→</span>
              </button>
            </form>

          </div>
        </section>

      </main>

      {/* PROFESSIONAL FOOTER */}
      <footer className="site-footer">
        <div className="footer-container">

          {/* Company Information */}
          <div className="footer-about">
            <a href="#home" className="footer-logo">
              <img
                src="/hspv-logo.png"
                alt="HSPV Technologies Logo"
              />
            </a>

            <p>
              HSPV Technologies Pvt. Ltd. delivers innovative,
              reliable and scalable technology solutions that
              empower businesses to grow in the digital world.
            </p>

            <div className="footer-tagline">
              INNOVATE <span>/</span> DEVELOP <span>/</span> GROW
            </div>
          </div>
          

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#why-us">Why Choose Us</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          
{/* Our Services - Two Columns */}
<div className="footer-links footer-services">
  <h3>Our Services</h3>

  <div className="footer-service-columns">

    <ul>
      <li><a href="#services">CRM Solutions</a></li>
      <li><a href="#services">CLM Solutions</a></li>
      <li><a href="#services">CPQ Solutions</a></li>
      <li><a href="#services">ERP Solutions</a></li>
      <li><a href="#services">Web Design & Development</a></li>
      <li><a href="#services">Mobile App Development</a></li>
      <li><a href="#services">Cloud Solutions & Hosting</a></li>
    </ul>

    <ul>
      <li><a href="#services">Business Automation & Data Management</a></li>
      <li><a href="#services">IT Consulting & IT Support</a></li>
      <li><a href="#services">Digital Marketing</a></li>
      <li><a href="#services">Software Development</a></li>
      <li><a href="#services">Technology Integration & Support</a></li>
    </ul>

  </div>
</div>


          {/* Contact */}
          <div className="footer-contact">
            <h3>Get In Touch</h3>

            <p>
              <span>✉</span>
              <a href="mailto:info@hspvtechnologies.com">
                info@hspvtechnologies.com
              </a>
            </p>

            <p>
              <span>🌐</span>
              <a href="https://www.hspvtechnologies.com">
                www.hspvtechnologies.com
              </a>
            </p>

            <p className="footer-location">
              Empowering Businesses Through Technology.
            </p>

            <div className="footer-socials">
              <a href="#contact" aria-label="Contact Us">✉</a>
              <a href="#home" aria-label="Home">⌂</a>
            </div>
          </div>
      

        </div>

        <div className="director-marquee">
          <div className="director-details">
            <span><i className="fas fa-building"></i> HSPV Technologies Pvt. Ltd.</span>
            <span><i className="fas fa-phone"></i> +91 9304094715</span>
            <span><i className="fas fa-location-dot"></i> Mayur Nagar, Royal Palms, Goregaon East, Mumbai, Maharastra 400065</span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()-2} HSPV Technologies Pvt. Ltd.
            All Rights Reserved.
          </p>

          
        <div className="footer-bottom-links">
          <a href="/privacy-policy">Privacy Policy</a>

          <span>|</span>

          <a href="/terms-of-service">Terms of Service</a>
        </div>

        <div className="footer-social">
          

          <div className="social-icons">
            <a href="https://www.facebook.com/share/1GmNzyP6pn/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>

            <a href="https://www.instagram.com/hspv_technologies_pvt_ltd?cplk=MTJ4Y2ZuM2p4eWNyZQ==/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>

            <a href="https://www.linkedin.com/company/hspv-technologies-pvt-ltd/home/?viewAsMember=true/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>

            <a href="https://wa.me/919304094715" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

          <p className="footer-bottom-tagline">
            INNOVATE / DEVELOP / GROW
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
