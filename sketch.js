import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "dat.gui"

export default class Sketch {
  constructor(options) {
    this.gui = new dat.GUI()

    const { container } = options

    this.container = container

    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      100
    )
    this.camera.position.set(0, 1, 2)
    this.scene.add(this.camera)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.container.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

    this.clock = new THREE.Clock()

    this.resize()
    window.addEventListener("resize", this.resize.bind(this))

    this.addObjects()
    this.addGui()
    this.render()
  }

  resize() {
    // Update sizes
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight

    // Update renderer
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update camera
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  addObjects() {}

  addGui() {}

  updateUniforms(elapsedTime) {}

  updateBufferAttributes(elapsedTime) {}

  render() {
    // Update controls
    this.controls.update()

    // Update time
    const elapsedTime = this.clock.getElapsedTime()
    this.time += elapsedTime

    // Update buffer attributes
    this.updateBufferAttributes(elapsedTime)

    // Update uniforms
    this.updateUniforms(elapsedTime)

    // Render
    this.renderer.render(this.scene, this.camera)

    requestAnimationFrame(this.render.bind(this))
  }

  get time() {
    return this.material?.uniforms?.uTime?.value
  }

  set time(value) {
    if (!this.material) {
      return
    }

    this.material.uniforms.uTime.value = value
  }
}
