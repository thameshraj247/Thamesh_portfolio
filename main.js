/**
 * THAMESH RAJ G — Clean Executive Portfolio Controller
 * Dynamic Ambient Constellation Particles, 3D Mouse Perspective,
 * Holographic Glint, and Interactive Card Spotlights.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomFuturisticCursor();
  initScrollProgress();
  initNavigation();
  initBackgroundParticles();
  initHeroPhoto3DTilt();
  initHeroToAboutScrollFlight();
  initCardInteractiveEffects();
  initProjectScrollReveal();
  initTimelineScrollAnimation();
  initMatrixDossierTabs();
  initMatrixSimulationButtons();
  init3DInteractiveModels();
  initContactWarpTransition();
  initContactForm();
});

/* ==========================================================================
   0. FUTURISTIC KINETIC DUAL-LAYER CURSOR CONTROLLER
   ========================================================================== */
function initCustomFuturisticCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const glow = document.getElementById('cursorGlow');

  if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  // Mark body so CSS only hides native cursor when custom cursor is actually active
  document.body.classList.add('custom-cursor-enabled');

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let glowX = -100;
  let glowY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      if (glow) glow.style.opacity = '1';
    }

    // Instant direct placement for precision pointer dot
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth kinetic interpolation for follower ring & ambient glow
  function renderFollower() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    if (glow) {
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;
    }

    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  // Hover states over all interactive targets
  const interactives = document.querySelectorAll('a, button, input, textarea, .pro-card, .skill-tag, .social-link, [role="button"]');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Tactile click states
  window.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
  window.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));

  // Hide on mouseleave viewport
  window.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    if (glow) glow.style.opacity = '0';
    isVisible = false;
  });
}

/* ==========================================================================
   1. SCROLL PROGRESS
   ========================================================================== */
function initScrollProgress() {
  const line = document.getElementById('scrollProgressLine');
  if (!line) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.pageYOffset / total) * 100 : 0;
    line.style.width = `${progress}%`;
  });
}

/* ==========================================================================
   2. DYNAMIC AMBIENT PARTICLES (LIGHT FLOATING CRIMSON DUST)
   ========================================================================== */
function initBackgroundParticles() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const count = Math.min(width > 768 ? 55 : 25, 65);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.6 + 0.6,
      color: Math.random() > 0.4 ? 'rgba(255, 46, 76, 0.45)' : 'rgba(255, 71, 87, 0.3)'
    });
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Gentle interactive mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 1.5;
          p.y -= Math.sin(angle) * force * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Delicate CRIMSON connecting constellation lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 46, 76, ${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(loop);
  }
  loop();
}

/* ==========================================================================
   3. HERO PHOTO 3D PERSPECTIVE TILT
   ========================================================================== */
function initHeroPhoto3DTilt() {
  const wrap = document.getElementById('heroPhotoWrap');
  const card = document.getElementById('heroPhotoCard');

  if (!wrap || !card || window.matchMedia('(pointer: coarse)').matches) return;

  wrap.addEventListener('mousemove', (e) => {
    // If during scroll flight travel, keep transform driven by scroll
    if (window.pageYOffset > 60) return;

    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  wrap.addEventListener('mouseleave', () => {
    if (window.pageYOffset <= 60) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
  });
}

/* ==========================================================================
   3.5 SINGLE DYNAMIC CARD: FLIGHT & 3D 180° FLIP INTO ABOUT DOCK
   ========================================================================== */
function initHeroToAboutScrollFlight() {
  const heroCard = document.getElementById('heroPhotoCard');
  const heroWrap = document.getElementById('heroPhotoWrap');
  const aboutDock = document.getElementById('aboutPhotoDock');
  const aboutTextCol = document.querySelector('.about-text-column');

  if (!heroCard || !heroWrap || !aboutDock) return;

  function updateScrollFlight() {
    const scrollY = window.pageYOffset;
    const heroWrapRect = heroWrap.getBoundingClientRect();
    const aboutDockRect = aboutDock.getBoundingClientRect();

    const heroAbsTop = heroWrapRect.top + scrollY;
    const heroAbsLeft = heroWrapRect.left;
    const aboutAbsTop = aboutDockRect.top + scrollY;
    const aboutAbsLeft = aboutDockRect.left;

    const totalDeltaY = aboutAbsTop - heroAbsTop;
    const totalDeltaX = aboutAbsLeft - heroAbsLeft;

    const startFlight = 20;
    // Dynamic end flight calibrated for both desktop and mobile/tablet layouts
    const endFlight = Math.max(aboutAbsTop - (window.innerHeight * 0.28), 280);

    // Always reveal about text once user scrolls near the about section
    if (scrollY > (aboutAbsTop - window.innerHeight * 0.75)) {
      if (aboutTextCol) aboutTextCol.classList.add('is-revealed');
    } else {
      if (aboutTextCol) aboutTextCol.classList.remove('is-revealed');
    }

    if (scrollY <= startFlight) {
      // 1. Resting at Hero section: Front face active (rotateY = 0)
      heroCard.style.transform = 'translate3d(0, 0, 0) rotateY(0deg) scale(1)';
      heroCard.style.boxShadow = '';
      heroCard.style.zIndex = '5';
    } else if (scrollY > startFlight && scrollY < endFlight) {
      // 2. Flying down & Flips in 3D mid-air across all devices (mobile, tablet & desktop)
      const progress = Math.min(Math.max((scrollY - startFlight) / (endFlight - startFlight), 0), 1);
      const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const currentDeltaX = totalDeltaX * ease;
      const currentDeltaY = totalDeltaY * ease;

      // 3D 360° Flip around Y axis as it descends so it lands clean and front-facing!
      const flipRotationY = ease * 360;
      const flightTiltZ = Math.sin(progress * Math.PI) * -6;
      const flightScale = 1 + Math.sin(progress * Math.PI) * 0.08;

      heroCard.style.transform = `translate3d(${currentDeltaX.toFixed(1)}px, ${currentDeltaY.toFixed(1)}px, 0) rotateY(${flipRotationY.toFixed(1)}deg) rotateZ(${flightTiltZ.toFixed(1)}deg) scale(${flightScale.toFixed(2)})`;
      heroCard.style.boxShadow = `0 35px 80px rgba(0,0,0,0.95), 0 0 ${Math.round(40 + progress * 25)}px rgba(255, 46, 76, 0.7)`;
      heroCard.style.zIndex = '999';
    } else {
      // 3. Fully landed and docked inside About: Completed full 360° flip back to original front face!
      heroCard.style.transform = `translate3d(${totalDeltaX.toFixed(1)}px, ${totalDeltaY.toFixed(1)}px, 0) rotateY(360deg) scale(1)`;
      heroCard.style.boxShadow = '0 30px 75px -10px rgba(0, 0, 0, 0.95), 0 0 45px rgba(255, 46, 76, 0.35)';
      heroCard.style.zIndex = '5';
    }
  }

  window.addEventListener('scroll', updateScrollFlight, { passive: true });
  window.addEventListener('resize', updateScrollFlight, { passive: true });
  window.addEventListener('orientationchange', updateScrollFlight, { passive: true });
  updateScrollFlight();
}

/* ==========================================================================
   4. ADVANCED 3D TILT & MOUSE SPOTLIGHT ENGINE FOR ALL SECTION & MATRIX DOSSIER CARDS
   ========================================================================== */
function initCardInteractiveEffects() {
  const cards = document.querySelectorAll('.pro-card, .matrix-dossier-card');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  cards.forEach(card => {
    // Add real-time radial cursor spotlight if not already present
    if (!card.querySelector('.card-spotlight')) {
      const spotlight = document.createElement('div');
      spotlight.className = 'card-spotlight';
      card.prepend(spotlight);
    }

    if (isTouch) return;

    if (!card.parentElement.style.perspective) {
      card.parentElement.style.perspective = '1400px';
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Adjust max tilt angle based on card size
      const maxAngle = card.classList.contains('matrix-dossier-card') ? 4 : 7;
      const rotateX = ((y - centerY) / centerY) * -maxAngle;
      const rotateY = ((x - centerX) / centerX) * maxAngle;

      card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   5. NAVIGATION & SCROLL TRACKING
   ========================================================================== */
function initNavigation() {
  const toggle = document.getElementById('mobileNavToggle');
  const menu = document.getElementById('navMenu');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (toggle && menu) {
    const handleToggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.toggle('open');
      const icon = toggle.querySelector('i');
      if (icon) {
        if (menu.classList.contains('open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    };

    toggle.addEventListener('click', handleToggle);

    links.forEach(l => {
      l.addEventListener('click', () => {
        menu.classList.remove('open');
        const icon = toggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        const icon = toggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  const header = document.getElementById('mainHeader');

  window.addEventListener('scroll', () => {
    // Dynamic Header Elevation on scroll
    if (header) {
      if (window.pageYOffset > 50) {
        header.classList.add('scrolled-down');
      } else {
        header.classList.remove('scrolled-down');
      }
    }

    let current = '';
    const pos = window.pageYOffset + 200;

    sections.forEach(s => {
      const top = s.offsetTop;
      const height = s.offsetHeight;
      if (pos >= top && pos < top + height) {
        current = s.getAttribute('id');
      }
    });

    links.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${current}`) {
        l.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5.5 PROJECT SPLIT-CARDS SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initProjectScrollReveal() {
  const cards = document.querySelectorAll('[data-scroll-reveal]');
  if (!cards.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target); // Once revealed, stay smooth and steady
        }
      });
    }, {
      root: null,
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px'
    });

    cards.forEach((card, index) => {
      // Staggered cinematic reveal delay on desktop, responsive instantaneous on mobile
      const isMobile = window.innerWidth <= 768;
      card.style.transitionDelay = isMobile ? '0s' : `${index * 0.15}s`;
      observer.observe(card);
    });
  } else {
    // Fallback for older browsers
    cards.forEach(card => card.classList.add('is-revealed'));
  }
}

/* ==========================================================================
   5.5.1 SHADCN TIMELINE-01 ANIMATED SCROLL CONTROLLER (SPINE FILL & TRACER DOT)
   ========================================================================== */
function initTimelineScrollAnimation() {
  const timeline = document.getElementById('modernTimeline');
  const spineFill = document.getElementById('timelineSpineFill');
  const nodes = document.querySelectorAll('[data-timeline-reveal]');

  if (!timeline || !spineFill) return;

  function updateTimelineProgress() {
    const rect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Timeline starts tracing when top hits viewport center, finishes when bottom hits center
    const startY = windowH * 0.75;
    const endY = windowH * 0.25;

    const totalHeight = rect.height;
    const currentProgress = (startY - rect.top) / (totalHeight + (startY - endY));
    const clampedProgress = Math.min(Math.max(currentProgress, 0), 1);

    spineFill.style.height = `${(clampedProgress * 100).toFixed(2)}%`;
  }

  // Node Entrance Observer
  if ('IntersectionObserver' in window) {
    const nodeObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    nodes.forEach((node, index) => {
      node.style.transitionDelay = `${index * 0.15}s`;
      nodeObserver.observe(node);
    });
  } else {
    nodes.forEach(node => node.classList.add('is-revealed'));
  }

  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  window.addEventListener('resize', updateTimelineProgress, { passive: true });
  updateTimelineProgress();
}

/* ==========================================================================
   5.6 RETRO CYBER MATRIX DOSSIER CONTROLLER (TABS & EXECUTE_SIM)
   ========================================================================== */
function initMatrixDossierTabs() {
  const tabButtons = document.querySelectorAll('.m-term-tab');
  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-tab');
      if (!targetId) return;

      const parentTerminal = btn.closest('.matrix-terminal-pane');
      if (!parentTerminal) return;

      // Update button active state
      parentTerminal.querySelectorAll('.m-term-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update tab pane view
      parentTerminal.querySelectorAll('.m-tab-view').forEach(view => view.classList.remove('active'));
      const activeView = parentTerminal.querySelector(`#${targetId}`);
      if (activeView) {
        activeView.classList.add('active');
      }
    });
  });
}

function initMatrixSimulationButtons() {
  const simButtons = document.querySelectorAll('.run-sim-btn');
  if (!simButtons.length) return;

  simButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-sim-target');
      const consoleBox = document.getElementById(targetId);
      if (!consoleBox) return;

      // Ensure runtime tab is active
      const pane = consoleBox.closest('.matrix-terminal-pane');
      if (pane) {
        const runtimeTab = pane.querySelector('.m-term-tab:first-child');
        if (runtimeTab) runtimeTab.click();
      }

      // Add animated execution pulse
      consoleBox.style.boxShadow = '0 0 35px rgba(255, 46, 76, 0.8), inset 0 0 25px rgba(0, 0, 0, 0.95)';
      consoleBox.style.borderColor = '#FF2E4C';

      const originalBtnText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>EXECUTING...</span>';
      btn.style.borderColor = '#38E05A';
      btn.style.color = '#38E05A';

      setTimeout(() => {
        consoleBox.style.boxShadow = '';
        consoleBox.style.borderColor = '';
        btn.innerHTML = '<i class="fas fa-check"></i> <span>EXECUTED (200 OK)</span>';

        setTimeout(() => {
          btn.innerHTML = originalBtnText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2200);
      }, 700);
    });
  });
}

/* ==========================================================================
   5.7 3D HOLOGRAPHIC MODELS MOUSE PERSPECTIVE TRACKER
   ========================================================================== */
function init3DInteractiveModels() {
  const viewports = document.querySelectorAll('.model-3d-viewport');
  if (!viewports.length || window.matchMedia('(pointer: coarse)').matches) return;

  viewports.forEach(vp => {
    const scene = vp.querySelector('.model-3d-scene');
    if (!scene) return;

    vp.addEventListener('mousemove', (e) => {
      const rect = vp.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 22;
      const rotateX = ((y - centerY) / centerY) * -18;

      scene.style.transform = `rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) scale(1.05)`;
    });

    vp.addEventListener('mouseleave', () => {
      scene.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

/* ==========================================================================
   5.8 WARP-JUMP TRANSITION ANIMATION TO CONTACT SECTION
   ========================================================================== */
function initContactWarpTransition() {
  const triggerBtns = document.querySelectorAll('.contact-trigger-btn, a[href="#contact"]');
  const overlay = document.getElementById('warpJumpOverlay');
  const contactSection = document.getElementById('contact');
  const contactForm = document.querySelector('.contact-form');

  if (!triggerBtns.length || !overlay || !contactSection) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Tactile button shockwave
      btn.classList.add('contact-btn-shockwave');
      setTimeout(() => btn.classList.remove('contact-btn-shockwave'), 500);

      // Trigger Warp-Jump Overlay with expanding 3D Laser Rings
      overlay.classList.add('active');

      // Play short hyperspace warping pause, then execute cinematic scroll
      setTimeout(() => {
        // Smoothly glide viewport directly to contact section
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Fade out warp overlay smoothly after arrival
        setTimeout(() => {
          overlay.classList.remove('active');

          // Highlight and lock onto contact form
          if (contactForm) {
            contactForm.classList.remove('warp-target-locked');
            void contactForm.offsetWidth; // Trigger reflow
            contactForm.classList.add('warp-target-locked');

            // Auto-focus the name field for immediate typing
            const firstInput = contactForm.querySelector('input#name');
            if (firstInput) {
              setTimeout(() => firstInput.focus(), 300);
            }
          }
        }, 450);
      }, 750);
    });
  });
}

/* ==========================================================================
   6. CONTACT FORM (VALIDATION & INSTANT MAILTO)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const subject = form.elements['subject'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill out all fields.");
      return;
    }

    const mailto = `mailto:tamilthamesh247@gmail.com?subject=${encodeURIComponent(subject + " - " + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;

    if (status) {
      status.style.display = 'block';
      status.className = 'form-status success';
      status.textContent = 'Opening your email client to send message...';
    }

    setTimeout(() => {
      window.location.href = mailto;
      form.reset();
    }, 1000);
  });
}
