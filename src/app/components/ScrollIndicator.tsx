"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function ScrollIndicator() {
  const scrollToFreeDemo = () => {
    const element = document.getElementById("free-demo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="scroll-indicator" onClick={scrollToFreeDemo} style={{ cursor: "pointer", textAlign: "center" }}>
      <FontAwesomeIcon icon={faChevronDown} size="2x" style={{ color: "white" }} />
    </div>
  );
}
