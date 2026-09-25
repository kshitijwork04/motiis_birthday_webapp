/**
 * ==============================================================
 * FOREVER & ALWAYS — ROMANTIC BIRTHDAY SURPRISE APP ENGINE
 * Vanilla JS with Web Audio Synthesizer, Confetti & Particle FX
 * ==============================================================
 */

(function () {
  'use strict';

  // --- DOM Elements ---
  const gateOverlay = document.getElementById('gateOverlay');
  const btnUnlock = document.getElementById('btnUnlock');
  const mainContent = document.getElementById('mainContent');

  // Safety fallback: if gateOverlay is missing or hidden, reveal content immediately
  if (!gateOverlay || window.getComputedStyle(gateOverlay).display === 'none') {
    if (mainContent) mainContent.classList.add('revealed');
  }

  // Cake & Candle
  const birthdayCandle = document.getElementById('birthdayCandle');
  const btnBlowCandle = document.getElementById('btnBlowCandle');
  const candleFlame = document.getElementById('candleFlame');
  const wishGrantedMessage = document.getElementById('wishGrantedMessage');
  const blowText = document.getElementById('blowText');

  // Reasons Carousel
  const reasonsCards = document.querySelectorAll('.reason-card');
  const btnPrevReason = document.getElementById('btnPrevReason');
  const btnNextReason = document.getElementById('btnNextReason');
  const reasonsDots = document.getElementById('reasonsDots');
  let currentReasonIndex = 0;

  // Wax Letter
  const waxEnvelope = document.getElementById('waxEnvelope');
  const waxSeal = document.getElementById('waxSeal');
  const letterTipText = document.getElementById('letterTipText');
  const letterPaper = document.getElementById('letterPaper');

  // Lightbox
  const photoLightbox = document.getElementById('photoLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const btnCloseLightbox = document.getElementById('btnCloseLightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const btnLightboxHeart = document.getElementById('btnLightboxHeart');

  // --- UNLOCK SURPRISE GATE ---
  let isUnlocking = false;

  btnUnlock.addEventListener('click', () => {
    if (isUnlocking) return;
    isUnlocking = true;

    btnUnlock.classList.add('clicked');

    // Calculate exact center coordinates of the crystal heart icon
    const heartSvg = gateOverlay ? gateOverlay.querySelector('.pulsing-heart-svg') : null;
    let burstX = window.innerWidth / 2;
    let burstY = window.innerHeight * 0.42;

    if (heartSvg) {
      const rect = heartSvg.getBoundingClientRect();
      burstX = rect.left + rect.width / 2;
      burstY = rect.top + rect.height / 2;
    }

    // 1. Trigger the majestic portal unlock & light bloom
    if (gateOverlay) {
      gateOverlay.classList.add('unlocking');
    }

    // 2. High-energy burst of hearts & confetti erupting from the heart
    burstConfetti(burstX, burstY, 80);
    burstHearts(burstX, burstY, 40);

    // 3. Staggered reveal of the main surprise webpage as gate card ascends
    setTimeout(() => {
      if (mainContent) {
        mainContent.classList.add('revealed');
      }
    }, 160);

    // 4. Secondary celebration shower as main content glides into place
    setTimeout(() => {
      burstConfetti(window.innerWidth / 2, window.innerHeight * 0.32, 35);
    }, 550);

    // 5. Complete transition and hide gate
    setTimeout(() => {
      if (gateOverlay) {
        gateOverlay.classList.add('fade-out');
      }
    }, 420);

    setTimeout(() => {
      if (gateOverlay) {
        gateOverlay.style.display = 'none';
      }
    }, 900);
  });

  // --- CANDLE BLOW & RELIGHT INTERACTION ---
  let isCandleBlown = false;

  function blowOutCandle(e) {
    if (isCandleBlown) {
      // Relight candle so she can make another wish anytime!
      isCandleBlown = false;
      birthdayCandle.classList.remove('blown');
      blowText.textContent = 'Tap Candle Or Button To Blow 💨';
      tapHeartSparks(window.innerWidth / 2, window.innerHeight * 0.4);
      return;
    }

    isCandleBlown = true;
    birthdayCandle.classList.add('blown');
    blowText.textContent = 'Wish Made With Love ✨';
    wishGrantedMessage.classList.remove('hidden');

    const rect = birthdayCandle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    burstConfetti(x, y, 120);
    burstHearts(x, y, 45);

    setTimeout(() => {
      if (isCandleBlown) {
        blowText.textContent = '🕯️ Relight Candle & Make Another Wish ✨';
      }
    }, 2800);
  }

  birthdayCandle.addEventListener('click', blowOutCandle);
  btnBlowCandle.addEventListener('click', blowOutCandle);

  // --- REASONS CAROUSEL ---
  function updateReasonCard(index) {
    reasonsCards.forEach((card, idx) => {
      card.classList.toggle('active', idx === index);
    });

    const dots = reasonsDots.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    currentReasonIndex = index;
  }

  btnNextReason.addEventListener('click', () => {
    let nextIndex = (currentReasonIndex + 1) % reasonsCards.length;
    updateReasonCard(nextIndex);
  });

  btnPrevReason.addEventListener('click', () => {
    let prevIndex = (currentReasonIndex - 1 + reasonsCards.length) % reasonsCards.length;
    updateReasonCard(prevIndex);
  });

  // Touch Swipe for Mobile
  const reasonsDeck = document.getElementById('reasonsDeck');
  let touchStartX = 0;
  let touchEndX = 0;

  reasonsDeck.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  reasonsDeck.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      // Swiped left
      let nextIndex = (currentReasonIndex + 1) % reasonsCards.length;
      updateReasonCard(nextIndex);
    } else if (touchEndX - touchStartX > 45) {
      // Swiped right
      let prevIndex = (currentReasonIndex - 1 + reasonsCards.length) % reasonsCards.length;
      updateReasonCard(prevIndex);
    }
  }, { passive: true });

  // --- WAX-SEALED LOVE LETTER ---
  let isEnvelopeOpen = false;

  function openEnvelope() {
    if (isEnvelopeOpen) return;
    isEnvelopeOpen = true;

    waxEnvelope.classList.add('open');
    letterTipText.textContent = '✨ Tap outside the letter to fold it back ✨';

    const rect = waxSeal.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
    burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
  }

  function closeEnvelope() {
    if (!isEnvelopeOpen) return;
    isEnvelopeOpen = false;

    waxEnvelope.classList.remove('open');
    if (letterPaper) {
      letterPaper.scrollTop = 0;
    }
    letterTipText.textContent = '👆 Tap the wax seal to open';
  }

  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelope();
  });

  // Close letter automatically when clicking anywhere outside of it
  document.addEventListener('click', (e) => {
    if (!isEnvelopeOpen) return;

    // If click is inside the envelope (reading/scrolling letter), do not close
    if (waxEnvelope.contains(e.target)) return;

    // Clicked outside: fold letter back inside envelope
    closeEnvelope();
  });



  // --- POLAROID LIGHTBOX ---
  const polaroids = document.querySelectorAll('.polaroid-item');
  polaroids.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.polaroid-img');
      const title = item.dataset.title || 'Special Memory';
      const caption = item.dataset.caption || '';

      lightboxImg.src = img.src;
      lightboxTitle.textContent = title;
      lightboxCaption.textContent = caption;
      lightboxCaption.style.display = caption ? 'block' : 'none';

      photoLightbox.classList.add('active');
      photoLightbox.setAttribute('aria-hidden', 'false');
    });
  });

  function closeLightbox() {
    photoLightbox.classList.remove('active');
    photoLightbox.setAttribute('aria-hidden', 'true');
  }

  btnCloseLightbox.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  btnLightboxHeart.addEventListener('click', (e) => {
    const rect = btnLightboxHeart.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
    spawnFloatingEmoji(rect.left + rect.width / 2, rect.top, '💖');
  });



  // ==============================================================
  // CANVAS ENGINE: AMBIENT FLOATING HEARTS & STARRY BACKGROUND
  // ==============================================================
  const ambientCanvas = document.getElementById('ambientCanvas');
  const ambientCtx = ambientCanvas.getContext('2d');
  let ambientWidth, ambientHeight;

  function resizeAmbientCanvas() {
    ambientWidth = ambientCanvas.width = window.innerWidth;
    ambientHeight = ambientCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeAmbientCanvas);
  resizeAmbientCanvas();

  // Starry Particles (optimized count for 60fps mobile)
  const stars = [];
  for (let i = 0; i < 22; i++) {
    stars.push({
      x: Math.random() * ambientWidth,
      y: Math.random() * ambientHeight,
      radius: Math.random() * 1.4 + 0.6,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.015 + 0.005
    });
  }

  // Floating Hearts (optimized count for 60fps mobile)
  const floatingHearts = [];
  for (let i = 0; i < 9; i++) {
    floatingHearts.push({
      x: Math.random() * ambientWidth,
      y: Math.random() * ambientHeight + ambientHeight,
      size: Math.random() * 10 + 8,
      speedY: Math.random() * 0.6 + 0.25,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.15,
      color: Math.random() > 0.4 ? '#ff4370' : '#ff95b2'
    });
  }

  function drawHeart(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.3);
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animateAmbient() {
    ambientCtx.clearRect(0, 0, ambientWidth, ambientHeight);

    // Draw Stars
    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 0.9 || s.alpha < 0.15) s.speed = -s.speed;
      ambientCtx.beginPath();
      ambientCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ambientCtx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, s.alpha)})`;
      ambientCtx.fill();
    });

    // Draw Floating Hearts
    floatingHearts.forEach(h => {
      h.y -= h.speedY;
      h.x += h.speedX;
      if (h.y < -30) {
        h.y = ambientHeight + 20;
        h.x = Math.random() * ambientWidth;
      }
      drawHeart(ambientCtx, h.x, h.y, h.size, h.color, h.opacity);
    });

    requestAnimationFrame(animateAmbient);
  }
  requestAnimationFrame(animateAmbient);

  // ==============================================================
  // FX CANVAS: CONFETTI & BURST PARTICLES
  // ==============================================================
  const fxCanvas = document.getElementById('fxCanvas');
  const fxCtx = fxCanvas.getContext('2d');
  let fxWidth, fxHeight;

  function resizeFxCanvas() {
    fxWidth = fxCanvas.width = window.innerWidth;
    fxHeight = fxCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeFxCanvas);
  resizeFxCanvas();

  const particles = [];
  const confettiColors = ['#ff4370', '#f5cf68', '#cbb2fe', '#ffffff', '#ff95b2', '#ff6584'];
  let fxRunning = false;

  function ensureFxRunning() {
    if (!fxRunning) {
      fxRunning = true;
      requestAnimationFrame(animateFx);
    }
  }

  function burstConfetti(originX, originY, count = 50) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2.5;
      particles.push({
        type: 'confetti',
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        width: Math.random() * 7 + 3,
        height: Math.random() * 5 + 3,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        life: 1,
        decay: Math.random() * 0.016 + 0.01
      });
    }
    ensureFxRunning();
  }

  function burstHearts(originX, originY, count = 22) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      particles.push({
        type: 'heart',
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.8,
        size: Math.random() * 10 + 8,
        color: Math.random() > 0.3 ? '#ff4370' : '#f5cf68',
        life: 1,
        decay: Math.random() * 0.02 + 0.012
      });
    }
    ensureFxRunning();
  }

  // Delicate micro-heart sparks for touch/tap anywhere
  function tapHeartSparks(originX, originY) {
    const colors = ['#ff4370', '#f5cf68', '#ff95b2', '#ffd1dc'];
    for (let i = 0; i < 3; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      const speed = Math.random() * 2.5 + 1;
      particles.push({
        type: 'heart',
        x: originX + (Math.random() - 0.5) * 8,
        y: originY + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: Math.random() * 6 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: Math.random() * 0.035 + 0.025
      });
    }
    ensureFxRunning();
  }

  // Interactive spark trail on any tap / touch on screen
  window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.lightbox-close') || e.target.closest('.nav-arrow')) return;
    tapHeartSparks(e.clientX, e.clientY);
  }, { passive: true });

  function animateFx() {
    if (particles.length === 0) {
      fxCtx.clearRect(0, 0, fxWidth, fxHeight);
      fxRunning = false;
      return; // Stop animation loop when idle to preserve 60/120fps!
    }

    fxCtx.clearRect(0, 0, fxWidth, fxHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.16; // gravity
      p.vx *= 0.98; // air resistance
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      if (p.type === 'confetti') {
        p.rotation += p.rotationSpeed;
        fxCtx.save();
        fxCtx.globalAlpha = p.life;
        fxCtx.translate(p.x, p.y);
        fxCtx.rotate((p.rotation * Math.PI) / 180);
        fxCtx.fillStyle = p.color;
        fxCtx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        fxCtx.restore();
      } else if (p.type === 'heart') {
        drawHeart(fxCtx, p.x, p.y, p.size, p.color, p.life);
      }
    }

    if (particles.length > 0) {
      requestAnimationFrame(animateFx);
    } else {
      fxCtx.clearRect(0, 0, fxWidth, fxHeight);
      fxRunning = false;
    }
  }

})();
