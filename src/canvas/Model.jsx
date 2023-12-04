import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSnapshot } from "valtio";
import state from "../store";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/model/FINAL.glb");
  const snap = useSnapshot(state);

  // Divide snap values by 100
  const scaledLength = snap.length / 100;
  const scaledHeight = snap.height / 100;
  const scaledThickness = snap.thickness / 100;

  // Use a divisor for the group scaling
  const groupScaleFactor = 0.06; // Adjust as needed

  // Update material when texture changes
  const updateMaterial = () => {
    if (snap.design) {
      const texture = new THREE.TextureLoader().load(snap.design);

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1); // Adjust the repeat values as needed

      // Apply the texture to the entire group's material
      materials["Material.003"] = new THREE.MeshStandardMaterial({
        map: texture,
      });
    }
  };

  // Call updateMaterial when dimensions or texture change
  useEffect(() => {
    updateMaterial();
  }, [snap.design]);

  return (
    <group
      castShadow
      {...props}
      dispose={null}
      position={[0, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[
        scaledLength * groupScaleFactor, // Length
        scaledThickness * groupScaleFactor, // Thickness
        scaledHeight * groupScaleFactor, // Height
      ]}
    >
      <mesh // Tile
        geometry={nodes.TILE.geometry}
        material={materials["Material.003"]}
        scale={[19.6, 1, 19.6]}
      />

      <mesh // Plain Sides
        geometry={nodes.PLAIN_SIDE.geometry}
        material={materials["Material.003"]}
        position={[-18.583, 0.001, -0.021]}
        scale={[1, 1, 19.6]}
        visible={!snap.halfRound && !snap.fullRound && true}
      />

      <mesh // Line
        geometry={nodes.LINE.geometry}
        material={materials["Material.003"]}
        scale={[19.6, 1, 19.6]}
        visible={!snap.tileLine}
      />
      <mesh // Half Rounds
        geometry={nodes.HALF_ROUND_SIDES.geometry}
        material={materials["Material.003"]}
        scale={[19.6, 1, 19.6]}
        visible={snap.halfRound}
      />
      <mesh // Full Rounds
        geometry={nodes.FULL_ROUD_SIDE.geometry}
        material={materials["Material.003"]}
        position={[-18.583, 0.001, 0.001]}
        scale={[1, 1, 19.6]}
        visible={snap.fullRound}
      />
      <mesh // Tapered
        geometry={nodes.TAPERED_SIDE.geometry}
        material={materials["Material.003"]}
        position={[-18.583, 0.001, 0.003]}
        scale={[1, 1, 19.6]}
        visible={snap.tapered}
      />
    </group>
  );
}

useGLTF.preload("/model/FINAL.glb");
