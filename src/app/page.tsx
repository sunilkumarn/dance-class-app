"use client";
import Head from "next/head";
import Testimonials from "./components/Testimonials";
import ScrollIndicator from "./components/ScrollIndicator";
import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if we should scroll to demo section
    if (searchParams.get('scrollToDemo') === 'true') {
      const demoSection = document.getElementById('free-demo');
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  return (
    <>
      <Head>
        <title>Praakrithi School of Music</title>
      </Head>
      <section className="hero">
        <div className="hero-content" id="hero-content-intro">
          <h2>Praakrithi School of Music</h2>
          <div>Invoke the life within!</div>
        </div>
        <div className="hero-content" id="hero-content-description">
          <p>Learn the timeless art of Carnatic music from the comfort of your home!</p> 
          <p>Praakrithi School of Music offers personalized online classes tailored to your pace and skill level, helping you master the nuances of this rich musical tradition.</p>
          <p>Embark on your musical journey today and experience the joy of learning Carnatic music with expert mentorship.</p>
          
        </div>
        <ScrollIndicator />
      </section>
      
      <section className="free-demo-section" id="free-demo">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mb-4">Start with a Free Demo Class</h2>
              <p className="mb-4">
                Before you begin your musical journey with us, we invite you to experience a free one-on-one demo session with our instructor. 
                This session helps both the student and teacher understand each other better — to assess comfort, skill level, and expectations. 
                It's a relaxed space where we can explore your interests, discuss your goals, and find the perfect time slot for your regular classes. 
                No commitments — just music, connection, and clarity.
              </p>
              <Link href="/schedule-demo" className="btn btn-primary px-4 py-2">
                Schedule a Demo Class
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />
    </>
  );
}