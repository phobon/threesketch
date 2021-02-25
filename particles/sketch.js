import * as THREE from "three"

import Sketch from "../sketch"

import vertexShader from "./shaders/particles.vert"
import fragmentShader from "./shaders/particles.frag"

export default class ParticlesSketch extends Sketch {
  constructor(options) {
    super(options)
  }

  addObjects() {
    // Geometry
    this.geometry = new THREE.BufferGeometry()

    // Buffer geometry attributes
    const segments = 32
    const allSegments = 32 * 32

    const positions = new THREE.BufferAttribute(
      new Float32Array(allSegments * 3),
      3
    )
    const opacities = new THREE.BufferAttribute(
      new Float32Array(allSegments),
      1
    )

    let index = 0
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        positions.setXYZ(index, i / segments - 0.5, j / segments - 0.5, 0)
        opacities.setX(index, Math.random())
        index += 1
      }
    }

    this.geometry.setAttribute("position", positions)
    this.geometry.setAttribute("aOpacity", opacities)

    // Material
    this.material = new THREE.ShaderMaterial({
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

    const mesh = new THREE.Points(this.geometry, this.material)
    this.scene.add(mesh)
  }

  addGui() {
    this.gui.add(this.material, "wireframe")
    this.gui
      .add(this.material.uniforms.uSize, "value")
      .min(1.0)
      .max(50.0)
      .step(1.0)
  }

  updateBufferAttributes(elapsedTime) {
    // const attributeOpacities = geometry.attributes.aOpacity.array
    // for (let i = 0; i < segments * segments; i++) {
    // Do something
    // }
    // geometry.attributes.aOpacity.needsUpdate = true
  }

  updateUniforms(elapsedTime) {}
}

new ParticlesSketch({
  container: document.getElementById("webgl"),
})
