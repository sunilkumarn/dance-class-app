"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { auth, signOut } from "@/src/lib/firebase";

export default function Header() {
  const { user, loading } = useAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <img src="/images/logo.svg" alt="Praakrithi School of Music Logo" />
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleNavCollapse}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-end`} id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
            {loading ? (
              // Show a minimal placeholder during loading to avoid layout shifts
              <li className="nav-item">
                <span className="nav-link opacity-50">Loading...</span>
              </li>
            ) : user ? (
              <>
                <li className="nav-item"><Link className="nav-link" href="/dashboard">My Dash</Link></li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn ms-3">Logout</button>
                </li>
              </>
            ) : (
              <>
              <li className="nav-item"><Link className="nav-link schedule-demo" href="/schedule-demo">Book a Free Demo Class</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/login">Student Login</Link></li>
              <li className="nav-item">
                <div className="contact-with-icon">
                  <a className="nav-link" target="_blank" href="https://wa.me/919207759856?text=Hello,%20I%20am%20interested%20in%20learning%20Carnatic%20music!">
                    Contact Now <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" style={{ color: "#25D366" }} />
                  </a>
                </div>
              </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}