/**
 * Section 002: Free-Floating Interests Arena Controller
 * Manages the central stack, explosion/scatter physics, drag-and-drop, and sound.
 */

document.addEventListener('DOMContentLoaded', initInterestsArena);

function initInterestsArena() {
  const arena = document.getElementById('interestsArena');
  const triggerBtn = document.getElementById('btnScatterInterests');
  const triggerText = document.getElementById('scatterBtnText');
  const triggerHint = document.getElementById('scatterBtnHint');
  const cards = document.querySelectorAll('.free-card');

  if (!arena || !triggerBtn || !cards.length) return;

  let isScattered = false;
  let audioCtx = null;
  let topZIndex = 30;

  // Initial rotations for natural deck pile look
  const STACK_ROTATIONS = [-5, 4.5, -2.5, 6, -4, 3, -1.5];

  // Set initial stacked transforms
  function applyStackedState() {
    arena.classList.remove('state-scattered');
    arena.classList.add('state-stacked');
    isScattered = false;

    cards.forEach((card, i) => {
      card.style.left = '50%';
      card.style.top = '50%';
      const rot = STACK_ROTATIONS[i % STACK_ROTATIONS.length];
      card.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(0.95)`;
      card.style.zIndex = 10 + i;
      card.dataset.stackedRot = rot;
      // Staggered transition when gathering
      card.style.transitionDelay = `${(cards.length - 1 - i) * 0.035}s`;
    });

    if (triggerText) triggerText.textContent = 'UNPACK INTERESTS (7)';
    if (triggerHint) triggerHint.textContent = 'click to scatter across the studio';
  }

  // Scatter outward into free organic positions
  function applyScatteredState() {
    arena.classList.remove('state-stacked');
    arena.classList.add('state-scattered');
    isScattered = true;

    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.055}s`;
      // Clear inline transform to let CSS scattered coordinates take effect
      card.style.left = '';
      card.style.top = '';
      card.style.transform = '';
      card.style.zIndex = 15 + i;
    });

    if (triggerText) triggerText.textContent = '↺ GATHER STACK';
    if (triggerHint) triggerHint.textContent = 'click to pull back to center pile';

    playScatterAudio();
  }

  // Trigger button toggle
  triggerBtn.addEventListener('click', () => {
    if (isScattered) {
      applyStackedState();
      playGatherAudio();
    } else {
      applyScatteredState();
    }
  });

  // Clicking any card while in stacked mode also scatters the deck
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (!isScattered) {
        applyScatteredState();
      }
    });
  });

  // ── FREE DRAG AND DROP FOR ALL CARDS ────────────────────────
  cards.forEach(card => {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initLeft = 0, initTop = 0;

    function onPointerDown(e) {
      // Only drag if scattered
      if (!isScattered) return;

      isDragging = true;
      card.classList.add('is-dragging');

      // Bring to top
      topZIndex++;
      card.style.zIndex = topZIndex;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      startX = clientX;
      startY = clientY;

      // Current bounding box relative to arena
      const arenaRect = arena.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      initLeft = cardRect.left - arenaRect.left;
      initTop = cardRect.top - arenaRect.top;

      // Convert card positioning to explicit pixels during drag
      card.style.left = `${initLeft}px`;
      card.style.top = `${initTop}px`;
      card.style.transform = 'scale(1.04) rotate(1.5deg)';

      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      if (e.cancelable && e.type === 'touchmove') e.preventDefault();

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const dx = clientX - startX;
      const dy = clientY - startY;

      let newLeft = initLeft + dx;
      let newTop = initTop + dy;

      // Soft boundary clamping within arena
      const arenaW = arena.clientWidth;
      const arenaH = arena.clientHeight;
      const cardW = card.offsetWidth;
      const cardH = card.offsetHeight;

      newLeft = Math.max(10, Math.min(arenaW - cardW - 10, newLeft));
      newTop = Math.max(10, Math.min(arenaH - cardH - 10, newTop));

      card.style.left = `${newLeft}px`;
      card.style.top = `${newTop}px`;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      card.classList.remove('is-dragging');

      // Gentle random settlement angle
      const settleAngle = (Math.random() - 0.5) * 8;
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease';
      card.style.transform = `rotate(${settleAngle.toFixed(1)}deg) scale(1)`;

      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    }

    card.addEventListener('mousedown', onPointerDown);
    card.addEventListener('touchstart', onPointerDown, { passive: true });
  });

  // ── SOUND SYNTHESIS (Card dealing flick & gather) ────────────
  function getAudioCtx() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playScatterAudio() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Series of crisp card deal flicks
      [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.36].forEach((delay, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280 + i * 40, now + delay);
        osc.frequency.exponentialRampToValueAtTime(140, now + delay + 0.05);

        gain.gain.setValueAtTime(0.04, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.07);
      });
    } catch (e) {
      // Audio optional
    }
  }

  function playGatherAudio() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      // Audio optional
    }
  }

  // Start in stacked state
  applyStackedState();
}
