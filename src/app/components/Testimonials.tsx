"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Anaya",
    img: "/images/anaya.jpeg",
    text: "My daughter Anaya had absolutely no interest in music when we first enrolled her for the demo class. She was also quite restless and couldn't sit still for more than a few minutes. But to our surprise, she sat through the entire class and even showed interest! Since then, there's been a remarkable transformation. She now looks forward to every session, sings confidently at her school programs, and stays fully focused throughout the class — something we never imagined. Music has brought out calmness, discipline, and confidence in her that continues to amaze us every single day. We're so grateful to have found this space.",
    attribution: "Simi, Alappuzha"
  },
  {
    name: "Bharat",
    img: "/images/bharat.jpeg",
    text: "Bharath never had an interest in music and wouldnt even hum or sing anything at home. \nAfter 2 failed attempts with traditional music learnings, we were hesitant to explore online classes from Praakriti. However, right after the first face-2-face session with Lichana Akka, he was keen to attend the classes. \nWithin a few weeks, the transformation I have seen in Bharat and the wonderful guru-shishya bond that has blossomed between them is amazing to watch. He eagerly waits for the classes, happily sings Sa re ga ma in his spare hours & listens to music. Very honestly, I am super surprised at the positive impact the classes has had on him as his newfound passion for music shines through!",
    attribution: "Sreejith & Asha, Alappuzha"
  },
  {
    name: "Chinmayi",
    img: "/images/chinmayi.jpeg",
    text: "I wanted to introduce my daughter to the rich tradition of classical music. I also hoped to give her a meaningful break from screens and gadgets, and some quality time to engage in something beautiful. That's when I came across Praakriti, which offers music sessions for children. I was a bit skeptical at first, especially considering her young age and the fact that the classes were online. But it worked out wonderfully. The teacher showed incredible patience, understood my child's pace, and gently guided her. I would wholeheartedly recommend this to anyone looking to offer their child something truly enriching.",
    attribution: "Kiran, Thrissur"
  },
  {
    name: "Aswanth",
    img: "/images/user.jpg",
    text: "Aswanth has always shown a deep interest in cultural activities, especially those at nearby temples. I sensed early on that he was drawn to music and tradition, and I wanted to find a space where that spark could be carefully nurtured. That's when I came across Praakriti. From the very first class, I knew we had made the right choice. The sessions are not just about learning songs — they provide a strong foundation in classical music, while still being gentle and engaging for children. The teacher's patience and attention to detail have helped Aswanth grow beautifully in his musical journey. I'm truly grateful for this space that understands and moulds children with such care.",
    attribution: "Ranjini, Pathanamthitta"
  },
];

export default function Testimonials() {
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
            >
              {testimonials.map((t, index) => (
                <SwiperSlide key={index} className="testimonial">
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
