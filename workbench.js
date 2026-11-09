/**
 * The Studio Workbench Controller
 * Powers Concept 4 (Speedcube Reflex Tester), Concept 5 (Analog Audio Memo Deck),
 * Concept 8 (Draggable Polaroid), and the Tactile Specimen Tray.
 */

document.addEventListener('DOMContentLoaded', initWorkbench);

function initWorkbench() {
  initMixtape();
  initDraggablePolaroid();
  initReflexTester();
  initSpecimenTray();
}

// ── 1. ANALOG AUDIO MEMO DECK (Concept 5) ─────────────────────
window.TRACKS_DATA = window.TRACKS_DATA || [
  {
    num: 'MEMO 01',
    tag: 'NON-TECH // ROOTS',
    title: 'origins.wav',
    story: 'Lived across 7 cities — Nagpur, Mumbai, Goa, Hyderabad, Baramati, Kolhapur, and Pune. Constantly moving taught me to observe people quickly and feel comfortable building from zero in any room.',
    badge: '7 cities',
    photo: 'images/neww/WhatsApp Image 2026-05-02 at 11.28.00.jpeg',
    caption: 'sunset in goa · adaptable roots'
  },
  {
    num: 'MEMO 02',
    tag: 'TECH // SENSORS & VISION',
    title: 'tangible_code.flac',
    story: 'I like making software you can reach out and touch. From webcam gesture tracking in Fruit Ninja to physical ESP32 gyro balance controllers and VR horror spatial audio, code hits different when it connects directly to physical motion.',
    badge: 'sensors & vision',
    photo: 'images/projects/fruitninja.jpg',
    caption: 'gesture fruit ninja · python + opencv'
  },
  {
    num: 'MEMO 03',
    tag: 'NON-TECH // REFLEX & SPORT',
    title: 'the_12s_mind.mp3',
    story: 'Sub-13s competitive speedcuber (PB: 12.06s). Solved the 3x3 through pattern recognition and finger-trick muscle memory. Carried that same reflex into badminton court footwork and state-level football-tennis runner-up.',
    badge: '12.06s pb',
    photo: 'images/state level/football medal.jpeg',
    caption: 'state level athletics · court reflexes'
  },
  {
    num: 'MEMO 04',
    tag: 'NON-TECH // MUSIC',
    title: 'strat_chords.aiff',
    story: 'Black Fender Squier Sonic Stratocaster (HSS configuration). Learning Bollywood melodies and Arctic Monkeys riffs by ear. Playing guitar eases my mind by tenfold and completely resets my brain when code gets chaotic.',
    badge: 'fender strat',
    photo: 'images/guitar1.jpg',
    caption: 'fender stratocaster hss · sonic black'
  }
];

let activeTrackIdx = 0;
let audioCtx = null;

function initMixtape() {
  const trackBtns = document.querySelectorAll('.track-pill');
  const cassetteMini = document.getElementById('wbCassetteMini');

  trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-track'), 10);
      switchTrack(idx);
    });
  });

  function switchTrack(idx) {
    activeTrackIdx = idx;
    const t = (window.TRACKS_DATA || TRACKS_DATA)[idx];
    if (!t) return;

    // Update buttons
    trackBtns.forEach((b, i) => b.classList.toggle('active', i === idx));

    // Update text
    const numEl = document.getElementById('wbActiveNum');
    const tagEl = document.getElementById('wbActiveTag');
    const titleEl = document.getElementById('wbActiveTitle');
    const storyEl = document.getElementById('wbActiveStory');

    if (numEl) numEl.textContent = t.num;
    if (tagEl) tagEl.textContent = t.tag;
    if (titleEl) titleEl.textContent = t.title;
    if (storyEl) storyEl.textContent = t.story;

    // Mini cassette spool animation
    if (cassetteMini) {
      cassetteMini.classList.add('spinning');
      clearTimeout(cassetteMini._spinTimer);
      cassetteMini._spinTimer = setTimeout(() => {
        cassetteMini.classList.remove('spinning');
      }, 4000);
    }

    // Update Polaroid photo to match track theme
    const polaroidImg = document.getElementById('wbPolaroidImg');
    const polaroidCaption = document.getElementById('wbPolaroidCaption');
    if (polaroidImg && t.photo) {
      polaroidImg.style.opacity = '0';
      setTimeout(() => {
        polaroidImg.src = t.photo;
        if (polaroidCaption) {
          polaroidCaption.innerHTML = `<span>${t.caption}</span><small class="drag-hint">⇄ draggable</small>`;
        }
        polaroidImg.style.opacity = '1';
      }, 140);
    }

    // Play subtle warm acoustic tone
    playGuitarTone(idx);
  }
}

// Warm acoustic guitar-like chord tone using Web Audio API
function playGuitarTone(trackIdx) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Natural resonant chord voicings (Em, C, G, D)
    const chordFreqs = [
      [164.81, 196.00, 246.94], // E minor (Roots / Origins)
      [130.81, 164.81, 196.00], // C major (Tangible Code)
      [196.00, 246.94, 293.66], // G major (Reflex / Sport)
      [146.83, 220.00, 293.66]  // D major (Fender Strat)
    ];

    const freqs = chordFreqs[trackIdx % chordFreqs.length];
    const now = audioCtx.currentTime;

    freqs.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.035);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + i * 0.035 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.035 + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + i * 0.035);
      osc.stop(now + i * 0.035 + 0.85);
    });
  } catch (e) {
    // Audio optional, silently proceed
  }
}

// ── 2. DRAGGABLE POLAROID WITH INERTIA & TILT (Concept 8) ──────
function initDraggablePolaroid() {
  const polaroid = document.getElementById('wbPolaroid');
  if (!polaroid) return;

  let isDragging = false;
  let startX, startY, initLeft = 0, initTop = 0;

  polaroid.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    const style = window.getComputedStyle(polaroid);
    const matrix = new WebKitCSSMatrix(style.transform);
    initLeft = matrix.m41;
    initTop = matrix.m42;

    polaroid.style.zIndex = '50';
    polaroid.style.transition = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    polaroid.style.transform = `translate(${initLeft + dx}px, ${initTop + dy}px) rotate(1deg) scale(1.03)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    polaroid.style.transition = 'transform 0.4s cubic-bezier(.16, 1, .3, 1), box-shadow 0.3s ease';
    const style = window.getComputedStyle(polaroid);
    const matrix = new WebKitCSSMatrix(style.transform);
    polaroid.style.transform = `translate(${matrix.m41}px, ${matrix.m42}px) rotate(-1.5deg) scale(1)`;
    polaroid.style.zIndex = '10';
  });
}

// ── 3. SPEEDCUBE REFLEX TESTER (Concept 4) ─────────────────────
function initReflexTester() {
  const screen = document.getElementById('reflexScreen');
  const text = document.getElementById('reflexText');
  if (!screen || !text) return;

  let state = 'ready'; // 'ready', 'waiting', 'now', 'result', 'early'
  let timerId = null;
  let startTime = 0;

  screen.addEventListener('click', () => {
    if (state === 'ready' || state === 'result' || state === 'early') {
      state = 'waiting';
      screen.className = 'reflex-screen waiting';
      text.textContent = 'WAIT FOR GREEN...';

      const delay = Math.random() * 2400 + 1400;
      timerId = setTimeout(() => {
        state = 'now';
        screen.className = 'reflex-screen now';
        text.textContent = 'CLICK NOW!';
        startTime = performance.now();
      }, delay);

    } else if (state === 'waiting') {
      clearTimeout(timerId);
      state = 'early';
      screen.className = 'reflex-screen early';
      text.textContent = 'TOO EARLY! Click to retry';

    } else if (state === 'now') {
      const elapsed = Math.round(performance.now() - startTime);
      state = 'result';
      screen.className = 'reflex-screen result';

      let comment = 'Solid reflexes!';
      if (elapsed < 190) comment = '⚡ Pro speedcuber reaction!';
      else if (elapsed < 235) comment = '🔥 Faster than average!';

      text.innerHTML = `${elapsed} ms <small style="font-size:0.75rem;font-weight:400;display:block;margin-top:2px">${comment}</small>`;
    }
  });
}

// ── 4. TACTILE SPECIMEN TRAY (Crisp, Stable, Zero Jitter) ──────
function initSpecimenTray() {
  const pills = document.querySelectorAll('.capsule-pill');
  const readout = document.getElementById('readoutText');
  if (!pills.length || !readout) return;

  pills.forEach(pill => {
    const tip = pill.getAttribute('data-tip');

    // Hover readout
    pill.addEventListener('mouseenter', () => {
      readout.textContent = `${pill.textContent.trim()} — ${tip}`;
      readout.style.color = '#ede8e0';
    });

    pill.addEventListener('mouseleave', () => {
      const activePill = document.querySelector('.capsule-pill.active');
      if (activePill) {
        readout.textContent = `${activePill.textContent.trim()} — ${activePill.getAttribute('data-tip')}`;
      } else {
        readout.textContent = 'Hover or click any specimen tag above to view context.';
        readout.style.color = '#a8a298';
      }
    });

    // Click: toggle active and play subtle acoustic micro-pluck
    pill.addEventListener('click', () => {
      const wasActive = pill.classList.contains('active');
      pills.forEach(p => p.classList.remove('active'));
      if (!wasActive) {
        pill.classList.add('active');
        readout.textContent = `${pill.textContent.trim()} — ${tip}`;
        readout.style.color = '#c8f53d';

        // Gentle micro-click tone
        playMicroBeep(pill.classList.contains('tech') ? 440 : 330);
      } else {
        readout.textContent = 'Hover or click any specimen tag above to view context.';
        readout.style.color = '#a8a298';
      }
    });
  });
}

function playMicroBeep(freq) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch (e) {
    // Ignore audio errors
  }
}
