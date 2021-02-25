import * as THREE from "three"

import Sketch from "../sketch"

import vertexShader from "./shaders/shader.vert"
import fragmentShader from "./shaders/shader.frag"

export default class BasicSketch extends Sketch {
  constructor(options) {
    super(options)
  }

  addObjects() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1, 32, 32)

    // Material
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      wireframe: false,

      // Particle aesthetics
      depthTest: false,
      depthWrite: false,

      blending: THREE.AdditiveBlending,

      uniforms: {
        uTime: { value: 0 },
      },
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  addGui() {
    this.gui.add(this.material, "wireframe")
  }

  updateUniforms(elapsedTime) {}
}

new BasicSketch({
  container: document.getElementById("webgl"),
})
