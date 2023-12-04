import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader } from "@react-three/drei";
import { useSnapshot } from "valtio";
import state from "../store";

// Pages
import Tile from "./Tile";

const CanvasComponent = () => {
  const snap = useSnapshot(state);

  return (
    <div className="w-full max-w-full h-[60vh] transition-all ease-in flex items-center justify-center mt-[10px] mb-[80px]">
      <Canvas shadows camera={{ fov: 40 }}>
        <ambientLight intensity={1.2} />
        <directionalLight castShadow position={[1, 1, 1]} intensity={0.5} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Tile />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
