import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import CanvasRendering from "./components/CanvasRendering";

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
      <div className="w-full bg-zinc-900">
        <div className="w-full h-[1500vh] relative">
          <div className="w-full h-screen sticky top-0 left-0">
            {/* canvas  */}
            <CanvasRendering />
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default App;
