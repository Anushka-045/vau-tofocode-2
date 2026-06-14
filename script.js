/* ============================================
   INTERACTIVE RECIPE CARD – script.js
   ============================================ */

const TOTAL_STEPS = 6;
const PREP_TIME_SECONDS = 25 * 60; // 25 minutes

let currentStep = 0;   // 0 = not started
let cookingMode = false;
let timerInterval = null;
let timerSecondsLeft = PREP_TIME_SECONDS;

/* ── DOM refs ──────────────────────────────── */
const startBtn       = document.getElementById('startCookingBtn');
const nextBtn        = document.getElementById('nextStepBtn');
const progressBar    = document.getElementById('progressBar');
const progressText   = document.getElementById('progressText');
const timerSection   = document.getElementById('timerSection');
const timerDisplay   = document.getElementById('timerDisplay');
const timerCircle    = document.getElementById('timerCircle');
const stopTimerBtn   = document.getElementById('stopTimerBtn');
const stepItems      = document.querySelectorAll('.step-item');
const ingredientItems = document.querySelectorAll('.ingredient-item');

/* ── TOGGLE SECTIONS ───────────────────────── */
function setupToggle(headerId, listId) {
  const header = document.getElementById(headerId);
  const list   = document.getElementById(listId);
  const btn    = header.querySelector('.toggle-btn');
  const label  = btn.querySelector('.toggle-text');

  header.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    list.classList.toggle('collapsed', isOpen);
    label.textContent = isOpen ? 'Show' : 'Hide';
  });
}

setupToggle('ingredientsToggle', 'ingredientsList');
setupToggle('stepsToggle', 'stepsList');

/* ── INGREDIENT CHECKBOXES ─────────────────── */
ingredientItems.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('checked');
    const checkbox = item.querySelector('.ingredient-check');
    const isChecked = item.classList.contains('checked');
    checkbox.setAttribute('aria-checked', String(isChecked));
  });

  // Keyboard accessibility
  const checkbox = item.querySelector('.ingredient-check');
  checkbox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

/* ── PROGRESS BAR ───────────────────────────── */
function updateProgress(step) {
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  progressBar.style.width = pct + '%';
  progressText.textContent = `${step} / ${TOTAL_STEPS} steps`;
}

/* ── STEP HIGHLIGHTING ──────────────────────── */
function highlightStep(stepNum) {
  stepItems.forEach((item, idx) => {
    item.classList.remove('active', 'done');
    if (idx + 1 < stepNum) item.classList.add('done');
    if (idx + 1 === stepNum) {
      item.classList.add('active');
      // Scroll into view smoothly
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* ── START COOKING ──────────────────────────── */
startBtn.addEventListener('click', () => {
  if (!cookingMode) {
    // Enter cooking mode
    cookingMode = true;
    currentStep = 1;

    startBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Cooking…`;
    startBtn.style.opacity = '0.6';
    startBtn.style.cursor  = 'default';

    nextBtn.style.display = 'inline-flex';

    // Make sure steps section is visible
    const stepsList = document.getElementById('stepsList');
    const stepsToggle = document.getElementById('stepsToggle');
    const stepsBtn = stepsToggle.querySelector('.toggle-btn');
    if (stepsList.classList.contains('collapsed')) {
      stepsList.classList.remove('collapsed');
      stepsBtn.setAttribute('aria-expanded', 'true');
      stepsBtn.querySelector('.toggle-text').textContent = 'Hide';
    }

    highlightStep(currentStep);
    updateProgress(0);

    // Start timer
    startTimer();
    timerSection.style.display = 'flex';

  }
});

/* ── NEXT STEP ──────────────────────────────── */
nextBtn.addEventListener('click', () => {
  if (currentStep < TOTAL_STEPS) {
    updateProgress(currentStep);
    currentStep++;
    highlightStep(currentStep);

    if (currentStep === TOTAL_STEPS) {
      nextBtn.textContent = 'Finish 🎉';
    }
  } else {
    // Done!
    updateProgress(TOTAL_STEPS);
    stepItems.forEach(item => { item.classList.remove('active'); item.classList.add('done'); });
    nextBtn.style.display = 'none';
    startBtn.innerHTML = `✅ Done! Enjoy your cake`;
    startBtn.style.opacity = '1';
    startBtn.style.cursor = 'default';
    cookingMode = false;
    stopTimer();
    confetti();
  }
});

/* ── TIMER ──────────────────────────────────── */
const CIRCUMFERENCE = 2 * Math.PI * 50; // r=50

function startTimer() {
  timerSecondsLeft = PREP_TIME_SECONDS;
  timerCircle.style.strokeDasharray = CIRCUMFERENCE;
  timerCircle.style.strokeDashoffset = 0;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timerSecondsLeft--;
    updateTimerDisplay();

    const progress = 1 - (timerSecondsLeft / PREP_TIME_SECONDS);
    timerCircle.style.strokeDashoffset = CIRCUMFERENCE * progress;

    if (timerSecondsLeft <= 0) {
      stopTimer();
      timerDisplay.querySelector('span').textContent = '00:00';
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(timerSecondsLeft / 60).toString().padStart(2, '0');
  const s = (timerSecondsLeft % 60).toString().padStart(2, '0');
  timerDisplay.querySelector('span').textContent = `${m}:${s}`;
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

stopTimerBtn.addEventListener('click', () => {
  stopTimer();
  timerSection.style.display = 'none';
});

/* ── CONFETTI (mini celebration) ────────────── */
function confetti() {
  const colors = ['#C0392B', '#D4A017', '#6B3A2A', '#5cb85c', '#fff'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed;
      z-index: 9999;
      top: ${Math.random() * 40}%;
      left: ${Math.random() * 100}%;
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation: confettiFall ${1.2 + Math.random() * 1.5}s ease-in forwards;
      animation-delay: ${Math.random() * 0.6}s;
      pointer-events: none;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  // Inject animation if not already there
  if (!document.getElementById('confettiStyle')) {
    const style = document.createElement('style');
    style.id = 'confettiStyle';
    style.textContent = `
      @keyframes confettiFall {
        0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(90vh) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}
