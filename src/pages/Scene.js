import React, { useState } from "react"
import { SketchPicker } from "react-color";
import * as THREE from 'three'
import { Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, ContactShadows, Environment, OrbitControls } from "@react-three/drei"

import Header from "../components/header"
import RainWater from '../components/RainWater';




function BottomScene() {

  const texture = useLoader(THREE.TextureLoader, 'floor.png')
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10)

  return (
    <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[5, 5, 5]}>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshBasicMaterial attach="material" map={texture} side={2} />
    </mesh>
  )
}

export function RoundPlatform(props) {
  const { nodes, materials } = useGLTF("round_platform.glb");
  return (
    <group {...props} dispose={null}>
      <group>
        <group rotation={[0, 0, 0]}>
          <group scale={0.005}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.pCylinder1_defaultPolygonShader1_0.geometry}
              material={materials.defaultPolygonShader1}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
function Scene() {
  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");
  const RotatingBoxPlatform = () => {
    const platformMesh = React.useRef();
    useFrame(() => {
      platformMesh.current.rotateY(0.03)
    });

    return (
      <mesh ref={platformMesh} position={[0, 1, 0]}>
        <boxBufferGeometry />
        <meshPhongMaterial color={blockPickerColor} />
      </mesh>
    );
  }
  return (
    <>
      <Header />
      <div className="flex">
        <div id="canvas-container" style={{ width: "100vw", height: "80vh" }}>
          <Canvas shadows gl={{ antialias: false }} camera={{ position: [0, 10, 45], near: 30, far: 500, fov: 12 }}>
            <Suspense fallback={null}>
              <BottomScene />
              <RotatingBoxPlatform />
              <Environment
                background={true}
                blur={0}
                files={['TropicalSunnyDay_px.jpg', 'TropicalSunnyDay_nx.jpg', 'TropicalSunnyDay_py.jpg', 'TropicalSunnyDay_ny.jpg', 'TropicalSunnyDay_pz.jpg', 'TropicalSunnyDay_nz.jpg']}
                path="./"
                preset={null}
                scene={undefined}
                encoding={undefined}
              />
              <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
              />
              <RoundPlatform />
              <RainWater />
              <ambientLight intensity={0.1} />
              <directionalLight />
            </Suspense>
          </Canvas>
        </div>
        <div className="pl-4 mt-4" style={{ width: "20vw", height: "100vh" }}>
          <SketchPicker
            color={blockPickerColor}
            onChange={(color) => {
              setBlockPickerColor(color.hex);
            }}
          />
        </div>
      </div>
    </>

  );
}

export default Scene;
