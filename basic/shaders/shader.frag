#define PI 3.141592653589793238462643383279;

uniform float uTime;

varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vec3(vUv, 1.0), 1.0);
}