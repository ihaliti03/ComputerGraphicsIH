import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const loader = new THREE.TextureLoader();
const woodTexture = loader.load('textures/Stylized_Wood_Floor_001_basecolor.png');
const stoneTexture = loader.load('textures/Stylized_Stone_Floor_010_basecolor.png');

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  new THREE.MeshStandardMaterial({ map: woodTexture })
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.7, 0.3, 30, 100),
  new THREE.MeshStandardMaterial({ map: woodTexture })
);

scene.add(sphere);

let currentShape = sphere;
let currentTexture = 'wood';

function switchShape() {
  scene.remove(currentShape);
  currentShape = currentShape === sphere ? torus : sphere;
  scene.add(currentShape);
}

function switchTexture(texture) {
  const tex = texture === 'wood' ? woodTexture : stoneTexture;
  currentShape.material.map = tex;
  currentShape.material.needsUpdate = true;
  currentTexture = texture;
}

window.addEventListener('keydown', (e) => {
  if (e.key === ' ') switchShape();           // Space toggles shape
  if (e.key.toLowerCase() === 'w') switchTexture('wood'); 
  if (e.key.toLowerCase() === 's') switchTexture('stone'); 
});

function animate() {
  requestAnimationFrame(animate);
  currentShape.rotation.x += 0.01;
  currentShape.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();