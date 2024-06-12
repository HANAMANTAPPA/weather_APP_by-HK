import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
// import PoseEstimation from "./PoseEstimation";
import AnimationComponent from "./AnimationComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <div>
    <h1>Pose Estimation using MediaPipe</h1>
    <AnimationComponent />
  </div>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
