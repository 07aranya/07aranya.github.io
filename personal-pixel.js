/**
 * Section 16-Bit RPG Adventure Controller — Personal Page
 * Powers character sprite speech, 8-bit riff synth, WCA scrambler,
 * achievement toasts, CRT/SFX toggles, and chiptune sound synthesis.
 */

document.addEventListener('DOMContentLoaded', initPixelAdventure);

let sfxEnabled = true;
let crtEnabled = false;
let audioCtx = null;
const unlockedAchievements = new Set();

function initPixelAdventure() {
  initAudioEngine();
  initHudControls();
  initAranyaSprite();
  initRiffSynth();
  initCubeScrambler();
  initInventoryBag();
  initGuitarQuestTabs();
  initPhotoCartridgeStack();
  initPnavSounds();
}

// ── 1. 16-BIT CHIPTUNE SYNTHESIS ENGINE (Web Audio API) ──────
function initAudioEngine() {
  const unlockAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx && AudioContext) audioCtx = new AudioContext();
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    } catch (e) {}
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  };
  window.addEventListener('click', unlockAudio);
  window.addEventListener('keydown', unlockAudio);
}

function playRetroSfx(type) {
  if (!sfxEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;

    if (type === 'blip') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);

    } else if (type === 'coin') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.35);

    } else if (type === 'tab') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, now); // E5
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.07);

    } else if (type === 'fanfare') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const start = now + idx * 0.07;
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.035, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.22);
      });
    }
  } catch (e) {}
}

// ── 2. RETRO HUD CONTROLS (CRT SCANLINES & SFX TOGGLE) ────────
function initHudControls() {
  const crtBtn = document.getElementById('btnCrtToggle');
  const sfxBtn = document.getElementById('btnSfxToggle');

  if (crtBtn) {
    crtBtn.addEventListener('click', () => {
      crtEnabled = !crtEnabled;
      document.body.classList.toggle('crt-active', crtEnabled);
      crtBtn.classList.toggle('active', crtEnabled);
      crtBtn.textContent = crtEnabled ? '📺 CRT: ON' : '📺 CRT';
      playRetroSfx('tab');
    });
  }

  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      sfxBtn.classList.toggle('active', !sfxEnabled);
      sfxBtn.textContent = sfxEnabled ? '🔊 SFX' : '🔇 MUTED';
      if (sfxEnabled) playRetroSfx('coin');
    });
  }
}

// ── 3. ACHIEVEMENT UNLOCKED NOTIFIER (Gamification) ───────────
function triggerAchievement(title, exp) {
  if (unlockedAchievements.has(title)) return;
  unlockedAchievements.add(title);

  const toast = document.getElementById('rpgToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastExp = document.getElementById('toastExp');

  if (!toast || !toastTitle) return;

  toastTitle.textContent = title;
  if (toastExp) toastExp.textContent = exp;

  toast.classList.add('show');
  playRetroSfx('fanfare');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}

// ── 4. ANIMATED 16-BIT ARANYA CHARACTER SPRITE ────────────────
function initAranyaSprite() {
  const sprite = document.getElementById('aranyaSprite');
  const bubble = document.getElementById('spriteSpeechBubble');
  if (!sprite || !bubble) return;

  const QUOTES = [
    "* Official 12.06s 3x3 Rubik's PB! *",
    "* Learning Arctic Monkeys riffs by ear on the Strat! *",
    "* Building physics & vision games in Unity! *",
    "* Lived across 7 Indian cities — always adaptable! *",
    "* High agility in badminton & football *",
    "* Midnight coding with Frank Ocean on repeat! *"
  ];
  let quoteIdx = 0;
  let bubbleTimeout = null;

  sprite.addEventListener('click', () => {
    sprite.classList.remove('is-jumping');
    void sprite.offsetWidth; // Force reflow
    sprite.classList.add('is-jumping');

    playRetroSfx('coin');

    // Show Speech Bubble
    quoteIdx = (quoteIdx + 1) % QUOTES.length;
    bubble.querySelector('span').textContent = QUOTES[quoteIdx];
    bubble.classList.add('show');

    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => {
      bubble.classList.remove('show');
    }, 3800);

    triggerAchievement('Talk to the Protagonist', '+50 EXP');
  });
}

// ── 5. PLAYABLE 8-BIT GUITAR RIFF SYNTH ───────────────────────
function initRiffSynth() {
  const riffBtns = document.querySelectorAll('.riff-play-btn');
  const statusEl = document.getElementById('riffStatus');
  if (!riffBtns.length) return;

  // Notes frequencies (Hz)
  const N = {
    G3: 196.00, A3: 220.00, B3: 246.94, C4: 261.63, D4: 293.66,
    E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25
  };

  const RIFFS = {
    '505': [
      { f: N.D4, d: 0.22 }, { f: N.F4, d: 0.22 }, { f: N.A4, d: 0.22 }, { f: N.D5, d: 0.45 },
      { f: N.C4, d: 0.22 }, { f: N.E4, d: 0.22 }, { f: N.G4, d: 0.22 }, { f: N.C5, d: 0.45 }
    ],
    'diwk': [
      { f: N.G3, d: 0.35 }, { f: N.G3, d: 0.18 }, { f: N.B3, d: 0.25 },
      { f: N.C4, d: 0.25 }, { f: N.D4, d: 0.45 }, { f: N.C4, d: 0.25 }, { f: N.B3, d: 0.35 }
    ],
    'tumhiho': [
      { f: N.C4, d: 0.25 }, { f: N.D4, d: 0.25 }, { f: N.E4, d: 0.35 }, { f: N.D4, d: 0.25 },
      { f: N.C4, d: 0.25 }, { f: N.B3, d: 0.35 }, { f: N.A3, d: 0.55 }
    ]
  };

  let activeRiffTimer = null;

  riffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const riffKey = btn.getAttribute('data-riff');
      const sequence = RIFFS[riffKey];
      if (!sequence || !sfxEnabled) return;

      riffBtns.forEach(b => b.classList.remove('playing'));
      btn.classList.add('playing');
      if (statusEl) statusEl.textContent = 'PLAYING RIFF...';

      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
      }
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();

      let currentDelay = 0;
      const now = audioCtx.currentTime;

      sequence.forEach(note => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(note.f, now + currentDelay);

        gain.gain.setValueAtTime(0.045, now + currentDelay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + currentDelay + note.d * 0.9);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + currentDelay);
        osc.stop(now + currentDelay + note.d);

        currentDelay += note.d;
      });

      clearTimeout(activeRiffTimer);
      activeRiffTimer = setTimeout(() => {
        btn.classList.remove('playing');
        if (statusEl) statusEl.textContent = 'STANDBY';
      }, currentDelay * 1000 + 100);

      triggerAchievement('Chiptune Rocker', '+50 EXP');
    });
  });
}

// ── 6. WCA SPEEDCUBE SCRAMBLER WIDGET ─────────────────────────
function initCubeScrambler() {
  const btn = document.getElementById('btnGenScramble');
  const textBox = document.getElementById('scrambleText');
  const preview = document.getElementById('cubeFacePreview');
  if (!btn || !textBox) return;

  const MOVES = ['U', "U'", 'U2', 'D', "D'", 'D2', 'R', "R'", 'R2', 'L', "L'", 'L2', 'F', "F'", 'F2', 'B', "B'", 'B2'];
  const COLORS = ['#ffffff', '#2ed573', '#ff4757', '#1e90ff', '#ff7f50', '#ffd32a'];

  btn.addEventListener('click', () => {
    // Generate valid 20-move scramble
    const scramble = [];
    let lastAxis = -1;
    const axisMap = { U: 0, D: 0, R: 1, L: 1, F: 2, B: 2 };

    while (scramble.length < 20) {
      const move = MOVES[Math.floor(Math.random() * MOVES.length)];
      const axis = axisMap[move[0]];
      if (axis !== lastAxis) {
        scramble.push(move);
        lastAxis = axis;
      }
    }

    textBox.textContent = scramble.join(' ');

    // Randomize preview tiles
    if (preview) {
      const tiles = preview.querySelectorAll('.c-tile');
      tiles.forEach(tile => {
        tile.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      });
    }

    playRetroSfx('blip');
    triggerAchievement('Speed Demon (12.06s PB)', '+80 EXP');
  });
}

// ── 7. INVENTORY BAG & LORE INSPECTOR ─────────────────────────
function initInventoryBag() {
  const slots = document.querySelectorAll('.item-slot');
  const inspector = document.getElementById('inventoryLoreText');
  if (!slots.length || !inspector) return;

  let exploredCount = 0;

  slots.forEach(slot => {
    const desc = slot.getAttribute('data-lore');

    slot.addEventListener('mouseenter', () => {
      inspector.textContent = desc;
      inspector.style.color = '#f1ebd9';
      playRetroSfx('blip');
    });

    slot.addEventListener('mouseleave', () => {
      const activeSlot = document.querySelector('.item-slot.active');
      if (activeSlot) {
        inspector.textContent = activeSlot.getAttribute('data-lore');
      } else {
        inspector.textContent = 'Select or hover over any inventory item above to inspect its stats & lore.';
        inspector.style.color = '#a4adc9';
      }
    });

    slot.addEventListener('click', () => {
      slots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
      inspector.textContent = desc;
      inspector.style.color = '#ffd32a';
      playRetroSfx('coin');

      exploredCount++;
      if (exploredCount >= 3) {
        triggerAchievement('Inventory Hoarder', '+75 EXP');
      }
    });
  });
}

// ── 8. GUITAR QUEST SCROLL TABS ──────────────────────────────
function initGuitarQuestTabs() {
  const tabs = document.querySelectorAll('.quest-tab-btn');
  const playList = document.getElementById('gtrQuestPlay');
  const learnList = document.getElementById('gtrQuestLearn');
  if (!tabs.length || !playList || !learnList) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (target === 'play') {
        playList.style.display = 'flex';
        learnList.style.display = 'none';
      } else {
        playList.style.display = 'none';
        learnList.style.display = 'flex';
      }
      playRetroSfx('tab');
      triggerAchievement('String Master', '+30 EXP');
    });
  });
}

// ── 9. CARTRIDGE PHOTO STACK CYCLER ──────────────────────────
function initPhotoCartridgeStack() {
  const stack = document.getElementById('rpgCartridgeStack');
  if (!stack) return;

  const cartridges = stack.querySelectorAll('.rpg-cartridge');
  let topIdx = 0;
  let cycleCount = 0;

  stack.addEventListener('click', () => {
    playRetroSfx('blip');

    const top = cartridges[topIdx];
    top.style.transition = 'none';
    top.style.transform = 'translateY(-20px) rotate(-8deg)';
    top.style.zIndex = '0';

    setTimeout(() => {
      top.style.transition = '';
      topIdx = (topIdx + 1) % cartridges.length;

      cartridges.forEach((c, i) => {
        const pos = (i - topIdx + cartridges.length) % cartridges.length;
        c.style.zIndex = (cartridges.length - pos).toString();
        if (pos === 0) c.style.transform = 'rotate(-3deg) translateY(0px)';
        else if (pos === 1) c.style.transform = 'rotate(3deg) translateY(8px)';
        else c.style.transform = 'rotate(-1deg) translateY(16px)';
      });
    }, 120);

    cycleCount++;
    if (cycleCount >= 3) {
      triggerAchievement('Memory Vault Keeper', '+100 EXP');
    }
  });
}

// ── 10. BOTTOM PAGER SOUNDS ──────────────────────────────────
function initPnavSounds() {
  const pnavBtns = document.querySelectorAll('#pnav .pb');
  pnavBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => playRetroSfx('tab'));
    btn.addEventListener('click', () => playRetroSfx('coin'));
  });

  const trophies = document.querySelectorAll('.trophy-card');
  trophies.forEach(t => {
    t.addEventListener('mouseenter', () => playRetroSfx('blip'));
  });
}
