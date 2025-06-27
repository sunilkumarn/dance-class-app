"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Chinmayi",
    img: "/images/chinmayi.jpeg",
    text: "I wanted to introduce my daughter to the rich tradition of classical music. I also hoped to give her a meaningful break from screens and gadgets, and some quality time to engage in something beautiful. That's when I came across Praakriti, which offers music sessions for children. I was a bit skeptical at first, especially considering her young age and the fact that the classes were online. But it worked out wonderfully. The teacher showed incredible patience, understood my child's pace, and gently guided her. I would wholeheartedly recommend this to anyone looking to offer their child something truly enriching.",
    attribution: "Kiran, Thrissur"
  },
  {
    name: "Anaya",
    img: "/images/anaya.jpeg",
    text: "My daughter Anaya had absolutely no interest in music when we first enrolled her for the demo class. She was also quite restless and couldn't sit still for more than a few minutes. But to our surprise, she sat through the entire class and even showed interest! Since then, there's been a remarkable transformation. She now looks forward to every session, sings confidently at her school programs, and stays fully focused throughout the class — something we never imagined. Music has brought out calmness, discipline, and confidence in her that continues to amaze us every single day. We're so grateful to have found this space.",
    attribution: "Simi, Alappuzha"
  },
  {
    name: "Bharat",
    img: "/images/bharat.jpeg",
    text: "Bharath never had an interest in music and wouldnt even hum or sing anything at home. After 2 failed attempts with traditional music learnings, we were hesitant to explore online classes from Praakriti. However, right after the first face-2-face session with Lichana Akka, he was keen to attend the classes. \nWithin a few weeks, the transformation I have seen in Bharat and the wonderful guru-shishya bond that has blossomed between them is amazing to watch. He eagerly waits for the classes, happily sings Sa re ga ma in his spare hours & listens to music. Very honestly, I am super surprised at the positive impact the classes has had on him as his newfound passion for music shines through!",
    attribution: "Sreejith & Asha, Alappuzha"
  },  
  {
    name: "Aswath",
    img: "/images/aswath.jpeg",
    text: "From a very young age, Aswath has shown a deep interest in singing—whether it was poems, film songs, or simple tunes around the house. As parents, we were looking for a space where his natural inclination could be nurtured with care and individual attention.\n\nWe explored several options, but most of them offered only group classes, which didn’t quite meet what we were looking for. We wanted a teacher who could truly understand each child’s unique rhythm and guide them accordingly.\n\nThat’s when we found Praakriti. It has been a wonderful space where Aswath is not just learning music, but growing joyfully with it. We are truly grateful.",
    attribution: "Renjini, Pathanamthitta"
  },
];

export default function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="testimonials" id="testimonials">
      <h2>Hear from our students!</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              slidesPerView={3}
              spaceBetween={20}
              pagination={{ clickable: true }}
              autoplay={{ 
                delay: 3000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false
              }}
              breakpoints={{
                0: { slidesPerView: 1 }, // 1 slide on small screens
                768: { slidesPerView: 2 }, // 2 slides on tablets
                1024: { slidesPerView: 3 }, // 3 slides on desktops
              }}
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
            >
              {testimonials.map((t, index) => (
                <SwiperSlide
                  key={index}
                  className="testimonial"
                  onTouchStart={() => swiperRef.current?.autoplay?.stop()}
                  onTouchEnd={() => swiperRef.current?.autoplay?.start()}
                  onTouchCancel={() => swiperRef.current?.autoplay?.start()}
                >
                  <FontAwesomeIcon icon={faQuoteLeft} className="icon" />
                  <p className="description">{t.text}</p>
                  <p className="attribution">- {t.attribution}</p>
                  <div className="testimonial-content">
                    <div className="pic">
                      <Image src={t.img} alt={t.name} width={100} height={100} />
                    </div>
                    <h3 className="title">{t.name}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
