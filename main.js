/* ══ PRELOADER ══════════════════════════════════ */
document.body.style.overflow = 'hidden';
const preNum = document.getElementById('preNum');
const prePct = document.getElementById('prePct');
const prBar = document.getElementById('pre-bar');
let pct = 0, done = false;
const iv = setInterval(() => {
  const inc = Math.random() * 10 + 2;
  pct = Math.min(pct + inc, 100);
  const r = Math.round(pct);
  preNum.textContent = r;
  prePct.textContent = r + '%';
  prBar.style.width = pct + '%';
  if (pct >= 100 && !done) {
    done = true; clearInterval(iv);
    setTimeout(() => {
      document.getElementById('pre').classList.add('done');
      document.body.style.overflow = 'auto';
      if (window.spawnPlanet) window.spawnPlanet();
    }, 300);
  }
}, 85);

/* ══ CURSOR ══════════════════════════════════════ */
const cur = document.getElementById('cur'), curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px' });
(function loop() { rx += (mx - rx) * .09; ry += (my - ry) * .09; curR.style.left = rx + 'px'; curR.style.top = ry + 'px'; requestAnimationFrame(loop) })();

/* ══ NAV SCROLL ══════════════════════════════════ */
window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('sc', scrollY > 50), { passive: true });


/* ══ COSMIC TOUR (THREE.JS + GSAP) ══════════════ */
document.addEventListener("DOMContentLoaded", initCosmicTour);

function initCosmicTour() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined' || typeof gsap === 'undefined') {
    setTimeout(initCosmicTour, 100);
    return;
  }

  const scene = new THREE.Scene();
  // Fog removed because it causes solid black silhouettes against the beautiful space image
  // scene.fog = null;

  // Increased the far plane to 25000 so the enormous background sphere doesn't get clipped!
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 25000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 1. Starfield (Sparse for subtle parallax)
  const starsGeo = new THREE.BufferGeometry();
  const starsPos = [];
  for (let i = 0; i < 1200; i++) {
    starsPos.push((Math.random() - 0.5) * 5000, (Math.random() - 0.5) * 5000, 1000 - Math.random() * 8000);
  }
  starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starsPos, 3));
  const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.0, transparent: true, opacity: 0.4, fog: false });
  const starField = new THREE.Points(starsGeo, starsMat);
  scene.add(starField);

  const ambient = new THREE.AmbientLight(0xffffff, 0.15);
  scene.add(ambient);

  // Cinematic directional lighting (acts like a distant sun)
  const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
  sunLight.position.set(800, 500, 1000);
  scene.add(sunLight);

  // Deep Space Nebula Background Sphere (Photorealistic Image)
  const textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = "Anonymous";
  // High-res deep space nebula image from Unsplash
  const spaceImgUrl = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop';
  const bgTex = textureLoader.load(spaceImgUrl);

  const bgGeo = new THREE.SphereGeometry(12000, 64, 64);
  const bgMat = new THREE.MeshBasicMaterial({
    map: bgTex,
    side: THREE.BackSide,
    fog: false,
    transparent: true,
    opacity: 0.8 // High opacity for a vivid space background
  });
  const bgSphere = new THREE.Mesh(bgGeo, bgMat);
  bgSphere.position.set(0, 0, -3000); // Encompasses the entire 6000-unit journey
  scene.add(bgSphere);

  const cosmos = new THREE.Group();
  scene.add(cosmos);

  // Obj 1: Home Planet (Hero)
  const p1Group = new THREE.Group();
  let targetPlanetX = 0;
  let isPlanetSpawned = false;

  const updatePlanetPos = () => {
    const vFov = camera.fov * Math.PI / 180;
    const vHeight = 2 * Math.tan(vFov / 2) * 300;
    const vWidth = vHeight * camera.aspect;
    targetPlanetX = vWidth / 2;
    if (isPlanetSpawned) {
      p1Group.position.x = targetPlanetX;
    }
  };
  updatePlanetPos();

  // Set up for swoop animation
  p1Group.position.set(targetPlanetX + 800, 300, -1500);
  p1Group.rotation.set(0.5, 0.5, 0);

  window.spawnPlanet = () => {
    gsap.to(p1Group.position, {
      x: targetPlanetX,
      y: -10,
      z: 0,
      duration: 3,
      ease: "power3.out",
      delay: 0.1
    });
    gsap.to(p1Group.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 3.2,
      ease: "power3.out",
      delay: 0.1,
      onComplete: () => { isPlanetSpawned = true; }
    });
  };
  const texLoader = new THREE.TextureLoader();
  texLoader.crossOrigin = "Anonymous";

  // High-resolution procedural gas giant texture (solves the black mapping artifact from flat photos)
  const createSaturnTexture = () => {
    const cvs = document.createElement('canvas');
    cvs.width = 1024; cvs.height = 512;
    const ctx = cvs.getContext('2d');
    // Base color
    ctx.fillStyle = '#d2b48c';
    ctx.fillRect(0, 0, 1024, 512);
    // Draw 400 horizontal bands
    const colors = ['rgba(139, 69, 19, ', 'rgba(218, 165, 32, ', 'rgba(244, 164, 96, ', 'rgba(255, 248, 220, '];
    for (let i = 0; i < 400; i++) {
      const y = Math.random() * 512;
      const h = 1 + Math.random() * 6;
      const op = Math.random() * 0.5;
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)] + op + ')';
      ctx.fillRect(0, y, 1024, h);
    }
    // Add subtle noise
    for (let i = 0; i < 10000; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.05})`;
      ctx.fillRect(Math.random() * 1024, Math.random() * 512, 2, 2);
    }
    return new THREE.CanvasTexture(cvs);
  };

  const planetGeo = new THREE.SphereGeometry(120, 64, 64);
  const planetMat = new THREE.MeshStandardMaterial({
    map: createSaturnTexture(),
    roughness: 0.7,
    metalness: 0.1
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  p1Group.add(planet);

  // Create majestic, realistic Saturn rings using a generated gradient map for the icy dust lanes
  const createRingTexture = () => {
    const cvs = document.createElement('canvas');
    cvs.width = 1024; cvs.height = 4;
    const ctx = cvs.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 1024, 0);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.1, 'rgba(210, 190, 150, 0.4)');
    grad.addColorStop(0.3, 'rgba(230, 210, 180, 0.8)');
    grad.addColorStop(0.32, 'transparent'); // Cassini division
    grad.addColorStop(0.38, 'transparent');
    grad.addColorStop(0.4, 'rgba(200, 180, 140, 0.9)');
    grad.addColorStop(0.7, 'rgba(180, 160, 120, 0.6)');
    grad.addColorStop(0.9, 'rgba(150, 130, 100, 0.2)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 4);
    return new THREE.CanvasTexture(cvs);
  };

  const ringGeo = new THREE.RingGeometry(150, 320, 128);
  // Adjust UVs so the linear texture maps radially across the ring
  const pos = ringGeo.attributes.position;
  const uvs = ringGeo.attributes.uv;
  for (let i = 0; i < uvs.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const radius = Math.sqrt(x * x + y * y);
    const u = (radius - 150) / (320 - 150);
    uvs.setXY(i, u, 0.5);
  }

  const ringMat = new THREE.MeshStandardMaterial({
    map: createRingTexture(),
    color: 0xffffff,
    transparent: true,
    side: THREE.DoubleSide,
    roughness: 0.8
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.1;
  ring.rotation.y = Math.PI / 12;
  p1Group.add(ring);

  // Warm sunlight bounce
  const pLight = new THREE.PointLight(0xffeebb, 0.6, 1200);
  pLight.position.set(-200, 100, 200);
  p1Group.add(pLight);

  cosmos.add(p1Group);

  // Soft glow texture for photorealistic volumetric gas and accretion disks
  const createGlowTex = () => {
    const cvs = document.createElement('canvas');
    cvs.width = 64; cvs.height = 64;
    const ctx = cvs.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(cvs);
  };
  const glowTex = createGlowTex();

  // Obj 2: Pulsar / Cosmic Burst (About)
  const auroraGroup = new THREE.Group(); // Keep variable name auroraGroup so fadeObj loop doesn't break
  auroraGroup.position.set(400, 100, -1500);

  // 3D Satellite Model using high-quality textures (replaces pulsar)
  const satGroup = new THREE.Group();

  // Fully procedural satellite body texture: gold thermal foil (MLI blanket look)
  const createSatelliteBodyTex = () => {
    const cvs = document.createElement('canvas');
    cvs.width = 512; cvs.height = 512;
    const ctx = cvs.getContext('2d');
    // Base gold MLI foil
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#c8922a');
    grad.addColorStop(0.3, '#f0c040');
    grad.addColorStop(0.5, '#e8b030');
    grad.addColorStop(0.7, '#ffd060');
    grad.addColorStop(1, '#b07820');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    // Wrinkle lines characteristic of thermal blankets
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 80; i++) {
      const y = Math.random() * 512;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y + (Math.random() - 0.5) * 30); ctx.stroke();
    }
    // Specular hotspot
    const sp = ctx.createRadialGradient(150, 150, 0, 150, 150, 200);
    sp.addColorStop(0, 'rgba(255,255,200,0.35)');
    sp.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sp; ctx.fillRect(0, 0, 512, 512);
    return new THREE.CanvasTexture(cvs);
  };

  // Fully procedural solar panel texture: deep blue cells with silver grid
  const createSolarPanelTex = () => {
    const cvs = document.createElement('canvas');
    cvs.width = 256; cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = '#1a2a5a'; ctx.fillRect(0, 0, 256, 64);
    // Cell grid
    ctx.strokeStyle = 'rgba(100,160,255,0.4)'; ctx.lineWidth = 1;
    for (let x = 0; x < 256; x += 16) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 64); ctx.stroke(); }
    for (let y = 0; y < 64; y += 16) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke(); }
    // Subtle reflective sheen
    const sh = ctx.createLinearGradient(0, 0, 0, 64);
    sh.addColorStop(0, 'rgba(100,180,255,0.15)'); sh.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sh; ctx.fillRect(0, 0, 256, 64);
    return new THREE.CanvasTexture(cvs);
  };

  // Satellite Body
  const bodyGeo = new THREE.CylinderGeometry(15, 15, 50, 16);
  const bodyMat = new THREE.MeshStandardMaterial({ map: createSatelliteBodyTex(), metalness: 0.7, roughness: 0.3 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  satGroup.add(body);

  // Solar Panels
  const panelGeo = new THREE.BoxGeometry(160, 2, 30);
  const panelMat = new THREE.MeshStandardMaterial({ map: createSolarPanelTex(), metalness: 0.5, roughness: 0.4, color: 0x8899ff });
  const panel = new THREE.Mesh(panelGeo, panelMat);
  satGroup.add(panel);

  // Communication Dish
  const dishGeo = new THREE.SphereGeometry(14, 16, 16, 0, Math.PI * 2, 0, Math.PI / 3);
  const dishMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.5, roughness: 0.5, side: THREE.DoubleSide });
  const dish = new THREE.Mesh(dishGeo, dishMat);
  dish.position.y = 25;
  dish.rotation.x = Math.PI; // point out
  satGroup.add(dish);

  // Dish Antenna Spike
  const spikeGeo = new THREE.CylinderGeometry(0.5, 0.5, 20);
  const spikeMat = new THREE.MeshBasicMaterial({ color: 0x888888 });
  const spike = new THREE.Mesh(spikeGeo, spikeMat);
  spike.position.y = 35;
  satGroup.add(spike);

  // Blinking Red Light
  const lightGeo = new THREE.SphereGeometry(2, 8, 8);
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const blinkLight = new THREE.Mesh(lightGeo, lightMat);
  blinkLight.position.y = 45;
  blinkLight.name = 'blinkLight';
  satGroup.add(blinkLight);

  satGroup.scale.set(4, 4, 4);
  satGroup.rotation.z = Math.PI / 6;
  satGroup.rotation.x = Math.PI / 8;
  auroraGroup.add(satGroup);

  // Ensure we have a light source for the StandardMaterials to show up!
  const dirLight = new THREE.DirectionalLight(0xffffff, 2);
  dirLight.position.set(100, 200, 300);
  auroraGroup.add(dirLight);
  const ambLight = new THREE.AmbientLight(0x404040, 1.5);
  auroraGroup.add(ambLight);

  // Save meshes to variables we already have animated to save rewriting the animate loop
  const aurora = satGroup;
  const aurora2 = blinkLight;

  cosmos.add(auroraGroup);

  // Obj 3: Spiral Galaxy (Interests)
  const nebulaGroup = new THREE.Group(); // Keeping variable name for consistency
  nebulaGroup.position.set(-300, -150, -3000);

  const galGeo = new THREE.BufferGeometry();
  const galPos = [];
  const galCol = [];

  const arms = 4;
  const particlesPerArm = 1000;
  const coreParticles = 800;

  const gColCore = new THREE.Color(0xffddaa); // Warm yellow/white core
  const gColArm = new THREE.Color(0x4466ff); // Blue arms
  const gColDust = new THREE.Color(0xaa44aa); // Purple interstellar dust

  // Generate Galactic Core
  for (let i = 0; i < coreParticles; i++) {
    const radius = Math.pow(Math.random(), 2) * 120;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    galPos.push(
      radius * Math.sin(phi) * Math.cos(theta),
      (Math.random() - 0.5) * 40 * (1 - radius / 120), // Flattened core
      radius * Math.sin(phi) * Math.sin(theta)
    );
    galCol.push(gColCore.r, gColCore.g, gColCore.b);
  }

  // Generate Spiral Arms
  for (let i = 0; i < arms; i++) {
    const armOffset = (Math.PI * 2 / arms) * i;
    for (let j = 0; j < particlesPerArm; j++) {
      const radius = 60 + Math.random() * 800;
      const spin = radius * 0.015; // The further out, the more it spins (creates the spiral)
      const randomOffset = (Math.random() - 0.5) * 60 * (1 - radius / 1000);
      const angle = armOffset + spin + (Math.random() - 0.5) * 0.4;

      galPos.push(
        Math.cos(angle) * radius + randomOffset,
        (Math.random() - 0.5) * (20 + radius * 0.05), // disk thickness
        Math.sin(angle) * radius + randomOffset
      );

      const c = Math.random() > 0.3 ? gColArm : gColDust;
      galCol.push(c.r, c.g, c.b);
    }
  }

  galGeo.setAttribute('position', new THREE.Float32BufferAttribute(galPos, 3));
  galGeo.setAttribute('color', new THREE.Float32BufferAttribute(galCol, 3));

  const galMat = new THREE.PointsMaterial({
    vertexColors: true,
    size: 15,
    map: glowTex,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const nebula = new THREE.Points(galGeo, galMat); // named nebula so animate() continues to rotate it

  // Tilt the galaxy for a cinematic isometric view
  nebula.rotation.x = Math.PI / 2.5;
  nebula.rotation.y = Math.PI / 8;

  nebulaGroup.add(nebula);
  cosmos.add(nebulaGroup);

  // Obj 4: Comet Shower (What I do)
  const starGroup = new THREE.Group(); // Keeping variable name for consistency
  starGroup.position.set(350, 250, -4200); // Moved slightly closer

  const cometsData = []; // Store data for animation

  // Create 6 massive fiery comets
  for (let i = 0; i < 6; i++) {
    const cometGroup = new THREE.Group();

    // The intensely hot white/yellow head
    const headGeo = new THREE.SphereGeometry(4, 16, 16);
    const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const head = new THREE.Mesh(headGeo, headMat);
    cometGroup.add(head);

    // The glowing optical flare around the head
    const flareMat = new THREE.SpriteMaterial({ map: glowTex, color: 0xffaa33, transparent: true, blending: THREE.AdditiveBlending, opacity: 1 });
    const flare = new THREE.Sprite(flareMat);
    flare.scale.set(50, 50, 1);
    cometGroup.add(flare);

    // The fiery tail (Outer layer)
    const tailGeo1 = new THREE.CylinderGeometry(0, 10, 150, 16);
    tailGeo1.translate(0, 75, 0);
    tailGeo1.rotateX(Math.PI / 2); // point along Z axis
    const tailMat1 = new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
    const tail1 = new THREE.Mesh(tailGeo1, tailMat1);
    cometGroup.add(tail1);

    // The fiery tail (Inner hot core)
    const tailGeo2 = new THREE.CylinderGeometry(0, 4, 80, 16);
    tailGeo2.translate(0, 40, 0);
    tailGeo2.rotateX(Math.PI / 2);
    const tailMat2 = new THREE.MeshBasicMaterial({ color: 0xffdd00, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const tail2 = new THREE.Mesh(tailGeo2, tailMat2);
    cometGroup.add(tail2);

    // Randomize starting positions in a large bounding box
    cometGroup.position.set(
      (Math.random() - 0.5) * 600,
      (Math.random() - 0.5) * 600,
      (Math.random() - 0.5) * 600
    );

    // Target direction (falling diagonally down-left towards camera)
    const targetDir = new THREE.Vector3(-1, -0.8, 1).normalize();
    targetDir.x += (Math.random() - 0.5) * 0.2;
    targetDir.y += (Math.random() - 0.5) * 0.2;
    targetDir.normalize();

    // Make the tail point AWAY from the direction of travel
    // The tail points along +Z, so we look at position minus the direction
    cometGroup.lookAt(cometGroup.position.clone().sub(targetDir));

    starGroup.add(cometGroup);

    // Save for animation loop
    cometsData.push({
      mesh: cometGroup,
      dir: targetDir,
      speed: 2 + Math.random() * 3, // very fast
      origPos: cometGroup.position.clone()
    });
  }

  const cLight = new THREE.PointLight(0xffaa55, 3, 1500);
  starGroup.add(cLight);
  cosmos.add(starGroup);

  // Save globally so the animate loop can update them
  window.cometsData = cometsData;

  // Empty dummy variables to prevent errors in animate() since we deleted the star
  const bStar = new THREE.Group();
  const corona = new THREE.Group();

  // Obj 5: Black Hole (Timeline)
  const bhGroup = new THREE.Group();
  bhGroup.position.set(-200, -100, -6000);

  // The event horizon sphere to block background stars
  const bhGeo = new THREE.SphereGeometry(65, 64, 64);
  const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const blackhole = new THREE.Mesh(bhGeo, bhMat);
  bhGroup.add(blackhole);

  // Procedural M87 Black Hole texture (guarantees no missing-texture black boxes)
  const createBlackHoleTex = () => {
    const cvs = document.createElement('canvas');
    cvs.width = 512; cvs.height = 512;
    const ctx = cvs.getContext('2d');
    const grad = ctx.createRadialGradient(256, 256, 30, 256, 256, 240);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.2, 'rgba(0,0,0,0)');
    grad.addColorStop(0.3, 'rgba(255, 180, 50, 1)'); // Bright orange inner ring
    grad.addColorStop(0.6, 'rgba(200, 40, 0, 0.8)'); // Deep red outer ring
    grad.addColorStop(1, 'rgba(0,0,0,0)'); // Fade to transparent
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Add uneven glowing Doppler beaming (brighter on one side)
    ctx.fillStyle = 'rgba(255, 255, 150, 0.5)';
    ctx.filter = 'blur(15px)';
    ctx.beginPath();
    ctx.arc(220, 180, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(300, 360, 60, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(cvs);
  };

  const bhSpriteMat = new THREE.SpriteMaterial({
    map: createBlackHoleTex(),
    color: 0xffffff,
    blending: THREE.AdditiveBlending,
    transparent: true
  });
  const bhSprite = new THREE.Sprite(bhSpriteMat);
  bhSprite.scale.set(380, 380, 1);
  bhGroup.add(bhSprite);

  // Accretion disk — colors match the bhSprite: white core → orange → deep red
  const diskGeo = new THREE.BufferGeometry();
  const diskPos = [];
  const diskCol = [];
  const dColWhite = new THREE.Color(0xffffff);
  const dColOrange = new THREE.Color(0xff8c28);
  const dColRed = new THREE.Color(0xcc2800);
  for (let i = 0; i < 2500; i++) {
    const radius = 75 + Math.pow(Math.random(), 1.5) * 160;
    const theta = Math.random() * Math.PI * 2;
    // Thin disk, slight warp for depth
    const yOff = (Math.random() - 0.5) * 4;
    diskPos.push(Math.cos(theta) * radius, yOff, Math.sin(theta) * radius);
    let c;
    if (radius < 100) c = dColWhite;
    else if (radius < 150) c = dColOrange;
    else c = dColRed;
    diskCol.push(c.r, c.g, c.b);
  }
  diskGeo.setAttribute('position', new THREE.Float32BufferAttribute(diskPos, 3));
  diskGeo.setAttribute('color', new THREE.Float32BufferAttribute(diskCol, 3));
  const diskMat = new THREE.PointsMaterial({ vertexColors: true, size: 5, map: glowTex, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
  const disk = new THREE.Points(diskGeo, diskMat);
  disk.rotation.x = Math.PI * 0.08; // Slight tilt so it's visible as a disk, not edge-on
  bhGroup.add(disk);
  cosmos.add(bhGroup);

  // Spline Curve Path
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 300),         // Start (Hero)
    new THREE.Vector3(200, 50, -750),     // En route
    new THREE.Vector3(400, 100, -1200),   // Approach Aurora
    new THREE.Vector3(100, -25, -2250),   // En route
    new THREE.Vector3(-300, -150, -3000), // FLY DIRECTLY THROUGH THE GALAXY CORE
    new THREE.Vector3(25, 50, -3750),     // En route
    new THREE.Vector3(350, 250, -4200),   // Approach Star
    new THREE.Vector3(-200, -100, -5000), // Line up perfectly straight with the black hole
    new THREE.Vector3(-200, -100, -5700)  // Arrive precisely in front of it
  ]);

  gsap.registerPlugin(ScrollTrigger);
  const camObj = { progress: 0 };

  gsap.to(camObj, {
    progress: 1,
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
    },
    onUpdate: () => {
      // Clamp progress to slightly below 1 so lookPos never equals pos (which causes teleport bug)
      const p = Math.min(camObj.progress, 0.998);
      const pos = curve.getPoint(p);
      camera.position.copy(pos);

      if (camObj.progress > 0.93) {
        // Smoothly snap the camera to look EXACTLY at the center of the black hole tracking its bobbing motion
        const lookPos = curve.getPoint(p + 0.002);
        const factor = (camObj.progress - 0.93) / 0.07;
        lookPos.lerp(bhGroup.position, factor);
        camera.lookAt(lookPos);
      } else {
        const lookPos = curve.getPoint(p + 0.002);
        camera.lookAt(lookPos);
      }
    }
  });

  // Shooting Stars
  const shootingStars = [];
  const sStarGeo = new THREE.CylinderGeometry(0.1, 1.2, 50, 4);
  sStarGeo.rotateX(Math.PI / 2);
  const sStarMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });

  for (let i = 0; i < 15; i++) {
    const s = new THREE.Mesh(sStarGeo, sStarMat);
    s.position.set(0, 0, 10000); // hide initially
    scene.add(s);
    shootingStars.push({ mesh: s, velocity: new THREE.Vector3(), life: 999, maxLife: Math.random() * 200 + 100 });
  }

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Rotations
    planet.rotation.y = t * 0.1;
    ring.rotation.z = t * 0.05;
    // Satellite slow tumble and blink
    aurora.rotation.x = t * 0.05;
    aurora.rotation.y = t * 0.1;
    aurora2.material.opacity = Math.sin(t * 8) > 0 ? 1 : 0.2;
    aurora2.material.transparent = true;

    nebula.rotation.y = t * 0.08;
    bStar.rotation.y = t * 0.05;
    corona.rotation.y = t * -0.07;
    corona.rotation.z = t * 0.04;

    // Black hole is completely static as requested
    blackhole.rotation.y = 0;
    disk.rotation.z = 0;

    // Bobbing / Floating motion
    p1Group.position.y = -10 + Math.sin(t * 1.2) * 6;
    auroraGroup.position.y = 100 + Math.sin(t * 0.8 + 1) * 12;
    nebulaGroup.position.y = -150 + Math.sin(t * 1.5 + 2) * 8;
    starGroup.position.y = 250 + Math.sin(t * 1.0 + 3) * 10;
    bhGroup.position.y = -100 + Math.sin(t * 0.9 + 4) * 12;

    // Comet Shower Falling Animation
    if (window.cometsData) {
      window.cometsData.forEach(c => {
        c.mesh.position.addScaledVector(c.dir, c.speed);
        // If they fall too far, reset them to the opposite side of the bounding box to create an infinite loop
        if (c.mesh.position.distanceTo(c.origPos) > 600) {
          c.mesh.position.copy(c.origPos);
          c.mesh.position.subScaledVector(c.dir, 300); // pull them back slightly so they fall in continuously
        }
      });
    }

    // Dynamic Distance Fading (Replaces Fog)
    const fadeObj = (group) => {
      const dist = camera.position.distanceTo(group.position);
      let alpha = 1.0 - (dist - 800) / 700; // Start fading at 800, completely invisible at 1500
      alpha = Math.max(0, Math.min(1, alpha));

      group.traverse(child => {
        // INCLUDE Sprites so the black hole sprite actually fades out!
        if (child.isMesh || child.isPoints || child.isSprite) {
          if (child.material) {
            if (child.material.userData.baseOpacity === undefined) {
              child.material.transparent = true;
              child.material.userData.baseOpacity = child.material.opacity !== undefined ? child.material.opacity : 1;
            }
            child.material.opacity = child.material.userData.baseOpacity * alpha;
            child.visible = alpha > 0;
          }
        }
      });
    };

    fadeObj(p1Group);
    fadeObj(auroraGroup);
    fadeObj(nebulaGroup);
    fadeObj(starGroup);
    fadeObj(bhGroup);

    // Shooting Stars
    shootingStars.forEach(ss => {
      ss.life++;
      ss.mesh.position.add(ss.velocity);

      if (ss.life > ss.maxLife) {
        ss.life = 0;
        ss.maxLife = Math.random() * 200 + 150;
        const cam = camera.position;
        const isLeft = Math.random() > 0.5;
        // Spawn far in the background, mostly offscreen to the left or right
        ss.mesh.position.set(
          cam.x + (isLeft ? -2500 : 2500) + (Math.random() - 0.5) * 500,
          cam.y + (Math.random() - 0.5) * 1500,
          cam.z - 1500 - Math.random() * 1000
        );
        // Move across the screen horizontally and slightly diagonally
        const speed = 4 + Math.random() * 5;
        ss.velocity.set(
          isLeft ? speed : -speed,
          (Math.random() - 0.5) * 2,
          0
        );
        ss.mesh.lookAt(ss.mesh.position.clone().add(ss.velocity));
      }
    });

    renderer.render(scene, camera);
  }

  const startPos = curve.getPoint(0);
  camera.position.copy(startPos);
  camera.lookAt(curve.getPoint(0.02));
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updatePlanetPos();
  });
}

/* ══ MARQUEE ════════════════════════════════════ */
// const tags = ['DSA', 'C++', 'Python', 'JavaScript', 'Game Dev', 'HTML/CSS', 'Git', 'Algorithms', 'OOP', 'Problem Solving', 'VIT Pune', 'CSE'];
// const mq = document.getElementById('mqT');
// [...tags, ...tags, ...tags, ...tags].forEach(s => {
//   const d = document.createElement('div'); d.className = 'mi';
//   d.innerHTML = `<span class="mdot"></span>${s}`; mq.appendChild(d);
// });

/* ══ SWAP WORDS ════════════════════════════════ */
const swW = ['building things 🔨', 'solving problems 🧩', 'making games 🎮', 'grinding DSA 📊', 'learning everything 📚', 'shipping code 🚀'];
let swi = 0; const swEl = document.getElementById('swapEl');
setInterval(() => { swEl.classList.add('h'); setTimeout(() => { swi = (swi + 1) % swW.length; swEl.textContent = swW[swi]; swEl.classList.remove('h') }, 260) }, 2600);

/* ══ NAME HOVER LETTERS ════════════════════════ */
const nh = document.getElementById('nameHover');
const nameStr = 'aranya :)';
nh.innerHTML = nameStr.split('').map((c, i) =>
  `<span class="letter" style="--index:${i}">${c === ' ' ? '&nbsp;' : c}</span>`
).join('');
/* Particle burst on hover */
nh.addEventListener('mouseenter', () => {
  const r = nh.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const ems = ['✨', '⚡', '🌟', '💥', '🔥', '💫'];
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('span');
    const ang = Math.random() * Math.PI * 2, dist = 40 + Math.random() * 80;
    s.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;font-size:${12 + Math.random() * 14}px;pointer-events:none;z-index:9999;transform:translate(-50%,-50%)`;
    s.textContent = ems[Math.floor(Math.random() * ems.length)];
    document.body.appendChild(s);
    s.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(ang) * dist}px),calc(-50% + ${Math.sin(ang) * dist}px)) scale(.2)`, opacity: 0 }
    ], { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(.2,.8,.4,1)' }).onfinish = () => s.remove();
  }
});

/* ══ HOVER PHOTO LIST ══════════════════════════ */
const interests = [
  { name: 'Game Development', tag: 'building', em: '🎮' },
  { name: 'DSA & Algorithms', tag: 'grinding', em: '🧩' },
  { name: 'Badminton', tag: 'competing', em: '🏸' },
  { name: 'Guitar', tag: 'strumming', em: '🎸' },
  { name: 'Photography', tag: 'shooting', em: '📸' },
  { name: 'Music', tag: 'listening', em: '🎵' },
  { name: 'Travel', tag: 'exploring', em: '✈️' },
  { name: 'Football', tag: 'playing', em: '⚽' },
];
const phItems = document.getElementById('phItems');
const floatImg = document.getElementById('floatImg');
const phBgImg = document.getElementById('phBgImg');
interests.forEach((it, i) => {
  const d = document.createElement('div');
  d.className = 'ph-item';
  d.dataset.reveal = '';
  d.style.transitionDelay = (i * .05) + 's';
  d.innerHTML = `<span class="phi-num">${String(i + 1).padStart(2, '0')}</span><span class="phi-name">${it.name}</span><span class="phi-tag">${it.tag}</span>`;
  d.addEventListener('mouseenter', e => {
    floatImg.textContent = it.em; floatImg.classList.add('show');
    phBgImg.style.background = `radial-gradient(circle at center,rgba(0,229,255,.08),transparent 60%)`;
    phBgImg.classList.add('active');
  });
  d.addEventListener('mousemove', e => {
    floatImg.style.left = e.clientX + 'px'; floatImg.style.top = e.clientY + 'px';
  });
  d.addEventListener('mouseleave', () => { floatImg.classList.remove('show'); phBgImg.classList.remove('active') });
  phItems.appendChild(d);
});

/* ══ SCROLL REVEALS ════════════════════════════ */
const revObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }), { threshold: .1 });
document.querySelectorAll('[data-reveal]').forEach(el => revObs.observe(el));

/* Sections Blur Fade — smooth scroll-based gradual transition */
const blurSections = document.querySelectorAll('.sec, .now-sec, .photo-hover-sec, .split');
let blurRaf = null;
function updateBlur() {
  const vh = window.innerHeight;
  const rects = Array.from(blurSections).map(sec => sec.getBoundingClientRect());

  blurSections.forEach((sec, i) => {
    const r = rects[i];
    // How far into the viewport is the section? 0 = just entered, 1 = fully in
    const entry = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.5)));
    // Also fade out when leaving (scrolling past)
    const exit = Math.max(0, Math.min(1, (r.bottom) / (vh * 0.4)));
    const t = Math.min(entry, exit);
    const blur = (t * 10).toFixed(1); // reduced max blur for better performance
    const bgAlpha = (t * 0.35).toFixed(3);
    sec.style.background = `rgba(2, 0, 16, ${bgAlpha})`;
    sec.style.backdropFilter = `blur(${blur}px)`;
    sec.style.webkitBackdropFilter = `blur(${blur}px)`;
  });
  blurRaf = null;
}
window.addEventListener('scroll', () => { if (!blurRaf) blurRaf = requestAnimationFrame(updateBlur) }, { passive: true });
updateBlur();

/* Timeline: Scroll progress fill + card activation */
const tlWrap = document.getElementById('tlWrap');
const tlFill = document.getElementById('tlFill');
const tlEntries = document.querySelectorAll('.tl-e');
let tlRaf = null;

function updateTimeline() {
  if (!tlWrap) { tlRaf = null; return; }
  const wrapR = tlWrap.getBoundingClientRect();
  const wrapTop = wrapR.top;
  const wrapH = wrapR.height;
  const vh = window.innerHeight;

  const entryRects = Array.from(tlEntries).map(el => el.getBoundingClientRect());

  // Progress: 0 when top of timeline enters viewport, 1 when bottom leaves
  const progress = Math.max(0, Math.min(1, (vh - wrapTop) / (wrapH + vh * 0.3)));
  if (tlFill) tlFill.style.height = (progress * 100).toFixed(1) + '%';

  // Activate entries based on their position
  tlEntries.forEach((el, i) => {
    if (entryRects[i].top < vh * 0.8) {
      el.classList.add('in');
    }
  });
  tlRaf = null;
}

window.addEventListener('scroll', () => { if (!tlRaf) tlRaf = requestAnimationFrame(updateTimeline) }, { passive: true });
updateTimeline();

/* Timeline card mouse-glow */
let glowRaf = null;
let mouseX = 0, mouseY = 0;
const tlBodies = document.querySelectorAll('.tl-body');

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (!glowRaf) {
    glowRaf = requestAnimationFrame(() => {
      tlBodies.forEach(card => {
        const r = card.getBoundingClientRect();
        if (mouseX >= r.left && mouseX <= r.right && mouseY >= r.top && mouseY <= r.bottom) {
          card.style.setProperty('--gx', ((mouseX - r.left) / r.width * 100) + '%');
          card.style.setProperty('--gy', ((mouseY - r.top) / r.height * 100) + '%');
        }
      });
      glowRaf = null;
    });
  }
}, { passive: true });

/* Timeline Image Slideshow */
setInterval(() => {
  document.querySelectorAll('.tl-e.in .tl-img img').forEach(img => {
    if (img.dataset.images) {
      try {
        const images = JSON.parse(img.dataset.images);
        if (images.length > 1) {
          let currentSrc = img.getAttribute('src');
          if (!currentSrc) return;
          currentSrc = decodeURIComponent(currentSrc);
          let currentIdx = images.indexOf(currentSrc);
          if (currentIdx === -1) currentIdx = images.indexOf(img.getAttribute('src'));
          if (currentIdx === -1) currentIdx = 0;

          const nextIdx = (currentIdx + 1) % images.length;
          img.style.opacity = '0';
          setTimeout(() => {
            img.src = images[nextIdx];
            img.style.opacity = '1';
          }, 300);
        }
      } catch (e) {
        console.error("Timeline slideshow error:", e);
      }
    }
  });
}, 3000);

/* ══ SCROLL SCRUB ═══════════════════════════════ */
const sWords = 'welcome to my profile, <br> a journey awaits you to explore!'.split(' ');
const sEl = document.getElementById('scrubT');
if (sEl) {
  sWords.forEach((w, i) => {
    if (w === '<br>') {
      const br = document.createElement('div');
      br.style.height = '1.5rem'; // Adds space between the two lines
      br.style.width = '100%';
      sEl.appendChild(br);
      return;
    }
    const s = document.createElement('span');
    s.className = (i < 4) ? 'sw2 c-accent' : 'sw2';
    s.textContent = w + ' ';
    sEl.appendChild(s);
  });
}
if (!document.getElementById('scrubStyle')) {
  const st = document.createElement('style');
  st.id = 'scrubStyle';
  st.textContent = '.sw2.c-accent.lit { color: var(--lime) !important; text-shadow: 0 0 20px rgba(0,229,255,0.4); }';
  document.head.appendChild(st);
}
const sSpans = sEl ? sEl.querySelectorAll('.sw2') : [];
let sRaf = null;
function doScrub() {
  if (!sEl) return;
  const r = document.getElementById('scrubSec').getBoundingClientRect();
  const vh = window.innerHeight;
  // Delay the animation start: wait until the section is 35% into the screen from the bottom
  const prog = Math.max(0, Math.min(1, (vh - r.top - vh * 0.35) / (r.height * 0.8)));
  const lit = Math.round(prog * sSpans.length * 1.2);
  sSpans.forEach((sp, i) => {
    if (i < lit && !sp.classList.contains('lit')) sp.classList.add('lit');
    else if (i >= lit && sp.classList.contains('lit')) sp.classList.remove('lit');
  });
  sRaf = null;
}
window.addEventListener('scroll', () => { if (!sRaf) sRaf = requestAnimationFrame(doScrub) }, { passive: true });
doScrub();

/* ══ PROJECT CARD TILT ══════════════════════════ */
document.querySelectorAll('.proj-feat, .proj-card').forEach(c => {
  c.addEventListener('mouseenter', () => {
    c.style.transition = 'transform 0.05s linear, border-color .4s var(--ease), box-shadow .4s var(--ease)';
  });
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-6px)`;
  });
  c.addEventListener('mouseleave', () => {
    c.style.transition = '';
    c.style.transform = '';
  });
});

/* ══ MAGNETIC BTNS ══════════════════════════════ */
document.querySelectorAll('.mag').forEach(b => {
  b.addEventListener('mouseenter', () => {
    b.style.transition = 'transform 0.05s linear';
  });
  b.addEventListener('mousemove', e => {
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .26}px,${(e.clientY - r.top - r.height / 2) * .26}px)`;
  });
  b.addEventListener('mouseleave', () => {
    b.style.transition = '';
    b.style.transform = '';
  });
});

/* ══ CMD PALETTE ════════════════════════════════ */
const cmds = [{ ic: '🏠', lb: 'Home', pg: 'index.html', kb: 'H' }, { ic: '👤', lb: 'Personal', pg: 'personal.html', kb: 'P' }, { ic: '💼', lb: 'Professional', pg: 'professional.html', kb: 'W' }, { ic: '💻', lb: 'GitHub', fn: () => window.open('https://github.com/07aranya'), kb: 'G' }, { ic: '🔗', lb: 'LinkedIn', fn: () => window.open('https://www.linkedin.com/in/aranya-ghargade-207821385/'), kb: 'L' }, { ic: '📧', lb: 'Email', fn: () => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=07aranya@gmail.com'), kb: 'E' }];
const cW = document.getElementById('cmdW'), cI = document.getElementById('cmdIn'), cL = document.getElementById('cmdList');
function rCmds(f = '') { const fl = cmds.filter(c => c.lb.toLowerCase().includes(f.toLowerCase())); cL.innerHTML = ''; fl.forEach((c, i) => { const d = document.createElement('div'); d.className = 'ci' + (i === 0 ? ' s' : ''); d.innerHTML = `<div class="ci-ic">${c.ic}</div><span>${c.lb}</span><span class="ci-kb">${c.kb}</span>`; d.addEventListener('click', () => { closeC(); c.pg ? nav2(c.pg) : c.fn && c.fn() }); cL.appendChild(d) }) }
function openC() { cW.classList.add('open'); cI.value = ''; rCmds(); setTimeout(() => cI.focus(), 25) }
function closeC() { cW.classList.remove('open') }
document.getElementById('cmdBtn').addEventListener('click', openC);
cW.addEventListener('click', e => { if (e.target === cW) closeC() });
cI.addEventListener('input', () => rCmds(cI.value));
document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); cW.classList.contains('open') ? closeC() : openC() } if (e.key === 'Escape') { closeC(); closeKonami() } });

/* ══ PAGE TRANSITIONS ════════════════════════════ */
function nav2(url) { const o = document.getElementById('pgOv'); o.style.transition = 'transform .85s cubic-bezier(.7,0,.3,1)'; o.style.transform = 'translateY(0)'; setTimeout(() => location.href = url, 830) }
document.querySelectorAll('[data-page]').forEach(el => el.addEventListener('click', e => { const p = el.getAttribute('data-page'); const c2 = location.pathname.split('/').pop() || 'index.html'; if (!p || p === c2) return; e.preventDefault(); nav2(p) }));
window.addEventListener('pageshow', () => { const o = document.getElementById('pgOv'); o.style.transition = 'none'; o.style.transform = 'translateY(0)'; requestAnimationFrame(() => requestAnimationFrame(() => { o.style.transition = 'transform 1.1s cubic-bezier(.7,0,.3,1)'; o.style.transform = 'translateY(100%)' })) });

/* ══ KONAMI CODE + PONG ═════════════════════════ */
const konamiSeq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let ki = 0;
document.addEventListener('keydown', e => {
  if (e.key === konamiSeq[ki]) ki++; else ki = 0;
  if (ki === konamiSeq.length) { ki = 0; openKonami() }
});
const kO = document.getElementById('konamiOverlay');
const kC = document.getElementById('kCanvas'), kCtx = kC.getContext('2d');
let kRunning = false, kPaused = false, kAF = null;
let paddleX = 200, paddleW = 80, paddleH = 10, paddleSpd = 0;
let bx = 240, by = 200, bvx = 3.5, bvy = -3.5, bsize = 8;
let score = 0, lives = 3;
function openKonami() {
  kO.classList.add('open'); document.body.classList.add('konami-mode');
  document.body.style.overflow = 'hidden';
  resetKonami(); kRunning = true; kAF = requestAnimationFrame(kLoop);
}
function closeKonami() {
  kO.classList.remove('open'); document.body.classList.remove('konami-mode');
  document.body.style.overflow = 'auto';
  kRunning = false; if (kAF) cancelAnimationFrame(kAF);
}
document.getElementById('konamiClose').addEventListener('click', closeKonami);
function resetKonami() { paddleX = 200; bx = 240; by = 200; bvx = 3.5; bvy = -3.5; score = 0; lives = 3; kPaused = false }
document.addEventListener('keydown', e => {
  if (!kRunning) return;
  if (e.key === 'ArrowLeft' || e.key === 'a') paddleSpd = -6;
  if (e.key === 'ArrowRight' || e.key === 'd') paddleSpd = 6;
  if (e.key === ' ') { e.preventDefault(); kPaused = !kPaused; if (!kPaused) kAF = requestAnimationFrame(kLoop) }
});
document.addEventListener('keyup', e => { if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ArrowRight' || e.key === 'd') paddleSpd = 0 });
const BROWS = 5, BCOLS = 9, bricks = [];
function initBricks() { bricks.length = 0; for (let r = 0; r < BROWS; r++)for (let c = 0; c < BCOLS; c++)bricks.push({ x: c * (50 + 4) + 6, y: r * (16 + 4) + 24, w: 50, h: 16, alive: true, col: ['#0ff', '#f0f', '#0f0', '#ff0', '#f50'][r] }) }
initBricks();
function kLoop() {
  if (!kRunning || kPaused) return;
  paddleX = Math.max(0, Math.min(kC.width - paddleW, paddleX + paddleSpd));
  bx += bvx; by += bvy;
  if (bx - bsize <= 0 || bx + bsize >= kC.width) bvx *= -1;
  if (by - bsize <= 0) bvy *= -1;
  if (by + bsize >= kC.height - 14 && bx >= paddleX && bx <= paddleX + paddleW) { bvy = -Math.abs(bvy); bvx += (bx - (paddleX + paddleW / 2)) * .08 }
  else if (by + bsize >= kC.height) { lives--; by = 200; bx = 240; bvx = 3.5; bvy = -3.5; if (lives <= 0) { kRunning = false; drawKEnd(); return } }
  bricks.forEach(b => { if (!b.alive) return; if (bx + bsize > b.x && bx - bsize < b.x + b.w && by + bsize > b.y && by - bsize < b.y + b.h) { b.alive = false; bvy *= -1; score += 10; if (Math.abs(bvx) < 7) bvx *= 1.04; if (Math.abs(bvy) < 7) bvy *= 1.04 } });
  if (bricks.every(b => !b.alive)) { initBricks(); score += 50 }
  kDraw(); kAF = requestAnimationFrame(kLoop);
}
function kDraw() {
  kCtx.fillStyle = '#000'; kCtx.fillRect(0, 0, kC.width, kC.height);
  /* Grid */
  kCtx.strokeStyle = 'rgba(0,255,255,.04)'; kCtx.lineWidth = 1;
  for (let x = 0; x < kC.width; x += 30) { kCtx.beginPath(); kCtx.moveTo(x, 0); kCtx.lineTo(x, kC.height); kCtx.stroke() }
  for (let y = 0; y < kC.height; y += 30) { kCtx.beginPath(); kCtx.moveTo(0, y); kCtx.lineTo(kC.width, y); kCtx.stroke() }
  bricks.forEach(b => { if (!b.alive) return; kCtx.fillStyle = b.col; kCtx.shadowColor = b.col; kCtx.shadowBlur = 8; kCtx.fillRect(b.x, b.y, b.w, b.h); kCtx.shadowBlur = 0 });
  kCtx.fillStyle = '#0ff'; kCtx.shadowColor = '#0ff'; kCtx.shadowBlur = 10; kCtx.fillRect(paddleX, kC.height - 14, paddleW, paddleH); kCtx.shadowBlur = 0;
  kCtx.beginPath(); kCtx.arc(bx, by, bsize, 0, Math.PI * 2); kCtx.fillStyle = '#fff'; kCtx.shadowColor = '#fff'; kCtx.shadowBlur = 15; kCtx.fill(); kCtx.shadowBlur = 0;
  kCtx.font = "14px 'DM Mono',monospace"; kCtx.fillStyle = '#0ff'; kCtx.fillText('SCORE:' + score, 8, kC.height - 3);
  kCtx.fillText('LIVES:' + '♥'.repeat(lives), kC.width - 90, kC.height - 3);
}
function drawKEnd() { kCtx.fillStyle = 'rgba(0,0,0,.7)'; kCtx.fillRect(0, 0, kC.width, kC.height); kCtx.font = "bold 28px 'DM Mono',monospace"; kCtx.fillStyle = '#0ff'; kCtx.textAlign = 'center'; kCtx.fillText('GAME OVER', kC.width / 2, kC.height / 2 - 20); kCtx.font = "14px 'DM Mono',monospace"; kCtx.fillText('score: ' + score, kC.width / 2, kC.height / 2 + 14); kCtx.textAlign = 'left'; kCtx.fillText('press R to restart', kC.width / 2 - 60, kC.height / 2 + 40) }
document.addEventListener('keydown', e => { if (e.key === 'r' && kO.classList.contains('open')) { initBricks(); resetKonami(); kRunning = true; kAF = requestAnimationFrame(kLoop) } });

/* ══ MEDIA MODAL ════════════════════════════════ */
const mModal = document.getElementById('mediaModal');
const mContent = document.getElementById('mmContent');
const mClose = document.getElementById('mmClose');
const mNav = document.getElementById('mmNav');
const mPrev = document.getElementById('mmPrev');
const mNext = document.getElementById('mmNext');

let mediaFiles = [];
let currentMediaIdx = 0;

window.openMediaModal = function (type) {
  if (!mModal) return;
  mModal.classList.add('open');
  if (type === 'video') {
    mediaFiles = ['images/vrvid.mp4'];
    mNav.classList.remove('show');
  } else if (type === 'photo') {
    mediaFiles = ['images/vr1.jpeg', 'images/vr2.jpeg', 'images/vr3.jpeg', 'images/vr4.jpeg'];
    mNav.classList.add('show');
  }
  currentMediaIdx = 0;
  renderMedia();
};

function renderMedia() {
  mContent.innerHTML = '';
  const file = mediaFiles[currentMediaIdx];
  if (file.endsWith('.mp4')) {
    mContent.innerHTML = `<video src="${file}" controls autoplay style="max-height:70vh; max-width:70vw;"></video>`;
  } else {
    mContent.innerHTML = `<img src="${file}" style="max-height:70vh; max-width:70vw;">`;
  }
}

if (mClose) {
  mClose.addEventListener('click', () => {
    mModal.classList.remove('open');
    mContent.innerHTML = '';
  });
}

if (mPrev) {
  mPrev.addEventListener('click', () => {
    currentMediaIdx = (currentMediaIdx - 1 + mediaFiles.length) % mediaFiles.length;
    renderMedia();
  });
}

if (mNext) {
  mNext.addEventListener('click', () => {
    currentMediaIdx = (currentMediaIdx + 1) % mediaFiles.length;
    renderMedia();
  });
}

if (mModal) {
  mModal.addEventListener('click', (e) => {
    if (e.target === mModal) {
      mModal.classList.remove('open');
      mContent.innerHTML = '';
    }
  });
}

/* ══ INTERACTIVE TERMINAL ════════════════════════ */
const mtTerm = document.getElementById('mockTerm');
const mtTyping = document.getElementById('mtTyping');
const mtOut = document.getElementById('mtOut');

if (mtTerm) {
  const commands = [
    "./run_aranya.sh",
    "Loading modules...",
    "[OK] Coffee injected.",
    "[OK] Bugs created.",
    "[OK] Bugs fixed.",
    "Status: Building cool things 🚀"
  ];
  
  let started = false;
  
  mtTerm.addEventListener('click', () => {
    if (started) return;
    started = true;
    mtTerm.style.cursor = 'default';
    
    // Typing effect for the command
    const cmd = commands[0];
    let i = 0;
    mtTyping.textContent = '';
    
    const typeInterval = setInterval(() => {
      if (i < cmd.length) {
        mtTyping.textContent += cmd.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(runOutput, 400);
      }
    }, 50);
    
    function runOutput() {
      let outHtml = '';
      let lineIdx = 1;
      
      const outInterval = setInterval(() => {
        if (lineIdx < commands.length) {
          outHtml += `<div>${commands[lineIdx]}</div>`;
          mtOut.innerHTML = outHtml;
          lineIdx++;
        } else {
          clearInterval(outInterval);
          // Add a new prompt line
          mtOut.innerHTML += `<div style="margin-top:0.5rem"><span class="mt-prompt">$</span> <span class="mt-cursor">_</span></div>`;
          document.querySelector('.mt-cursor').style.display = 'none'; // hide first cursor
        }
      }, 600);
    }
  });
}