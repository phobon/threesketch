#define PI 3.141592653589793238462643383279;

uniform float uTime;

uniform float uSize;

varying vec2 vUv;
varying float vOpacity;

attribute float aOpacity;

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  // Point size attenuation
  gl_PointSize = uSize * (1.0 / -viewPosition.z);

  // Projected position
  gl_Position = projectedPosition;

  vUv = uv;
  vOpacity = aOpacity;
}