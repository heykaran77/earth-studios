import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

const App = () => {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{ autoRaf: false, lerp: 0.1, smoothTouch: true }}
      ref={lenisRef}>
      <div className="h-screen w-full bg-zinc-900">
        <div className="h-[1500vh] bg-amber-200"></div>
      </div>
    </ReactLenis>
  );
};

export default App;
