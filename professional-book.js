/**
 * Professional Tab: "The Vintage Field / Inventor's Leather Journal" Controller
 * Manages two-page spread navigation, hanging ribbon bookmark jumps,
 * corner curl clicks, keyboard arrow flips, paper rustle audio synthesis,
 * media modals, and message dispatch.
 */

document.addEventListener('DOMContentLoaded', initLeatherJournal);

let currentSpreadIndex = 0;
const totalSpreads = 5; // 5 two-page spreads = 10 pages
let audioCtx = null;

function initLeatherJournal() {
  initAudioEngine();
  initSpreadNavigation();
  initBookmarkRibbons();
  initCornerPeels();
  initKeyboardNav();
  initCopyActions();
  initProjectMediaModals();
  initContactDispatch();
  updateSpreadDisplay();
}

// ── 1. SYNTHETIC PAPER FLIP AUDIO (Web Audio API) ───────────
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

function playPaperRustle() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const bufferSize = audioCtx.sampleRate * 0.18; // 180ms
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    // Filter to simulate soft fibrous parchment rustle
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, audioCtx.currentTime);
    filter.Q.setValueAtTime(1.8, audioCtx.currentTime);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.045, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start();
  } catch (e) {}
}

// ── 2. TWO-PAGE SPREAD NAVIGATION ───────────────────────────
function goToSpread(index) {
  if (index < 0 || index >= totalSpreads || index === currentSpreadIndex) return;

  const spreadContainer = document.getElementById('bookSpreadContainer');
  if (spreadContainer) {
    spreadContainer.style.opacity = '0.7';
    spreadContainer.style.transform = index > currentSpreadIndex ? 'scale(0.99) rotateY(-0.8deg)' : 'scale(0.99) rotateY(0.8deg)';
    spreadContainer.style.transition = 'all 0.16s ease';
  }

  playPaperRustle();

  setTimeout(() => {
    currentSpreadIndex = index;
    updateSpreadDisplay();

    if (spreadContainer) {
      spreadContainer.style.opacity = '1';
      spreadContainer.style.transform = 'scale(1) rotateY(0deg)';
    }

    // Scroll book into view gently if user is far down
    const casing = document.getElementById('leatherJournalCasing');
    if (casing && window.scrollY > 150) {
      casing.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 120);
}

function updateSpreadDisplay() {
  const spreads = document.querySelectorAll('.spread-chapter');
  spreads.forEach((spread, idx) => {
    spread.classList.toggle('active', idx === currentSpreadIndex);
  });

  // Update Ribbon bookmark indicators
  const ribbons = document.querySelectorAll('.ribbon-tab');
  ribbons.forEach((ribbon, idx) => {
    ribbon.classList.toggle('active', idx === currentSpreadIndex);
  });

  // Update Bottom Controls
  const prevBtn = document.getElementById('btnPrevSpread');
  const nextBtn = document.getElementById('btnNextSpread');
  const indicator = document.getElementById('spreadIndicator');

  if (prevBtn) prevBtn.disabled = currentSpreadIndex === 0;
  if (nextBtn) nextBtn.disabled = currentSpreadIndex === totalSpreads - 1;

  if (indicator) {
    const leftPageNum = currentSpreadIndex * 2 + 1;
    const rightPageNum = currentSpreadIndex * 2 + 2;
    indicator.textContent = `SPREAD 0${currentSpreadIndex + 1} // PAGES 0${leftPageNum}–${rightPageNum > 9 ? rightPageNum : '0' + rightPageNum} OF 10`;
  }
}

function initSpreadNavigation() {
  const prevBtn = document.getElementById('btnPrevSpread');
  const nextBtn = document.getElementById('btnNextSpread');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSpread(currentSpreadIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSpread(currentSpreadIndex + 1));
  }
}

// ── 3. BOOKMARK RIBBON TABS ─────────────────────────────────
function initBookmarkRibbons() {
  const ribbons = document.querySelectorAll('.ribbon-tab');
  ribbons.forEach(ribbon => {
    ribbon.addEventListener('click', () => {
      const spreadTarget = parseInt(ribbon.getAttribute('data-spread'), 10);
      if (!isNaN(spreadTarget)) {
        goToSpread(spreadTarget);
      }
    });
  });
}

// ── 4. CORNER CURL INTERACTION ──────────────────────────────
function initCornerPeels() {
  document.querySelectorAll('.corner-peel.right').forEach(peel => {
    peel.addEventListener('click', () => goToSpread(currentSpreadIndex + 1));
  });
  document.querySelectorAll('.corner-peel.left').forEach(peel => {
    peel.addEventListener('click', () => goToSpread(currentSpreadIndex - 1));
  });
}

// ── 5. KEYBOARD ARROW FLIPPING ──────────────────────────────
function initKeyboardNav() {
  window.addEventListener('keydown', (e) => {
    // Avoid flipping when typing in form inputs
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      goToSpread(currentSpreadIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      goToSpread(currentSpreadIndex - 1);
    }
  });
}

// ── 6. RECRUITER COPY ACTIONS & TOAST ───────────────────────
function initCopyActions() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('proToast');
  const toastMsg = document.getElementById('proToastMsg');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || '07aranya@gmail.com';

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const ta = document.createElement('textarea');
          ta.value = email;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }

        btn.classList.add('copied');
        const origText = btn.innerHTML;
        btn.innerHTML = `✓ Copied`;

        showToast(`Copied ${email} to clipboard`);

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = origText;
        }, 2500);
      } catch (err) {
        showToast(`Email: ${email}`);
      }
    });
  });

  function showToast(msg) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

// ── 7. PROJECT MEDIA / SCREENSHOT MODAL ─────────────────────
function initProjectMediaModals() {
  const projectPhotos = {
    vr: ['images/projects/vrgame.jpeg'],
    cbse: ['images/projects/cbse_new.png'],
    fn: ['images/projects/fruitninja.jpg'],
    asep: ['images/projects/asep.png'],
    aem: ['images/projects/aem.jpg']
  };

  let activePhotos = [];
  let photoIdx = 0;
  const pm = document.getElementById('photoModal');
  const pmImg = document.getElementById('pmImg');
  const pmCount = document.getElementById('pmCount');

  function openPhotoModal(key) {
    activePhotos = projectPhotos[key] || [];
    if (!activePhotos.length || !pm || !pmImg) return;
    photoIdx = 0;
    updatePhoto(0);
    pm.classList.add('open');
  }

  function updatePhoto(dir) {
    if (!activePhotos.length || !pmImg) return;
    if (dir !== 0) {
      pmImg.classList.add('fading');
      setTimeout(() => {
        photoIdx = (photoIdx + dir + activePhotos.length) % activePhotos.length;
        pmImg.src = activePhotos[photoIdx];
        if (pmCount) pmCount.textContent = (photoIdx + 1) + ' / ' + activePhotos.length;
        pmImg.onload = () => pmImg.classList.remove('fading');
      }, 200);
    } else {
      pmImg.src = activePhotos[photoIdx];
      if (pmCount) pmCount.textContent = (photoIdx + 1) + ' / ' + activePhotos.length;
    }
  }

  document.getElementById('vrPhotosBtn')?.addEventListener('click', (e) => { e.preventDefault(); openPhotoModal('vr'); });
  document.getElementById('cbsePhotosBtn')?.addEventListener('click', (e) => { e.preventDefault(); openPhotoModal('cbse'); });
  document.getElementById('fnPhotosBtn')?.addEventListener('click', (e) => { e.preventDefault(); openPhotoModal('fn'); });
  document.getElementById('asepPhotosBtn')?.addEventListener('click', (e) => { e.preventDefault(); openPhotoModal('asep'); });
  document.getElementById('aemPhotosBtn')?.addEventListener('click', (e) => { e.preventDefault(); openPhotoModal('aem'); });

  document.getElementById('pmClose')?.addEventListener('click', () => pm?.classList.remove('open'));
  document.getElementById('pmPrev')?.addEventListener('click', (e) => { e.stopPropagation(); updatePhoto(-1); });
  document.getElementById('pmNext')?.addEventListener('click', (e) => { e.stopPropagation(); updatePhoto(1); });
  pm?.addEventListener('click', (e) => { if (e.target === pm) pm.classList.remove('open'); });
}

// ── 8. CORRESPONDENCE DESK (WEB3FORMS) ──────────────────────
function initContactDispatch() {
  const form = document.getElementById('contactForm');
  const resultEl = document.getElementById('formResult');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sealing Letter...`;
    }
    if (resultEl) {
      resultEl.style.color = '#7c7469';
      resultEl.textContent = 'Transmitting correspondence...';
    }

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        if (resultEl) {
          resultEl.style.color = '#2e7d32';
          resultEl.textContent = '✓ Letter dispatched successfully. Aranya will reply within 24 hours.';
        }
        form.reset();
      } else {
        if (resultEl) {
          resultEl.style.color = '#8f2d22';
          resultEl.textContent = `Error: ${data.message || 'Please reach out via direct email.'}`;
        }
      }
    } catch (err) {
      if (resultEl) {
        resultEl.style.color = '#8f2d22';
        resultEl.textContent = 'Network error. Please email directly to 07aranya@gmail.com.';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Letter <span>→</span>`;
      }
    }
  });
}
