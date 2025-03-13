"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <img src="/images/logo.svg" alt="Praakrithi School of Music Logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item"><Link className="nav-link schedule-demo" href="/demo">Schedule a demo class</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/login">Student Login</Link></li>
            <li className="nav-item">
              <div className="contact-with-icon">
                <a className="nav-link" target="_blank" href="https://wa.me/919207759856?text=Hello,%20I%20am%20interested%20in%20learning%20Carnatic%20music!">
                  Contact Now <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" style={{ color: "#25D366" }} />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}