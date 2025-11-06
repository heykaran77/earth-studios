// src/components/Preloader.jsx
import { useEffect } from "react";
import gsap from "gsap";

const Preloader = ({ progress, isLoaded, onComplete }) => {
  useEffect(() => {
    if (isLoaded) {
      // Fade out once done
      setTimeout(() => {
        gsap.to(".preloader", {
          translateY: "-100%",
          ease: "power2.inOut",
          duration: 1,
          onComplete: onComplete,
        });
      }, 1000);
    }
  }, [isLoaded, onComplete]);

  return (
    <div className="preloader fixed top-0 left-0 w-full h-screen bg-black flex items-end justify-end z-50 font-['gilroy'] p-3 tracking-tighter">
      <h1 className="text-8xl font-bold text-white">
        {String(progress).padStart(2, "0")}
      </h1>
    </div>
  );
};

export default Preloader;
