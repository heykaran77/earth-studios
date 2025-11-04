import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CanvasRendering = ({ parentRef }) => {
  const canvasRef = useRef(null);
  const frameCount = 382;
  const currentFrame = (i) => `/Images/Frame_${String(i).padStart(3, "0")}.jpg`;

  const scaleImage = (img, ctx) => {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const xShift = (canvas.width - img.width * ratio) / 2;
    const yShift = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, xShift, yShift, img.width * ratio, img.height * ratio);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const images = [];
      const imageSequence = { frame: 0 };

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      images[0].onload = () => {
        scaleImage(images[0], context);
      };

      if (images.length === 382) {
        gsap.to(imageSequence, {
          frame: frameCount - 1,
          snap: "frame",
          ease: "none",
          scrollTrigger: {
            trigger: parentRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            // markers: true,
          },

          onUpdate: () => scaleImage(images[imageSequence.frame], context),
        });

        const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          scaleImage(images[imageSequence.frame], context);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
      }
    }, canvasRef);

    return () => ctx.revert();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-screen"></canvas>;
};

export default CanvasRendering;
