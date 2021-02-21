import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "dat.gui"
import vertexShader from "./shaders/particles.vert"
import fragmentShader from "./shaders/particles.frag"

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

const parameters = {}

// Canvas
const canvas = document.getElementById("webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Meshes and Particles
 */
// Geometry
const geometry = new THREE.BufferGeometry()

/**
 * Buffer geometry attributes
 */
const segments = 32
const allSegments = 32 * 32

const positions = new THREE.BufferAttribute(
  new Float32Array(allSegments * 3),
  3
)
const opacities = new THREE.BufferAttribute(new Float32Array(allSegments), 1)

let index = 0
for (let i = 0; i < segments; i++) {
  for (let j = 0; j < segments; j++) {
    positions.setXYZ(index, i / segments - 0.5, j / segments - 0.5, 0)
    opacities.setX(index, Math.random())
    index += 1
  }
}

geometry.setAttribute("position", positions)
geometry.setAttribute("aOpacity", opacities)

// Material
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent: true,
  wireframe: false,

  // Particle aesthetics
  depthTest: true,
  depthWrite: true,

  blending: THREE.AdditiveBlending,

  uniforms: {
    uTime: { value: 0 },
    uSize: { value: 10.0 },
  },
})

gui.add(material, "wireframe")
gui.add(material.uniforms.uSize, "value").min(1.0).max(50.0).step(1.0)

const mesh = new THREE.Points(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.set(0, 1, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

/**
 * Animation
 */
const updateBufferAttributes = (elapsedTime) => {
  // const attributeOpacities = geometry.attributes.aOpacity.array
  // for (let i = 0; i < segments * segments; i++) {
  // Do something
  // }
  // geometry.attributes.aOpacity.needsUpdate = true
}

const tick = () => {
  // Update controls
  controls.update()

  // Update uniforms
  const elapsedTime = clock.getElapsedTime()
  material.uniforms.uTime.value = elapsedTime

  updateBufferAttributes(elapsedTime)

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
