/**
 * SEE English Learning Hub - 3D Background Effects
 */

document.addEventListener('DOMContentLoaded', function() {
  init3DBackground();
});

function init3DBackground() {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') {
    createCSSFallback(container);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 100;
  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x667eea,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Floating shapes
  const shapes = [];
  for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const material = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x667eea : 0x764ba2,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10 - 5
    );
    cube.userData = {
      rotSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01
      }
    };
    scene.add(cube);
    shapes.push(cube);
  }

  camera.position.z = 5;

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
  });

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;

    shapes.forEach(shape => {
      shape.rotation.x += shape.userData.rotSpeed.x;
      shape.rotation.y += shape.userData.rotSpeed.y;
    });

    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function createCSSFallback(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="css-fallback">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
    </div>
    <style>
      .css-fallback {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
      }
      .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.5;
      }
      .orb-1 {
        width: 400px;
        height: 400px;
        background: rgba(102, 126, 234, 0.4);
        top: -100px;
        left: -100px;
        animation: float 8s ease-in-out infinite;
      }
      .orb-2 {
        width: 500px;
        height: 500px;
        background: rgba(118, 75, 162, 0.3);
        bottom: -150px;
        right: -100px;
        animation: float 8s ease-in-out infinite 4s;
      }
      @keyframes float {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(30px, -30px); }
      }
    </style>
  `;
}
