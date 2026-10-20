// ===== 20/10 Connection Page – Gift Opening Animation =====

const PETAL_ICONS  = ['🌸', '🌺', '💮', '🌷', '💗', '💖', '💕', '🩷', '✨']
const BURST_ICONS  = ['🌸', '💖', '🌷', '💮', '✨', '🎀', '💗', '🩷', '🌺', '⭐']
let   opened       = false

// ===== Background petals =====
function spawnBgPetals() {
  const container = document.getElementById('bg-petals')
  if (!container) return
  for (let i = 0; i < 30; i++) {
    const el  = document.createElement('span')
    el.className    = 'bg-petal'
    el.textContent  = PETAL_ICONS[Math.floor(Math.random() * PETAL_ICONS.length)]
    const size  = Math.random() * 12 + 10
    const left  = Math.random() * 100
    const dur   = Math.random() * 10 + 8
    const delay = Math.random() * 15
    el.style.cssText = `left:${left}vw;font-size:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;top:-${size}px`
    container.appendChild(el)
  }
}

// ===== Ripple effect at click point =====
function spawnRipple(x, y) {
  const r = document.createElement('div')
  r.className = 'ripple'
  const size = 60
  r.style.cssText = `width:${size}px;height:${size}px;left:${x - size/2}px;top:${y - size/2}px`
  document.body.appendChild(r)
  setTimeout(() => r.remove(), 900)
}

// ===== Burst particles from center =====
function spawnBurst(cx, cy, count = 20) {
  for (let i = 0; i < count; i++) {
    const p   = document.createElement('span')
    p.className   = 'burst-particle'
    p.textContent = BURST_ICONS[Math.floor(Math.random() * BURST_ICONS.length)]

    const angle  = (360 / count) * i + Math.random() * 20
    const dist   = 80 + Math.random() * 160
    const rad    = angle * Math.PI / 180
    const tx     = Math.cos(rad) * dist
    const ty     = Math.sin(rad) * dist
    const dur    = 0.6 + Math.random() * 0.5
    const rot    = (Math.random() - 0.5) * 720

    p.style.cssText = `
      left: ${cx - 14}px;
      top:  ${cy - 14}px;
      --tx: ${tx}px;
      --ty: ${ty}px;
      --rot: ${rot}deg;
      animation-duration: ${dur}s;
      font-size: ${1 + Math.random() * 1.2}rem;
    `
    document.body.appendChild(p)
    setTimeout(() => p.remove(), dur * 1000 + 100)
  }
}

// ===== Gift shake animation =====
function shakeGift() {
  const icon = document.getElementById('gift-icon')
  if (!icon) return
  icon.style.animation = 'gift-shake 0.45s ease'
  icon.addEventListener('animationend', () => {
    icon.style.animation = 'gift-float 3s ease-in-out infinite'
  }, { once: true })
}

// ===== Gift opening sequence =====
function openGift(event) {
  if (opened) return
  opened = true

  const giftCenter = document.getElementById('gift-center')
  const giftIcon   = document.getElementById('gift-icon')
  const reveal     = document.getElementById('reveal-text')

  // Get center coordinates for burst
  const rect = giftCenter.getBoundingClientRect()
  const cx   = rect.left + rect.width  / 2
  const cy   = rect.top  + rect.height / 2

  // Ripple at click point
  spawnRipple(event.clientX, event.clientY)

  // Step 1 – shake
  giftIcon.style.animation = 'gift-shake 0.45s ease'

  // Step 2 – big burst + icon change
  setTimeout(() => {
    spawnBurst(cx, cy, 24)
    giftIcon.textContent = '✨'
    giftIcon.style.animation = 'gift-explode 0.5s ease forwards'
  }, 300)

  // Step 3 – second burst wave
  setTimeout(() => {
    spawnBurst(cx, cy, 16)
  }, 550)

  // Step 4 – show reveal overlay
  setTimeout(() => {
    if (reveal) {
      reveal.style.pointerEvents = 'all'
      reveal.classList.add('show')
    }
  }, 900)

  // Step 5 – navigate
  setTimeout(() => {
    window.location.href = 'DearChiCun.html'
  }, 2200)
}

// ===== Gift shake CSS injection =====
const style = document.createElement('style')
style.textContent = `
  @keyframes gift-shake {
    0%,100%{ transform: rotate(0deg) scale(1); }
    20%    { transform: rotate(-10deg) scale(1.05); }
    40%    { transform: rotate(12deg)  scale(1.08); }
    60%    { transform: rotate(-8deg)  scale(1.06); }
    80%    { transform: rotate(6deg)   scale(1.04); }
  }
  @keyframes gift-explode {
    0%  { transform: scale(1); }
    50% { transform: scale(1.6); opacity: 0.8; }
    100%{ transform: scale(0); opacity: 0; }
  }
`
document.head.appendChild(style)

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  spawnBgPetals()

  const giftCenter = document.getElementById('gift-center')
  if (giftCenter) {
    giftCenter.addEventListener('click', openGift)
  }
})

