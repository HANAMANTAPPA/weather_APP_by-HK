import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const AnimationComponent = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const executeCode = () => {
      console.log("Executing initial code for 20 seconds");
      setTimeout(() => {
        setIsAnimating(true);
      }, 5000);
    };

    const startAnimation = () => {
      console.log(
        "Starting animation and console logging every second for 30 seconds"
      );
      gsap.to(elementRef.current, {
        rotation: 360,
        duration: 5,
          repeat: 5,
        
        ease: "linear",
      });

      const logInterval = setInterval(() => {
        console.log("hellow");
      }, 1000);

      setTimeout(() => {
        clearInterval(logInterval);
        setIsAnimating(false);
      }, 10000);
    };

    const interval = setInterval(() => {
      if (!isAnimating) {
        executeCode();
      } else {
        startAnimation();
      }
    }, 15000);

    executeCode();

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div>
      <div
        ref={elementRef}
        style={{ width: "100px", height: "100px", background: "red" }}
      >
        Animate me
      </div>
    </div>
  );
};

export default AnimationComponent;
