"use client";

import ShaderBackground from "./ShaderBackground";

export default function BackgroundLayers() {
  return (
    <>
      <ShaderBackground />
      <div className="bg-grain" />
      <div className="bg-vignette" />
    </>
  );
}
