import React, { useState, useEffect } from "react"
import * as THREE from 'three'
import Sine from "gsap";
import TweenMax from "gsap";
import { useFrame } from '@react-three/fiber'
import { map, distance } from '../utils/helpers';



export default function RainWater() {

  const waterMesh = React.useRef();
  const [waterDropPositions,] = useState([
    { x: 13, z: 23 },
    { x: 1, z: -13 },
    { x: -2, z: 4 },
    { x: 10, z: -3 },
    { x: 1, z: -3 },
    { x: 2, z: -3 },
    { x: -1.2, z: 3 },
    { x: 1.2, z: 3.5 },
    { x: -1, z: 8 },
    { x: 12, z: 13 },
  ])
  const [pause, setPause] = useState(null)
  const [meshes, setMeshes] = useState([]);
  const [ripple, setRipple] = useState({})
  const [angle, setAngle] = useState(0)
  const [radius, setRadius] = useState(1)
  const [motion, setMotion] = useState(0)

  const grid = { cols: 50, rows: 50 };
  const velocity = -.2;
  const waveLength = 300;
  const gutter = { size: 0 }



  const getRandomWaterDropPosition = () => {
    return waterDropPositions[Math.floor(Math.random() * Math.floor(waterDropPositions.length))];
  }

  const addFloor = () => {
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.ShadowMaterial({ opacity: 0.3 });
    let floor = new THREE.Mesh(geometry, material);
    floor.name = 'floor';
    floor.position.y = -1;
    floor.rotateX(- Math.PI / 2);
    floor.receiveShadow = true;
    waterMesh.current.add(floor);
  }


  const addWaterDrop = () => {
    if (waterMesh.current) {
      const geometry = new THREE.BoxGeometry(0.05, 1, 0.05);
      // const geometry = new THREE.BoxBufferGeometry(0.05, .3, 0.05);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x333399, transparent: true });
      const waterDrop = new THREE.Mesh(geometry, material);
      return waterDrop;
    }
  }
  const getMesh = (geometry, material) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  const createGrid = () => {
    const groupMesh = new THREE.Object3D();
    const meshParams = {
      color: 0xffffff,
      emissive: 0x333399,
      metalness: 0.5,
      opacity: 0.1,
      transparent: true
    };

    const material = new THREE.MeshStandardMaterial(meshParams);
    let tempMesh = [...meshes]
    for (let row = 0; row < grid.rows; row++) {
      tempMesh[row] = [];
      for (let col = 0; col < grid.cols; col++) {
        const geometry = new THREE.BoxGeometry(1, .1, 1);
        const mesh = getMesh(geometry, material);
        mesh.position.y = -1;
        mesh.name = `cube-${row}-${col}`;
        const pivot = new THREE.Object3D();

        pivot.add(mesh);
        pivot.scale.set(1, 1, 1);
        pivot.position.set(col + (col * gutter.size), 0, row + (row * gutter.size));

        tempMesh[row][col] = pivot;
        groupMesh.add(pivot);
      }
    }
    setMeshes(tempMesh)
    const centerX = ((grid.cols) + ((grid.cols) * gutter.size)) * .4;
    const centerZ = ((grid.rows) + ((grid.rows) * gutter.size)) * .6;
    groupMesh.position.set(-centerX, 1, -centerZ);
    waterMesh.current.add(groupMesh);
  }

  const draw = () => {
    let tempMesh = [...meshes];
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        const dist = distance(col, row, ripple.x - waterMesh.current.children[0].position.x, ripple.z - waterMesh.current.children[0].position.z);
        if (dist < radius) {
          const offset = map(dist, 0, -waveLength, -100, 100);
          const updatedAngle = angle + offset;
          const y = map(Math.sin(updatedAngle), -1, 0, motion > 0 ? 0 : motion, 0);
          tempMesh[row][col].position.y = y;
        }
      }
    }
    const updatedAngle = angle - velocity * 1
    const updatedRadius = radius - velocity * 1
    const updatedMotion = motion - velocity / 8
    setAngle(updatedAngle)
    setRadius(updatedRadius)
    setMotion(updatedMotion);
  }
  useEffect(() => {
    if (waterMesh.current) {
      window.addEventListener('visibilitychange', (evt) => {
        setPause(evt.target.hidden);
      }, false);
      createGrid();
      addFloor();
    }
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      const waterDrop = addWaterDrop();
      const { x, z } = getRandomWaterDropPosition();

      waterDrop.position.set(x, 50, z);
      if (waterMesh.current) {
        waterMesh.current.add(waterDrop);
        if (pause) {
          waterMesh.current.remove(waterDrop);
          TweenMax.killAll(true);
        } else {
          TweenMax.to(waterDrop.position, 1, {
            ease: Sine.easeIn,
            y: -2,
            onUpdate: () => {
              if (waterDrop.position.y <= 1) {
                setRadius(1);
                setMotion(-1);
                setRipple({ x, z });
              }
            },
            onComplete: () => {
              waterDrop.position.set(0, 50, 0);
              waterMesh.current.remove(waterDrop);
            }
          });
        }
      }
    }, 1300);
    return () => clearInterval(interval);
  }, []);
  useFrame(() => {
    draw();
  })
  return (
    <group ref={waterMesh}>
    </group>
  );
}