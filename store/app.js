// ── State ──────────────────────────────────────────────────────────────────
const artworks = [
  {
    src: 'assets/art/realm-01.jpg',
    caption: 'REALM OF MOON  ·  FAITH DROP  ·  ED. 001  ·  ORIGINAL ART'
  },
  {
    src: 'assets/art/realm-02.jpg',
    caption: 'REALM OF MOON  ·  LEAVING  ·  ED. 002  ·  FATUM BRUTUM AMOR FATI'
  }
];

let cartCount = 0;
let toastTimer = null;

// ── Modal ──────────────────────────────────────────────────────────────────
function openModal(index) {
  const modal  = document.getElementById('modal');
  const img    = modal.querySelector('.modal-img');
  const cap    = modal.querySelector('.modal-caption');
  const art    = artworks[index];

  img.src = art.src;
  img.alt = art.caption;
  cap.textContent = art.caption;

  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ── Cart ───────────────────────────────────────────────────────────────────
function addToCart(name, price) {
  cartCount++;

  const countEl = document.querySelector('.cart-count');
  countEl.textContent = cartCount;
  countEl.classList.add('visible');

  // bounce animation
  countEl.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
    { duration: 300, easing: 'cubic-bezier(0.4,0,0.2,1)' }
  );

  showToast(`Added: ${name}  ·  Rp ${price.toLocaleString('id-ID')}`);
}

function showToast(message) {
  const toast = document.getElementById('cartToast');
  toast.textContent = message;

  clearTimeout(toastTimer);
  toast.classList.add('show');

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ── Scroll-reveal ──────────────────────────────────────────────────────────
const revealTargets = document.querySelectorAll('.art-card, .product-card, .about-inner');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealTargets.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)';
  observer.observe(el);
});

// ── Nav active link highlight ──────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${entry.target.id}`) {
            a.style.color = 'var(--cyan)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));
