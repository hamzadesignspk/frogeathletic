// ---------- Mobile nav toggle ----------
(function () {
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  var iconOpen = document.getElementById('iconOpen');
  var iconClose = document.getElementById('iconClose');

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    if (iconOpen) iconOpen.style.display = '';
    if (iconClose) iconClose.style.display = 'none';
  }

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    if (iconOpen) iconOpen.style.display = 'none';
    if (iconClose) iconClose.style.display = '';
  }

  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 960) closeMenu();
  });
})();

// ---------- Image fallbacks ----------
// Keeps layout stable and avoids ever showing a broken-image icon
// when a real photo hasn't been added yet at images/*.jpg
function fallbackAvatar(imgEl, initials) {
  var wrap = imgEl.parentElement;
  imgEl.remove();
  var div = document.createElement('div');
  div.className = 'avatar-fallback';
  div.textContent = initials;
  wrap.appendChild(div);
}

function fallbackGallery(imgEl, label) {
  var wrap = imgEl.parentElement;
  imgEl.remove();
  var div = document.createElement('div');
  div.className = 'gallery-fallback';
  div.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span></span>';
  div.querySelector('span').textContent = label;
  wrap.appendChild(div);
}

/* =========================================================
   FORGE ATHLETIC CLUB
   3D MEMBERSHIP CARD
   Tilt + Flip + Shine
   ========================================================= */

(function () {

  var tilt = document.getElementById("cardTilt");
  var flipBtn = document.getElementById("cardFlip");

  if (!tilt || !flipBtn) return;


  /* ---------------------------------------------------------
     USER MOTION PREFERENCES
     --------------------------------------------------------- */

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var finePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;


  /* ---------------------------------------------------------
     3D MOUSE TILT
     --------------------------------------------------------- */

  if (!reduceMotion && finePointer) {

    tilt.addEventListener("mousemove", function (e) {

      var rect = tilt.getBoundingClientRect();

      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      var percentX = x / rect.width;
      var percentY = y / rect.height;

      var rotateY =
        (percentX - 0.5) * 18;

      var rotateX =
        (percentY - 0.5) * -18;


      tilt.style.transform =
        "rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg)";


      /* Shine position */

      tilt.style.setProperty(
        "--mx",
        (percentX * 100) + "%"
      );

      tilt.style.setProperty(
        "--my",
        (percentY * 100) + "%"
      );

    });


    /* Reset card */

    tilt.addEventListener("mouseleave", function () {

      tilt.style.transform =
        "rotateX(0deg) rotateY(0deg)";

      tilt.style.setProperty(
        "--mx",
        "50%"
      );

      tilt.style.setProperty(
        "--my",
        "50%"
      );

    });

  }


  /* ---------------------------------------------------------
     CARD FLIP
     --------------------------------------------------------- */

  flipBtn.addEventListener("click", function () {

    var isFlipped =
      flipBtn.classList.toggle("is-flipped");


    flipBtn.setAttribute(
      "aria-pressed",
      isFlipped ? "true" : "false"
    );


    flipBtn.setAttribute(
      "aria-label",
      isFlipped
        ? "Flip membership card to see the front"
        : "Flip membership card to see the back"
    );

  });


  /* ---------------------------------------------------------
     KEYBOARD SUPPORT
     --------------------------------------------------------- */

  flipBtn.addEventListener("keydown", function (e) {

    if (
      e.key === "Enter" ||
      e.key === " "
    ) {

      e.preventDefault();

      flipBtn.click();

    }

  });

})();
