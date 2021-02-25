#define PI 3.141592653589793238462643383279

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

uniform float uTime;

varying vec2 vUv;

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Basic perlin noise
  modelPosition.z += 0.1 * cnoise3(vec3(modelPosition.x * 4.0, modelPosition.y * 4.0 + uTime * 0.5, 0.0));
  
  // Basic sin curve
  // modelPosition.z += 0.1 * sin((modelPosition.x + 0.25 + uTime * 0.3) * PI * 2.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
}