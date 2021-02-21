#define PI 3.141592653589793238462643383279;

uniform float uTime;

varying vec2 vUv;
varying float vOpacity;

void main() {
  // Generate uv this point
  vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);

  // Centre point uv
  vec2 cUv = 2.0 * uv - 1.0;

  // Handle opacity
  vec4 color = vec4(uv, 1.0, 1.0) * vOpacity;
  color.a = min(1.0, color.a);

  gl_FragColor = color;
}