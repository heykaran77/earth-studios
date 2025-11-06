import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import CanvasRendering from "./components/CanvasRendering";

import Preloader from "./components/Preloader";
import { usePreloader } from "./hooks/usePreloader";

const App = () => {
  const lenisRef = useRef();
  const parentRef = useRef();

  const [showContent, setShowContent] = useState(false);

  // All your assets (e.g. image sequence)
  const frameCount = 382;
  const assets = Array.from(
    { length: frameCount },
    (_, i) => `/Images/Frame_${String(i).padStart(3, "0")}.jpg`
  );

  const { progress, isLoaded } = usePreloader(assets);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  const handlePreloaderComplete = () => {
    setShowContent(true);
  };

  return (
    <ReactLenis
      root
      options={{ autoRaf: false, lerp: 0.1, smoothTouch: true }}
      ref={lenisRef}>
      {!showContent && (
        <Preloader
          progress={progress}
          isLoaded={isLoaded}
          onComplete={handlePreloaderComplete}
        />
      )}

      <div className="w-full bg-zinc-900">
        <div ref={parentRef} className="w-full h-[1500vh] relative">
          <div className="w-full h-screen sticky top-0 left-0">
            {/* canvas  */}
            <CanvasRendering parentRef={parentRef} />
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default App;
