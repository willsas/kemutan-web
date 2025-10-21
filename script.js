// Minimal interactivity for Kemutan landing page
document.addEventListener('DOMContentLoaded', () => {
  // -- small utilities
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  // set copyright year
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // dark-mode removed: no theme toggle behavior

  // hero video preview on hover of thumbnails
  const heroVideo = qs('.hero-video');
  qsa('.preview-item img').forEach((img, i) => {
    img.addEventListener('mouseenter', () => {
      if (!heroVideo) return;
      try { heroVideo.currentTime = Math.min(i * 1.2, 3); } catch (e) {}
      heroVideo.play().catch(() => {});
    });
  });

  // Ensure hero video will play after a user gesture on mobile where autoplay may be blocked
  const startHeroOnInteraction = () => { if (heroVideo) heroVideo.play().catch(()=>{}); window.removeEventListener('click', startHeroOnInteraction); };
  window.addEventListener('click', startHeroOnInteraction, { once: true });

  // Fallback: some browsers or overlays can block anchor clicks on badges.
  // Add a robust click handler that opens the target in a new tab/window if the default navigation doesn't occur.
  function addBadgeFallback() {
    const openUrl = (href) => {
      try {
        // prefer window.open to bypass cases where anchor clicks are swallowed
        const win = window.open(href, '_blank');
        if (win && win.focus) win.focus();
      } catch (e) {
        // last-resort navigation
        location.href = href;
      }
    };

    qsa('.app-badge, .nav-cta').forEach((el) => {
      // ensure it's an anchor or has an href
      const href = el.getAttribute('href') || el.querySelector && el.querySelector('a')?.getAttribute('href');
      if (!href) return;
      // Click handler: try native, then fallback to window.open
      el.addEventListener('click', (ev) => {
        // If the anchor worked normally, we don't need anything; but some overlays prevent it.
        // Use setTimeout to detect if navigation was triggered — fallback immediately to open.
        // To avoid double-opening, prevent default and open programmatically.
        ev.preventDefault();
        openUrl(href);
      });
      // also support touchend for some mobile quirks
      el.addEventListener('touchend', (ev) => {
        ev.preventDefault();
        openUrl(href);
      }, { passive: false });
    });
  }
  addBadgeFallback();

  // modal helpers
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    const focusable = modal.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Features modal: open via button or feature-card
  const featuresModal = qs('#features-modal');
  qsa('#features-btn, .feature-card').forEach(el => {
    el.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.feature-card');
      const key = card ? card.getAttribute('data-feature') : null;
      if (featuresModal && key) {
        const panel = qs('.modal-panel', featuresModal);
        if (panel) {
          let html = '<h3>Main features</h3>';
          if (key === 'scan') html += '<p><strong>Scan Photo</strong> — Fast printed-photo recognition and seamless AR overlay.</p>';
          else if (key === 'icloud') html += '<p><strong>iCloud Sync</strong> — Secure sync across your devices via iCloud.</p>';
          else if (key === 'shared') html += '<p><strong>Shared Albums</strong> — Collaborate with friends and family via Shared Albums.</p>';
          else if (key === 'ar') html += '<p><strong>AR Playback</strong> — Play videos directly over the printed photo in augmented reality.</p>';
          else html += panel.innerHTML;
          html += '<button class="modal-close" aria-label="Close">Close</button>';
          panel.innerHTML = html;
          qs('.modal-close', panel).addEventListener('click', () => closeModal(featuresModal));
        }
      }
      if (featuresModal) openModal(featuresModal);
    });
  });

  // Photo gallery modal
  const photoModal = qs('#photo-modal');
  const photoFull = qs('#photo-full');
  const cards = qsa('.card');
  let currentIndex = -1;

  function openPhotoAt(index) {
    if (!cards.length) return;
    const idx = ((index % cards.length) + cards.length) % cards.length;
    const card = cards[idx];
    const full = card && card.getAttribute('data-full');
    if (photoFull && full) photoFull.src = full;
    const download = qs('#download-photo');
    if (download && full) download.href = full;
    currentIndex = idx;
    openModal(photoModal);
  }

  cards.forEach((c, i) => {
    c.addEventListener('click', () => openPhotoAt(i));
    c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPhotoAt(i); } });
  });

  qs('#prev-photo')?.addEventListener('click', () => openPhotoAt(currentIndex - 1));
  qs('#next-photo')?.addEventListener('click', () => openPhotoAt(currentIndex + 1));

  // close handlers for any modal
  qsa('.modal .modal-close').forEach(btn => btn.addEventListener('click', (e) => {
    const modal = e.currentTarget.closest('.modal');
    closeModal(modal);
  }));
  qsa('.modal .modal-backdrop').forEach(back => back.addEventListener('click', (e) => {
    const modal = e.currentTarget.closest('.modal');
    closeModal(modal);
  }));

  // global keyboard handlers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') qsa('.modal.open').forEach(m => closeModal(m));
    const openPhoto = document.querySelector('#photo-modal.open');
    if (openPhoto) {
      if (e.key === 'ArrowLeft') openPhotoAt(currentIndex - 1);
      if (e.key === 'ArrowRight') openPhotoAt(currentIndex + 1);
    }
  });

  // focus containment: simple trap
  document.addEventListener('focusin', (e) => {
    const open = document.querySelector('.modal.open');
    if (!open) return;
    if (!open.contains(e.target)) {
      const close = qs('.modal-close', open);
      if (close) close.focus();
    }
  });
});
