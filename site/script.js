// Theme handling with localStorage + system preference
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

function applyTheme(mode) {
  if (mode === 'light') {
    root.classList.add('light');
    themeBtn.firstElementChild.classList.remove('fa-moon');
    themeBtn.firstElementChild.classList.add('fa-sun');
  } else {
    root.classList.remove('light');
    themeBtn.firstElementChild.classList.remove('fa-sun');
    themeBtn.firstElementChild.classList.add('fa-moon');
  }
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else {
    applyTheme(prefersLight.matches ? 'light' : 'dark');
  }
}
initTheme();

themeBtn.addEventListener('click', () => {
  const isLight = root.classList.contains('light');
  const next = isLight ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

prefersLight.addEventListener('change', (e) => {
  const saved = localStorage.getItem('theme');
  if (!saved) applyTheme(e.matches ? 'light' : 'dark');
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll using IntersectionObserver
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animate stats counters
function animateCount(el) {
  const target = Number(el.getAttribute('data-count') || '0');
  const dur = 1200;
  const start = performance.now();
  function tick(t) {
    const k = Math.min(1, (t - start) / dur);
    const val = Math.floor(target * (0.5 - Math.cos(Math.PI * k) / 2)); // easeInOut
    el.textContent = val;
    if (k < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll('.stat .num').forEach(animateCount);

// 3D tilt effect on project cards
const tiltCards = document.querySelectorAll('.tilt');
tiltCards.forEach(card => {
  let raf = null;
  const onMove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -8; // rotateX
    const ry = (x - 0.5) * 8;  // rotateY
    if (!raf) {
      raf = requestAnimationFrame(() => {
        card.style.setProperty('--rx', `${rx}deg`);
        card.style.setProperty('--ry', `${ry}deg`);
        raf = null;
      });
    }
  };
  const reset = () => {
    card.style.setProperty('--rx', `0deg`);
    card.style.setProperty('--ry', `0deg`);
  };
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
});

// Floating labels: ensure placeholder-shown logic works
document.querySelectorAll('.form .field input, .form .field textarea').forEach(el => {
  // Add a placeholder to trigger :placeholder-shown
  if (!el.placeholder) el.placeholder = ' ';
});

// Mock form submit
const sendBtn = document.getElementById('sendBtn');
const formNote = document.getElementById('formNote');
sendBtn?.addEventListener('click', () => {
  formNote.textContent = 'پیامت رسید. به زودی پاسخ می‌دم.';
  formNote.style.color = 'var(--ok)';
});
