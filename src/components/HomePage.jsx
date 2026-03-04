// src/components/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function HomePage() {
  const featuredTextiles = [
    {
      name: "Kanchipuram Silk",
      image:
        "https://i.pinimg.com/474x/8a/23/e5/8a23e5b45c22b1ebcef3347670a7bb7c.jpg",
      link: "https://en.wikipedia.org/wiki/Kanchipuram_silk_sari"
    },
    {
      name: "Banarasi Brocade",
      image:
        "https://akrithi.com/cdn/shop/files/IMG_1205.jpg?v=1725695680&width=2000",
      link: "https://en.wikipedia.org/wiki/Banarasi_sari"
    },
    {
      name: "Chanderi Cotton",
      image:
        "https://akrithi.com/cdn/shop/files/61BA01C7-6A27-4A97-922B-123F1B37C139.jpg?v=1711209062&width=2000",
      link: "https://en.wikipedia.org/wiki/Chanderi_sari"
    },
    {
      name: "Phulkari Embroidery",
      image:
        "https://static.wixstatic.com/media/229a21_1c04470654db4ba49f18f46e497ad460~mv2.jpg/v1/fill/w_290,h_386,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/229a21_1c04470654db4ba49f18f46e497ad460~mv2.jpg",
      link: "https://en.wikipedia.org/wiki/Phulkari"
    }
  ];

  const aboutCards = [
    {
      title: "Discover Regional Textiles",
      desc: "Explore traditional textiles from every state of India – silks, handlooms, and cottons.",
    },
    {
      title: "Manage Your Cart",
      desc: "Add your favorite textiles to your cart and keep track of your selections easily.",
    },
    {
      title: "Track Orders & Delivery",
      desc: "Know when your precious textiles arrive safely at your doorstep.",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Explore India’s Finest Textiles</h1>
            <p>
              From Kanchipuram silks to Banarasi brocades, discover, shop, and
              manage your textile collections seamlessly.
            </p>
            <Link to="/user/products" className="hero-btn">
              Browse Textiles
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-container">

          <div className="about-text">
            <h2>About TextileTrack India</h2>

            <p>
              TextileTrack India is a smart platform designed to help textile
              businesses manage inventory, track production, and streamline
              operations with modern digital tools.
            </p>

            <p>
              India's textile industry is one of the largest in the world,
              known for its rich heritage, skilled craftsmanship, and global
              exports.
            </p>

            <div className="about-cards">
              {aboutCards.map((card, index) => (
                <div key={index} className="about-card">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>

            <ul className="about-points">
              <li>Supports manufacturers, wholesalers, and retailers</li>
              <li>Real-time textile inventory and order tracking</li>
              <li>Improves efficiency and reduces manual work</li>
              <li>Combines traditional textile knowledge with modern technology</li>
              <li>Helps businesses make data-driven decisions</li>
            </ul>

          </div>

          <div className="about-image">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/fLcrMrQbkK8"
              title="Textile Industry Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

        </div>
      </section>

      <section id="featured" className="featured-section">
        <h2>Featured Textiles Across India</h2>

        <div className="featured-cards">
          {featuredTextiles.map((textile, i) => (
            <div className="featured-card" key={i}>
              <img src={textile.image} alt={textile.name} />

              <h4>{textile.name}</h4>
              <p>Authentic, traditional Indian textile</p>

              {/* External link or custom link */}
              <a
                href={textile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-btn"
              >
                View
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-container">

          <div className="faq-card">
            <h3>How do I order regional textiles?</h3>
            <p>
              Browse the featured textiles, add your preferred items to the cart,
              and complete the checkout process easily.
            </p>
          </div>

          <div className="faq-card">
            <h3>Do you deliver nationwide?</h3>
            <p>
              Yes! We deliver authentic Indian textiles across all states in India.
            </p>
          </div>

          <div className="faq-card">
            <h3>Are the textiles authentic?</h3>
            <p>
              All our products are sourced directly from certified local artisans
              and weavers to ensure authenticity and quality.
            </p>
          </div>

          <div className="faq-card">
            <h3>What payment methods are available?</h3>
            <p>
              We support secure online payments including UPI, debit cards,
              credit cards, and net banking.
            </p>
          </div>

          <div className="faq-card">
            <h3>Can I track my order?</h3>
            <p>
              Yes. Once your order is placed, you can track the delivery status
              through your account dashboard.
            </p>
          </div>

          <div className="faq-card">
            <h3>How should I care for traditional fabrics?</h3>
            <p>
              Most traditional fabrics like silk and handloom cotton should be
              hand-washed or dry-cleaned to maintain their quality and color.
            </p>
          </div>

          <div className="faq-card">
            <h3>Can I return or exchange a product?</h3>
            <p>
              Yes. We offer a return or exchange option within 7 days of delivery
              if the product is unused and in its original condition.
            </p>
          </div>

        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p className="contact-subtitle">
          We'd love to hear from you. Send us a message anytime.
        </p>

        <div className="contact-container">

          {/* Image */}
          <div className="contact-image">
            <img
              src="https://i.pinimg.com/736x/08/2d/16/082d167996faea7785da4cd606df4e03.jpg"
              alt="Textile"
            />
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Email Address" />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message"></textarea>
            <button>Send Message</button>
          </div>

        </div>
      </section>
    </div>
  );
}
