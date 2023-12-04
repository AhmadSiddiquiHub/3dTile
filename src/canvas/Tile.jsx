import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSnapshot } from "valtio";
import state from "../store";

export default function Tile(props) {
  const { nodes, materials } = useGLTF("/model/Tile-Model.glb");
  const snap = useSnapshot(state);

  // Divide snap values by 100
  const scaledLength = snap.length / 100;
  const scaledHeight = snap.height / 100;
  const scaledThickness = snap.thickness / 40;

  // Use a divisor for the group scaling
  const groupScaleFactor = 0.05; // Adjust as needed

  // Update material when texture changes
  const updateMaterial = () => {
    if (snap.design) {
      const texture = new THREE.TextureLoader().load(snap.design);

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1); // Adjust the repeat values as needed

      const material = new THREE.MeshStandardMaterial({ map: texture });
      materials["Material.004"] = material;
      materials["Material.002"] = material;

      // Apply the same material to all meshes in the group
      for (const nodeName in nodes) {
        if (nodes[nodeName] instanceof THREE.Mesh) {
          nodes[nodeName].material = material;
        }
      }
    }
  };

  // Call updateMaterial when dimensions or texture change
  useEffect(() => {
    updateMaterial();
  }, [state.design, snap.design]);

  return (
    <group
      castShadow
      {...props}
      dispose={null}
      position={[0.02, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[
        scaledLength * groupScaleFactor, // Length
        scaledThickness * groupScaleFactor, // Thickness
        scaledHeight * groupScaleFactor, // Height
      ]}
    >
      {!snap.fullRoundRight && !snap.fullRoundLeft && (
        <>
          <mesh // Default Structure Starts Here
            geometry={nodes.tile_face_2.geometry}
            material={nodes.tile_face_2.material}
            position={[-0.374, 6.009, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.425]}
            visible={!snap.tileLineRight}
          />
          <mesh
            geometry={nodes.tile_face_4.geometry}
            material={materials["Material.004"]}
            position={[-0.374, 6.009, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[21, 19.7, 7.6]}
            visible={!snap.tileLineFront}
          />
          <mesh
            geometry={nodes.TOP_BOTTOM.geometry}
            material={nodes.TOP_BOTTOM.material}
            position={[-0.374, 6.032, 0.304]}
            scale={[19.6, 7.5, 19.6]}
          />
          <mesh
            geometry={nodes.tile_face_1.geometry}
            material={nodes.tile_face_1.material}
            position={[-0.375, -1.347, 0.252]}
            rotation={[0, 0, -Math.PI]}
            scale={[-0.899, -0.152, -32.2]}
            visible={!snap.tileLineBack}
          />
          <mesh
            geometry={nodes.TILE_FACE_3.geometry}
            material={nodes.TILE_FACE_3.material}
            position={[-18.799, 0.002, 0.252]}
            rotation={[Math.PI, 0, 0]}
            scale={[0.06, 1.055, 32.01]}
            visible={!snap.tileLineLeft}
          />
          <mesh // Lines Starts Here
            geometry={nodes.back_line.geometry}
            material={materials["Material.002"]}
            scale={[18.2, 1.383, 19.7]}
            visible={snap.tileLineBack}
            position={[0, 0, 0.3]}
          />
          <mesh
            geometry={nodes.front_line.geometry}
            material={nodes.front_line.material}
            position={[-0.329, -0.014, 0.269]}
            scale={[19.3, 1.252, 19.6]}
            visible={snap.tileLineFront}
          />
          <mesh
            geometry={nodes.left_line.geometry}
            material={nodes.left_line.material}
            position={[-0.329, -0.014, 0.269]}
            scale={[19.6, 1.2, 19.6]}
            visible={snap.tileLineLeft}
          />
          <mesh
            geometry={nodes.right_line.geometry}
            material={nodes.right_line.material}
            position={[-0.329, -0.014, 0.269]}
            scale={[19.5, 1, 19.6]}
            visible={snap.tileLineRight}
          />
          <mesh // Plain Sides Starts Here
            geometry={nodes.PLAIN_SIDE_1.geometry}
            material={nodes.PLAIN_SIDE_1.material}
            position={[-0.374, 6.009, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.39]}
            visible={!snap.taperedBottomLeft && !snap.halfRoundBottomLeft}
          />
          <mesh
            geometry={nodes.PLAIN_SIDE_2.geometry}
            material={nodes.PLAIN_SIDE_2.material}
            position={[-0.39, 6.009, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.424]}
            visible={!snap.taperedBottomRight && !snap.halfRoundBottomRight}
          />
          <mesh
            geometry={nodes.PLAIN_SIDE_3.geometry}
            material={nodes.PLAIN_SIDE_3.material}
            position={[-0.4, 5.92, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.425]}
            visible={!snap.taperedTopRight && !snap.halfRoundTopRight}
          />
          <mesh
            geometry={nodes.PLAIN_SIDE_4.geometry}
            material={nodes.PLAIN_SIDE_4.material}
            position={[-0.374, 6.009, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.53]}
            visible={!snap.taperedTopLeft && !snap.halfRoundTopLeft}
          />
          <mesh // Tapered Sides Starts Here
            geometry={nodes.tappered_2.geometry}
            material={nodes.tappered_2.material}
            position={[-0.374, 5.94, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.425]}
            visible={snap.taperedTopLeft}
          />
          <mesh
            geometry={nodes.tappered_3.geometry}
            material={nodes.tappered_3.material}
            position={[-0.374, 6.009, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.57, 7.55]}
            visible={snap.taperedTopRight}
          />
          <mesh
            geometry={nodes.tappered_1.geometry}
            material={nodes.tappered_1.material}
            position={[-0.39, 6.009, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.425]}
            visible={snap.taperedBottomRight}
          />
          <mesh
            geometry={nodes.tappered_4.geometry}
            material={nodes.tappered_4.material}
            position={[-0.374, 6.009, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.425]}
            visible={snap.taperedBottomLeft}
          />
          <mesh // Half Round Sides Starts Here
            geometry={nodes.half_round_3.geometry}
            material={nodes.half_round_3.material}
            position={[-0.374, 5.94, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.425]}
            visible={snap.halfRoundTopLeft}
          />
          <mesh
            geometry={nodes.half_round_4_.geometry}
            material={nodes.half_round_4_.material}
            position={[-0.414, 6.721, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 8.59]}
            visible={snap.halfRoundTopRight}
          />
          <mesh
            geometry={nodes.half_round_2.geometry}
            material={nodes.half_round_2.material}
            position={[-0.39, 6.009, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.425]}
            visible={snap.halfRoundBottomRight}
          />
          <mesh
            geometry={nodes.half_round_1.geometry}
            material={nodes.half_round_1.material}
            position={[-0.374, 6.009, 0.304]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[19.6, 19.6, 7.425]}
            visible={snap.halfRoundBottomLeft}
          />
        </>
      )}

      {(snap.fullRoundRight || snap.fullRoundLeft) && (
        <>
          <mesh // Full Round Tile Code Starts Here
            geometry={nodes.top_plain.geometry}
            material={nodes.top_plain.material}
            position={[-0.349, -0.182, 0]}
            scale={[16.918, 1.383, 19.6]}
            visible={!snap.tileLineFront}
          />
          <mesh
            geometry={nodes.top_line.geometry}
            material={nodes.top_line.material}
            position={[-0.349, -0.182, 0]}
            rotation={[0, -1.571, 0]}
            scale={[19.6, 1.383, 19.6]}
          />
          <mesh
            geometry={nodes.sides.geometry}
            material={nodes.sides.material}
            position={[-0.349, -0.182, 0]}
            scale={[16.918, 1.383, 19.6]}
          />
          <mesh
            geometry={nodes.right_full_round.geometry}
            material={nodes.right_full_round.material}
            position={[-0.349, -0.182, 0]}
            rotation={[0, -1.571, 0]}
            scale={[19.6, 1.383, 19.6]}
            visible={snap.fullRoundRight}
          />
          <mesh
            geometry={nodes.left_full_round.geometry}
            material={nodes.left_full_round.material}
            position={[-0.349, -0.182, 0]}
            rotation={[0, -1.571, 0]}
            scale={[19.6, 1.383, 19.6]}
            visible={snap.fullRoundLeft}
          />
          <mesh
            geometry={nodes.bottom_plain.geometry}
            material={nodes.bottom_plain.material}
            scale={[17.5, 1.55, 19.6]}
            visible={!snap.tileLineBack}
          />
        </>
      )}
    </group>
  );
}

useGLTF.preload("/model/Tile-Model.glb");
