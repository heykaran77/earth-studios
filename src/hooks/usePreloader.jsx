// src/hooks/usePreloader.js
import { useEffect, useState } from "react";

export const usePreloader = (assets = []) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!assets.length) {
      setProgress(100);
      setIsLoaded(true);
      return;
    }

    let loaded = 0;

    assets.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = img.onerror = () => {
        loaded++;
        const percent = Math.round((loaded / assets.length) * 100);
        setProgress(percent);
        if (loaded === assets.length) setIsLoaded(true);
      };
    });
  }, [assets]);

  return { progress, isLoaded };
};
