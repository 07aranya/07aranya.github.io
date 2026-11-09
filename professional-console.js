/**
 * Professional Tab: "The Systems Console" Controller
 * Manages project filtering, architecture spec drawers, copy-to-clipboard,
 * interactive contact dispatch, and telemetry status.
 */

document.addEventListener('DOMContentLoaded', initSystemsConsole);

function initSystemsConsole() {
  initProjectFilter();
  initSpecDrawers();
  initCopyActions();
  initContactDispatch();
  initProjectPhotosModal();
  initConsoleScrollReveal();
}

// ── 1. PROJECT FILTER BAR ───────────────────────────────────
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory.includes(targetCategory)) {
          card.style.display = '';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.25s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ── 2. SYSTEM ARCHITECTURE & SPEC DRAWERS ───────────────────
function initSpecDrawers() {
  const specDrawers = document.querySelectorAll('.spec-drawer');

  specDrawers.forEach(drawer => {
    const tabBtns = drawer.querySelectorAll('.spec-tab-btn');
    const tabPanes = drawer.querySelectorAll('.spec-tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activePane = drawer.querySelector(`.spec-tab-pane[data-pane="${targetTab}"]`);
        if (activePane) activePane.classList.add('active');
      });
    });
  });
}

// ── 3. RECRUITER COPY ACTIONS & TOAST ───────────────────────
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
          // Fallback
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

        showToast(`Copied ${email} to clipboard!`);

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
  window.showConsoleToast = showToast;
}

// ── 4. DIRECT DISPATCH MESSAGE TERMINAL ──────────────────────
function initContactDispatch() {
  const form = document.getElementById('contactForm');
  const resultEl = document.getElementById('formResult');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⚡</span> TRANSMITTING...`;
    }
    if (resultEl) {
      resultEl.className = 'dispatch-result-msg';
      resultEl.textContent = 'Transmitting dispatch packet via secure gateway...';
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
          resultEl.className = 'dispatch-result-msg success';
          resultEl.textContent = '✓ Dispatch transmitted successfully! Aranya will respond within 24 hours.';
        }
        form.reset();
        if (window.showConsoleToast) window.showConsoleToast('Message sent successfully!');
      } else {
        if (resultEl) {
          resultEl.className = 'dispatch-result-msg error';
          resultEl.textContent = `Transmission error: ${data.message || 'Please try reaching via direct email.'}`;
        }
      }
    } catch (err) {
      if (resultEl) {
        resultEl.className = 'dispatch-result-msg error';
        resultEl.textContent = 'Network error. Please reach out directly to 07aranya@gmail.com.';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Message <span class="cb-arrow">→</span>`;
      }
    }
  });
}

// ── 5. PROJECT PHOTOS MODAL ─────────────────────────────────
function initProjectPhotosModal() {
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

// ── 6. SCROLL REVEAL OBSERVER ───────────────────────────────
function initConsoleScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}
