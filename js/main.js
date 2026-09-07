function initProgressBar() {
  const bar = document.getElementById('progressBar');

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const body = document.body;
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isLight = body.dataset.theme === 'light';
    body.dataset.theme = isLight ? 'dark' : 'light';
    toggle.setAttribute('aria-pressed', String(!isLight));
    toggle.setAttribute('aria-label', isLight ? 'Enable light theme' : 'Enable dark theme');
    toggle.querySelector('.theme-icon').textContent = isLight ? '☼' : '☾';
  });
}

function initSectionRail() {
  const sections = document.querySelectorAll('.rail-section');
  const impactStep = document.querySelector('.step[data-step="4"]');
  const links = document.querySelectorAll('.rail-link');
  const progress = document.getElementById('railProgress');
  const sectionOrder = ['get-started', 'introduction', 'tech-breakdown', 'conclusion'];

  const setActive = (sectionId) => {
    const activeIndex = sectionOrder.indexOf(sectionId);
    links.forEach((link) => link.classList.toggle('is-active', link.dataset.section === sectionId));
    if (progress && activeIndex !== -1) progress.textContent = `0${activeIndex + 1} / 04`;
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const sectionId = entry.target.dataset.section || 'tech-breakdown';
      setActive(sectionId);
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach((section) => observer.observe(section));
  if (impactStep) observer.observe(impactStep);
}

function initStepObserver() {
  const steps = document.querySelectorAll('.step');
  const stepVisuals = document.querySelectorAll('.step-visual');
  const isMobile = window.matchMedia('(max-width: 860px)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stepNumber = entry.target.getAttribute('data-step');

        steps.forEach((step) => step.classList.remove('is-active'));
        entry.target.classList.add('is-active');

        stepVisuals.forEach((visual) => {
          const isMatch = visual.getAttribute('data-step-visual') === stepNumber;
          visual.classList.toggle('is-active', isMatch);
        });
      }
    });
  }, {
    threshold: isMobile ? 0.2 : 0.5,
    rootMargin: isMobile ? '-15% 0px -45% 0px' : '0px'
  });

  steps.forEach((step) => observer.observe(step));
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target')) || 0;
        const duration = 1200;
        const start = performance.now();

        function step(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initThemeToggle();
  initSectionRail();
  initStepObserver();
  initCounters();
});
