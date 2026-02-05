/* ============================================
   3D BACKGROUND EFFECTS WITH THREE.JS
   ============================================ */

// Initialize 3D background when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  init3DBackground();
  addParallaxEffect();
  addScrollAnimations();
});

function init3DBackground() {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    // Fallback to CSS animation if Three.js not available
    createCSSFallback(container);
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Create floating particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 150;
  const posArray = new Float32Array(particleCount * 3);
  const colorsArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Position
    posArray[i] = (Math.random() - 0.5) * 20;
    posArray[i + 1] = (Math.random() - 0.5) * 20;
    posArray[i + 2] = (Math.random() - 0.5) * 20;

    // Colors - gradient from blue to purple
    const colorRatio = Math.random();
    colorsArray[i] = 0.4 + colorRatio * 0.3;     // R
    colorsArray[i + 1] = 0.5 + colorRatio * 0.2; // G
    colorsArray[i + 2] = 0.9;                     // B
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Create floating geometric shapes
  const geometries = [];
  const shapes = [];

  // Create floating cubes
  for (let i = 0; i < 8; i++) {
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const material = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x667eea : 0x764ba2,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    const cube = new THREE.Mesh(geometry, material);
    
    cube.position.x = (Math.random() - 0.5) * 15;
    cube.position.y = (Math.random() - 0.5) * 15;
    cube.position.z = (Math.random() - 0.5) * 10 - 5;
    
    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;
    
    cube.userData = {
      rotSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01
      },
      floatSpeed: Math.random() * 0.002 + 0.001,
      floatOffset: Math.random() * Math.PI * 2
    };
    
    scene.add(cube);
    shapes.push(cube);
  }

  // Create floating spheres
  for (let i = 0; i < 5; i++) {
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x4facfe,
      transparent: true,
      opacity: 0.2,
      wireframe: true
    });
    const sphere = new THREE.Mesh(geometry, material);
    
    sphere.position.x = (Math.random() - 0.5) * 12;
    sphere.position.y = (Math.random() - 0.5) * 12;
    sphere.position.z = (Math.random() - 0.5) * 8 - 3;
    
    sphere.userData = {
      rotSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02
      },
      floatSpeed: Math.random() * 0.003 + 0.001,
      floatOffset: Math.random() * Math.PI * 2
    };
    
    scene.add(sphere);
    shapes.push(sphere);
  }

  camera.position.z = 5;

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
  });

  // Animation loop
  let animationId;
  const clock = new THREE.Clock();

  function animate() {
    animationId = requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();

    // Smooth camera movement
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Animate particles
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Animate shapes
    shapes.forEach((shape, index) => {
      // Rotation
      shape.rotation.x += shape.userData.rotSpeed.x;
      shape.rotation.y += shape.userData.rotSpeed.y;
      
      // Floating motion
      shape.position.y += Math.sin(elapsedTime * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.002;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
  });
}

// CSS fallback for when Three.js is not available
function createCSSFallback(container) {
  container.innerHTML = `
    <div class="css-3d-fallback">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
    </div>
    <style>
      .css-3d-fallback {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
      }
      
      .floating-shape {
        position: absolute;
        border: 2px solid rgba(102, 126, 234, 0.3);
        animation: float-shape 20s infinite ease-in-out;
      }
      
      .shape-1 {
        width: 100px;
        height: 100px;
        top: 20%;
        left: 10%;
        animation-delay: 0s;
      }
      
      .shape-2 {
        width: 150px;
        height: 150px;
        top: 60%;
        right: 15%;
        animation-delay: -5s;
        border-color: rgba(118, 75, 162, 0.3);
      }
      
      .shape-3 {
        width: 80px;
        height: 80px;
        bottom: 30%;
        left: 20%;
        animation-delay: -10s;
        border-color: rgba(79, 172, 254, 0.3);
        border-radius: 50%;
      }
      
      .shape-4 {
        width: 120px;
        height: 120px;
        top: 40%;
        right: 30%;
        animation-delay: -15s;
        border-radius: 50%;
      }
      
      @keyframes float-shape {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-30px) rotate(90deg);
        }
        50% {
          transform: translateY(0) rotate(180deg);
        }
        75% {
          transform: translateY(30px) rotate(270deg);
        }
      }
      
      .gradient-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.5;
        animation: pulse-orb 8s infinite ease-in-out;
      }
      
      .orb-1 {
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%);
        top: -100px;
        left: -100px;
      }
      
      .orb-2 {
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(118, 75, 162, 0.3) 0%, transparent 70%);
        bottom: -150px;
        right: -100px;
        animation-delay: -4s;
      }
      
      @keyframes pulse-orb {
        0%, 100% {
          transform: scale(1);
          opacity: 0.5;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.7;
        }
      }
    </style>
  `;
}

// Add parallax scrolling effect
function addParallaxEffect() {
  const sections = document.querySelectorAll('.section');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    sections.forEach((section, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed);
      section.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Add scroll-triggered animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe topic cards
  document.querySelectorAll('.topic-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(card);
  });

  // Observe subsections
  document.querySelectorAll('.subsection').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(section);
  });
}

// Utility function for smooth scroll
defineSmoothScroll();

function defineSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Add hover tilt effect to cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
});

function handleMouseMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
}

function handleMouseLeave(e) {
  const card = e.currentTarget;
  card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
}
