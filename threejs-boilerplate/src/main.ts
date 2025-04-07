import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000) // 75 is the field of view, 2 is the aspect ratio, 0.1 is the near clipping plane, 1000 is the far clipping plane
camera.position.z = 1.5

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true }) // antialias is used to make the edges of the cube look smoother
renderer.setSize(400, 200)

// Below is not needed because we are using a canvas element
// document.body.appendChild(renderer.domElement)

// Below is not needed because we are setting the size manually with the canvas element and the PerspectiveCamera
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()
//   renderer.setSize(window.innerWidth, window.innerHeight)
// })

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}

animate()