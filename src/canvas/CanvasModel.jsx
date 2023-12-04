import React, { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges, Loader } from "@react-three/drei";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { useSnapshot } from "valtio";
import state from "../store";

extend({ OrbitControls });

const CanvasModel = ({ selectedFinition, pipeLine }) => {
  const snap = useSnapshot(state);
  const controlsRef = useRef();
  const boxRef = useRef();
  const lineRef = useRef(); // Reference for the line mesh
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [highlightColor, setHighlightColor] = useState(0xcccccc); // Default color

  useEffect(() => {
    if (selectedFinition === 1) {
      setRotation([0, 0, 0]);
      setHighlightColor(0xff0000); // Red for Finition Coté 1
    } else if (selectedFinition === 2) {
      setRotation([0, Math.PI, 0]);
      setHighlightColor(0x00ff00); // Red for Finition Coté 2
    } else {
      setRotation([0, 0, 0]);
      setHighlightColor(0xcccccc); // Default color for other Finitions
    }
  }, [selectedFinition]);

  useEffect(() => {
    if (boxRef.current && snap.design) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(snap.design, (loadedTexture) => {
        const material = new THREE.MeshStandardMaterial({
          color: highlightColor,
          emissive: 0x000000,
          side: THREE.DoubleSide,
          map: loadedTexture,
        });

        boxRef.current.material = material;
      });
    }
  }, [snap.design, highlightColor]);

  useEffect(() => {
    if (lineRef.current) {
      // Adjust the line position based on your requirement
      lineRef.current.position.set(-snap.length / 200, 0, 0);
    }
  }, [snap.length]);

  return (
    <div className="w-full max-w-full h-[60vh] transition-all ease-in items-center mt-[10px] mb-[80px]">
      <Canvas shadows camera={{ fov: 18 }}>
        <ambientLight intensity={5} />
        <directionalLight position={[1, 1, 1]} intensity={0.5} />
        <OrbitControls ref={controlsRef} />
        <Box
          args={[snap.length / 100, snap.width / 100, snap.thickness / 1000]}
          position={[0, 0, 0]}
          ref={boxRef}
          rotation={rotation}
        >
          <meshStandardMaterial
            color={highlightColor}
            emissive={0x000000}
            side={THREE.DoubleSide}
          />
        </Box>

        {/* Add a vertical line when pipeLine is true */}
        {pipeLine && (
          <mesh ref={lineRef}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attachObject={["attributes", "position"]}
                array={new Float32Array([0, -1, 0, 0, 1, 0])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={0x000000} />
          </mesh>
        )}

        {/* Edges component */}
        <Edges
          geometry={
            new THREE.BoxGeometry(
              snap.length / 100,
              snap.width / 100,
              snap.thickness / 1000
            )
          }
          material={new THREE.LineBasicMaterial({ color: 0x000000 })}
          lineSegments
        />

        <CanvasFrameUpdater controlsRef={controlsRef} />
      </Canvas>
      <Loader />
    </div>
  );
};

const CanvasFrameUpdater = ({ controlsRef }) => {
  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return null;
};

export default CanvasModel;
