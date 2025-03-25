"use client";
import Head from "next/head";
import Testimonials from "./components/Testimonials";
import ScrollIndicator from "./components/ScrollIndicator"

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
        </div>
        <ScrollIndicator />
      </section>
      <Testimonials />
    </>
  );
}