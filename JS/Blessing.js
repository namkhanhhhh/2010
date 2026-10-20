// ===== 20/10 Theme: Petals & Hearts Falling =====

// Petal icons – pink/white 20/10 theme (no snowflakes/Christmas)
const PETAL_ICONS = ['🌸', '🌺', '💮', '🌷', '💗', '💖', '💕', '🩷']
const PETAL_COUNT = 45

function createPetal() {
  const layer = document.getElementById('petals-layer')
  if (!layer) return

  const el = document.createElement('span')
  el.className = 'petal'
  el.textContent = PETAL_ICONS[Math.floor(Math.random() * PETAL_ICONS.length)]

  const size   = Math.random() * 14 + 10      // 10–24px
  const left   = Math.random() * 100          // 0–100vw
  const dur    = Math.random() * 8 + 7        // 7–15s
  const delay  = Math.random() * 12           // 0–12s stagger
  const drift  = (Math.random() - 0.5) * 60  // ±30px horizontal drift

  el.style.cssText = `
    left: ${left}vw;
    font-size: ${size}px;
    animation-duration: ${dur}s;
    animation-delay: ${delay}s;
    --drift: ${drift}px;
  `

  // Override animation to include horizontal drift
  el.style.animation = `petalFall ${dur}s ${delay}s linear infinite`

  layer.appendChild(el)
}

function initPetals() {
  for (let i = 0; i < PETAL_COUNT; i++) {
    createPetal()
  }
}

// ===== Scroll Fade-In =====
function handleScrollAnimation() {
  const targets = document.querySelectorAll('.fade, .card-section, .subtitle')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Slight delay for staggered feel
          setTimeout(() => {
            entry.target.classList.add('active')
          }, 80)
        }
      })
    },
    { threshold: 0.08 }
  )
  targets.forEach((el) => observer.observe(el))
}

// ===== Audio Toggle =====
const song = document.getElementById('audio')
let isPlaying = false

if (song) {
  song.volume = 0.22
  song.loop = true
}

function toggleAudio() {
  const btn = document.getElementById('audio-btn')
  if (!song) return

  if (isPlaying) {
    song.pause()
    isPlaying = false
    if (btn) { btn.textContent = '🎵'; btn.classList.remove('playing') }
  } else {
    song.play().then(() => {
      isPlaying = true
      if (btn) { btn.textContent = '🔊'; btn.classList.add('playing') }
    }).catch((e) => console.log('Audio blocked:', e))
  }
}

// Auto-play attempt after interaction (browser policy)
function tryAutoPlay() {
  if (!song || isPlaying) return
  song.play().then(() => {
    isPlaying = true
    const btn = document.getElementById('audio-btn')
    if (btn) { btn.textContent = '🔊'; btn.classList.add('playing') }
  }).catch(() => {
    // Silently fail – user can click the button
  })
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  initPetals()
  handleScrollAnimation()

  // Wire up audio button
  const audioBtn = document.getElementById('audio-btn')
  if (audioBtn) {
    audioBtn.addEventListener('click', toggleAudio)
  }

  // Try auto-play after 1.2s
  setTimeout(tryAutoPlay, 1200)
})

