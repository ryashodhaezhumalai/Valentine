/**
 * Valentine's Day Website - Interactions
 * - Secret heart click reveals hidden message
 * - Light confetti on reveal
 * - Smooth scroll to secret section after reveal
 * - Optional background music toggle
 * - Scroll reveal for About and Timeline sections
 */

(function () {
  'use strict';

  // ----- Elements -----
  const secretHeart = document.getElementById('secret-heart');
  const secretSection = document.getElementById('secret-message');
  const confettiContainer = document.getElementById('confetti-container');
  const musicToggle = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('bg-music');
  const secretAudio = document.getElementById('secret-audio');

  // ----- Scroll reveal: add .visible when element enters viewport -----
  const scrollRevealEls = document.querySelectorAll('.scroll-reveal');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  scrollRevealEls.forEach(function (el) {
    observer.observe(el);
  });

  // ----- Gallery: accept both .jpg and .jpeg per photo -----
  document.querySelectorAll('.gallery-item img[data-src-base]').forEach(function (img) {
    var base = img.getAttribute('data-src-base');
    if (!base) return;
    img.src = base + '.jpg';
    img.onerror = function () {
      this.src = base + '.jpeg';
      this.onerror = null;
    };
  });

  // ----- Gallery: click to flip card and show message on back -----
  document.querySelectorAll('.gallery-flip-card').forEach(function (card) {
    card.addEventListener('click', function () {
      this.classList.toggle('flipped');
    });
  });

  // ----- Secret heart: reveal hidden message on click -----
  if (secretHeart && secretSection) {
    secretHeart.addEventListener('click', function () {
      secretSection.classList.remove('hidden');
      secretSection.classList.add('revealed');
      secretSection.setAttribute('aria-hidden', 'false');

      // Light confetti effect
      createConfetti();

      // Play secret message audio when it has loaded (same click = browser allows play)
      if (secretAudio) {
        secretAudio.currentTime = 0;
        secretAudio.load();
        secretAudio.addEventListener('canplay', function () {
          secretAudio.play().catch(function () {});
        }, { once: true });
      }

      // Smooth scroll to secret message (section is fixed overlay; centers in view)
      setTimeout(function () {
        secretSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    });

    // Close secret message when clicking the backdrop (optional)
    var backdrop = secretSection.querySelector('.secret-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function () {
        secretSection.classList.add('hidden');
        secretSection.classList.remove('revealed');
        secretSection.setAttribute('aria-hidden', 'true');
        if (secretAudio) {
          secretAudio.pause();
          secretAudio.currentTime = 0;
        }
      });
    }
  }

  /**
   * Simple confetti: creates a handful of heart/particle elements that fall.
   * EDIT: Adjust count, colors, or duration below if desired.
   */
  function createConfetti() {
    if (!confettiContainer) return;

    const colors = ['#c75c5c', '#e8a0a0', '#c9a227', '#f5d0d0'];
    const count = 24;
    const duration = 2500;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.textContent = Math.random() > 0.5 ? '❤' : '•';
      piece.style.cssText =
        'position:absolute;' +
        'left:' + (Math.random() * 100) + '%;' +
        'top:-20px;' +
        'color:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
        'font-size:' + (12 + Math.random() * 14) + 'px;' +
        'animation:confettiFall ' + (duration / 1000) + 's ease-out forwards;' +
        'animation-delay:' + (Math.random() * 0.3) + 's;' +
        'pointer-events:none;';
      confettiContainer.appendChild(piece);

      setTimeout(function () {
        if (piece.parentNode) piece.parentNode.removeChild(piece);
      }, duration + 400);
    }
  }

  // Inject keyframes for confetti (one-time)
  const confettiStyle = document.createElement('style');
  confettiStyle.textContent =
    '@keyframes confettiFall {' +
    '0%{ opacity:1; transform: translateY(0) rotate(0deg); }' +
    '100%{ opacity:0; transform: translateY(100vh) rotate(720deg); }' +
    '}';
  document.head.appendChild(confettiStyle);

  // ----- Music toggle (play/pause) -----
  // EDIT: Add your audio file path in index.html <audio> src for music to work.
  if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', function () {
      if (bgMusic.paused) {
        bgMusic.play().catch(function () {
          // Autoplay may be blocked; user can click again after interaction
        });
        musicToggle.classList.add('playing');
        musicToggle.setAttribute('title', 'Pause music');
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.setAttribute('title', 'Play music');
      }
    });
  }
})();
