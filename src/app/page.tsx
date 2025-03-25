"use client";
import Head from "next/head";
import Testimonials from "./components/Testimonials";
import ScrollIndicator from "./components/ScrollIndicator";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Praakrithi School of Music</title>
      </Head>
      <section className="hero">
        <div className="hero-content" id="hero-content-intro">
          <h2>Praakrithi School of Music</h2>
          <p>Invoke the life within!</p>
        </div>
        <div className="hero-content" id="hero-content-description">
          <p>Learn the timeless art of Carnatic music from the comfort of your home!</p> 
          <p>Praakrithi School of Music offers personalized online classes tailored to your pace and skill level, helping you master the nuances of this rich musical tradition.</p>
          <p>Embark on your musical journey today and experience the joy of learning Carnatic music with expert mentorship.</p>
          
          {/* Demo Class CTA */}
          <div className="mt-4">
            <Link href="/schedule-demo" className="btn btn-primary btn-lg">
              Book a Free Demo Class
            </Link>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      
      {/* Demo Class Promotion Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="h2 mb-3">Try Before You Commit</h2>
              <p className="lead mb-4">
                Not sure if our dance classes are right for you? Book a free demo session!
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">✓ No obligation to sign up</li>
                <li className="mb-2">✓ Experience our teaching style firsthand</li>
                <li className="mb-2">✓ Get personalized feedback</li>
                <li className="mb-2">✓ Meet our expert instructors</li>
              </ul>
              <Link href="/schedule-demo" className="btn btn-primary">
                Schedule Your Free Demo
              </Link>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h3 className="h4 mb-3 text-center">What Students Say</h3>
                  <div className="mb-3 pb-3 border-bottom">
                    <p className="fst-italic mb-1">
                      "The demo class was excellent! The instructor was patient and made me feel comfortable as a beginner."
                    </p>
                    <p className="small text-end text-muted mb-0">— Priya K.</p>
                  </div>
                  <div>
                    <p className="fst-italic mb-1">
                      "I was hesitant to start dance classes, but the demo convinced me. Now I'm a regular student!"
                    </p>
                    <p className="small text-end text-muted mb-0">— Rahul M.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />
    </>
  );
}