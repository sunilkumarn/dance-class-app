"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function ScrollIndicator() {
  const scrollToTestimonials = () => {
    const element = document.getElementById("testimonials");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="scroll-indicator" onClick={scrollToTestimonials} style={{ cursor: "pointer", textAlign: "center" }}>
      <FontAwesomeIcon icon={faChevronDown} size="2x" style={{ color: "white" }} />
    </div>
  );
}
