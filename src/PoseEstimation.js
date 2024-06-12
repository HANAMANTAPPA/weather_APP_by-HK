import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import * as drawingUtils from "@mediapipe/drawing_utils";

const PoseEstimation = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [pose, setPose] = useState(null);

  function drawCircle(context, x, y, color, radius) {
    if (color == null) {
      color = "#FFF";
    }
    if (radius == null) {
      radius = 25;
    }
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI); // Draw a circle path
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
  useEffect(() => {
    const onResults = (results) => {
      if (!canvasRef.current) return;

      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (results.poseLandmarks) {
        const landmarks = results.poseLandmarks;
        let keypoints = [];

        for (let i = 0; i < 33; i++) {
          const coordinates = {
            x: landmarks[i].x * 640,
            y: landmarks[i].y * 480,
            z: landmarks[i].z,
            visibility: landmarks[i].visibility,
          };

          keypoints.push(coordinates);
          //   draw circle
          drawCircle(canvasCtx, coordinates.x, coordinates.y, "green", 5);
        }

        // drawingUtils.drawConnectors(
        //   canvasCtx,
        //   results.poseLandmarks,
        //   Pose.POSE_CONNECTIONS,
        //   { color: "#00FF00", lineWidth: 4 }
        // );
        // drawingUtils.drawLandmarks(canvasCtx, results.poseLandmarks, {
        //   color: "#FF0000",
        //   lineWidth: 2,
        // });
      }
      canvasCtx.restore();
    };

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);
    setPose(pose);

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => {
      if (pose) {
        pose.close();
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} width={640} height={480} />
    </div>
  );
};

export default PoseEstimation;
