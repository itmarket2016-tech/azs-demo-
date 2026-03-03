// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Count-up animation
function countUp(el, target, duration = 1400) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// Price cards: count-up + bar fill on scroll into view
const priceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      card.classList.add('animated');

      const numEl = card.querySelector('.count-up');
      if (numEl && !card.dataset.counted) {
        card.dataset.counted = '1';
        countUp(numEl, parseInt(numEl.dataset.target), 1400);
      }
      priceObserver.unobserve(card);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.price-card').forEach(card => priceObserver.observe(card));