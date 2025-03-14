"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  { name: "Aswanth", img: "/images/user.jpg", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque, aliquet sit amet elementum vel, vehicula eget eros. Vivamus arcu metus, mattis sed sagittis at, sagittis quis neque. Praesent." },
  { name: "Bharat", img: "/images/user.jpg", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque, aliquet sit amet elementum vel, vehicula eget eros. Vivamus arcu metus, mattis sed sagittis at, sagittis quis neque. Praesent." },
  { name: "Anaya", img: "/images/user.jpg", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque, aliquet sit amet elementum vel, vehicula eget eros. Vivamus arcu metus, mattis sed sagittis at, sagittis quis neque. Praesent." },
  { name: "Gopikrishna", img: "/images/user.jpg", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque, aliquet sit amet elementum vel, vehicula eget eros. Vivamus arcu metus, mattis sed sagittis at, sagittis quis neque. Praesent." },
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
          autoplay={{ delay: 3000 }}
          breakpoints={{
            0: { slidesPerView: 1 },   // 1 slide on small screens
            768: { slidesPerView: 2 }, // 2 slides on tablets
            1024: { slidesPerView: 3 } // 3 slides on desktops
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index} className="testimonial">
              <FontAwesomeIcon icon={faQuoteLeft} className="icon" />              
              <p className="description">{t.text}</p>
              <div className="testimonial-content">
                <div className="pic"><img src={t.img} alt={t.name} /></div>
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