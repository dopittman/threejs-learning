import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "dat.gui";

const sceneA = new THREE.Scene();
sceneA.background = new THREE.Color(0x123456);
// scene.background = new THREE.TextureLoader().load("https://sbcode.net/img/grid.png");
sceneA.background = new THREE.CubeTextureLoader().setPath("https://sbcode.net/img/").load([
  "px.jpg",
  "nx.jpg",
  "py.jpg",
  "ny.jpg",
  "pz.jpg",
  "nz.jpg",
]);
sceneA.backgroundBlurriness = 0.02;


const sceneB = new THREE.Scene();
sceneB.background = new THREE.Color(0x123456);
sceneB.backgroundBlurriness = 0.02;
sceneB.background = new THREE.TextureLoader().load("https://sbcode.net/img/grid.png");

const sceneC = new THREE.Scene();
sceneC.background = new THREE.Color(0x123456);
sceneC.backgroundBlurriness = 0.02;


let activeScene = sceneA;
const setScene = {
  sceneA: function () {
    activeScene = sceneA;
  },
  sceneB: function () {
    activeScene = sceneB;
  },
  sceneC: function () {
    activeScene = sceneC;
  },
};

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const stats = new Stats();
// stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });

const cube = new THREE.Mesh(geometry, material);
sceneA.add(cube);

const gui = new GUI();

gui.add(setScene, "sceneA").name("Scene A");
gui.add(setScene, "sceneB").name("Scene B");
gui.add(setScene, "sceneC").name("Scene C");

const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.position, "z", 0, Math.PI * 2);
cubeFolder.open();

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "x", 0, Math.PI * 2);
cameraFolder.add(camera.position, "y", 0, Math.PI * 2);
cameraFolder.add(camera.position, "z", 0, Math.PI * 2);
cameraFolder.open();

new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  stats.update();
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(activeScene, camera);
}

animate();
