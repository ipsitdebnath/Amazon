import { useState, useEffect } from "react";
import "./HeroCarousel.css";

const slides = [
  {
    image: "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg",
    alt: "Electronics deals"
  },
  {
    image: "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg",
    alt: "Kitchen essentials"
  },
  {
    image: "https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg",
    alt: "Fashion deals"
  },
  {
    image: "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg",
    alt: "Home decor"
  },
  {
    image: "https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg",
    alt: "Toys and games"
  }
];

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="hero-carousel">
      <div
        className="hero-carousel-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="hero-carousel-slide">
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>

      <button className="hero-arrow hero-arrow-left" onClick={goToPrev}>
        <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
          <path d="M18 2L2 18L18 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button className="hero-arrow hero-arrow-right" onClick={goToNext}>
        <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
          <path d="M2 2L18 18L2 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="hero-carousel-fade"></div>
    </div>
  );
}

export default HeroCarousel;
