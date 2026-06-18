/* =========================================================================
   Liv120 — GLP-1 Listicle Landing Page
   main.js  ·  Minimal, dependency-free interactions
   --------------------------------------------------------------------------
   1. Scroll reveal   — gentle, once-only opacity fade via IntersectionObserver
   2. Mobile menu     — burger toggles the slide-in drawer + scrim
   3. FAQ accordion   — one row opens at a time, animated max-height
   4. Countdown timer — soft urgency clock in the announcement bar
   No libraries. No slide/scale/parallax. Respects prefers-reduced-motion.
   ========================================================================= */
(function () {
  'use strict';

  /* ===== 1. SCROLL REVEAL ===== */
  // Each .reveal element fades from 0 -> 1 once, when ~18% into the viewport,
  // then stops observing. CSS owns the timing; JS only flips the class.
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    var reduced = window.matchMedia &&
                  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No IntersectionObserver (or reduced motion): show everything immediately.
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // play once — never repeat
        }
      });
    }, {
      // Trigger a touch before the element is fully on screen (~18% from bottom).
      rootMargin: '0px 0px -18% 0px',
      threshold: 0.01
    });

    items.forEach(function (el) { observer.observe(el); });
  }
  /* ===== 1. SCROLL REVEAL END ===== */


  /* ===== 2. MOBILE MENU ===== */
  // Burger toggles .menu-open on the <header id="nav">; CSS handles the
  // drawer transform, scrim fade, and burger->X morph. Closes on scrim tap,
  // any drawer link, or Escape.
  function initMenu() {
    var nav    = document.getElementById('nav');
    var burger = document.getElementById('burger');
    var scrim  = document.getElementById('scrim');
    var drawerClose = document.getElementById('drawer-close');
    if (!nav || !burger) return;

    var drawer = nav.querySelector('.nav-drawer');

    function setOpen(open) {
      nav.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      // Lock background scroll while the drawer is open.
      document.body.style.overflow = open ? 'hidden' : '';
    }

    burger.addEventListener('click', function () {
      setOpen(!nav.classList.contains('menu-open'));
    });

    if (scrim) scrim.addEventListener('click', function () { setOpen(false); });
    if (drawerClose) drawerClose.addEventListener('click', function () { setOpen(false); });

    // Tapping any link inside the drawer navigates and closes the menu.
    if (drawer) {
      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setOpen(false); });
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('menu-open')) setOpen(false);
    });
  }
  /* ===== 2. MOBILE MENU END ===== */


  /* ===== 3. FAQ ACCORDION ===== */
  // Click a question to expand its answer. Opening one closes the others for
  // a tidy, single-focus read. max-height is set to scrollHeight so the
  // CSS transition can animate, then cleared on close.
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    function close(item) {
      var btn = item.querySelector('.faq-q');
      var ans = item.querySelector('.faq-a');
      item.classList.remove('open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (ans) ans.style.maxHeight = null;
    }

    function open(item) {
      var btn = item.querySelector('.faq-q');
      var ans = item.querySelector('.faq-a');
      item.classList.add('open');
      if (btn) btn.setAttribute('aria-expanded', 'true');
      if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
    }

    items.forEach(function (item) {
      var btn = item.querySelector('.faq-q');
      if (!btn) return;

      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        items.forEach(close);          // collapse all
        if (!isOpen) open(item);       // then open the one just clicked
      });
    });

    // Keep an open answer correctly sized if the viewport reflows (e.g. rotate).
    window.addEventListener('resize', function () {
      var openItem = document.querySelector('.faq-item.open');
      if (!openItem) return;
      var ans = openItem.querySelector('.faq-a');
      if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
    });
  }
  /* ===== 3. FAQ ACCORDION END ===== */


  /* ===== 4. COUNTDOWN TIMER ===== */
  // Soft urgency clock seeded at ~02:47:12. Counts down once per second and
  // gently resets when it reaches zero so the offer never reads as expired.
  function initCountdown() {
    var el = document.getElementById('countdown');
    if (!el) return;

    var SEED = (2 * 3600) + (47 * 60) + 12; // 02:47:12 in seconds
    var remaining = SEED;

    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function render() {
      var h = Math.floor(remaining / 3600);
      var m = Math.floor((remaining % 3600) / 60);
      var s = remaining % 60;
      el.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    }

    render();
    setInterval(function () {
      remaining = remaining > 0 ? remaining - 1 : SEED;
      render();
    }, 1000);
  }
  /* ===== 4. COUNTDOWN TIMER END ===== */


  /* ===== INIT ===== */
  function init() {
    initReveal();
    initMenu();
    initFaq();
    initCountdown();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  /* ===== INIT END ===== */
})();
