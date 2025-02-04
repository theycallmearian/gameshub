import '/src/pages/superslotmachine/superslotmachine.css'

// ---- INIT & CLEANUP ----
export const initSuperSlotMachine = (container) => {
  const cssLink = document.createElement('link')
  cssLink.rel = 'stylesheet'
  cssLink.href = '/src/pages/superslotmachine/superslotmachine.css'
  cssLink.id = 'superslotmachine-css'
  document.head.appendChild(cssLink)

  // Crear la interfaz de usuario del juego
  createUI(container)

  // Inicializar las monedas y mostrar el total disponible
  loadCoins()
  updateCoinsDisplay()

  // Añadir eventos específicos
  document.getElementById('spinAll').addEventListener('click', spinAll)
  document.getElementById('resetButton').addEventListener('click', resetGame)
  document
    .getElementById('checkboxInput')
    .addEventListener('change', toggleBackgroundMusic)

  // Comprobar el estado del botón de música al cargar el juego
  const musicCheckbox = document.getElementById('checkboxInput')
  if (musicCheckbox && !musicCheckbox.checked) {
    // Si el checkbox no está marcado (no está muteado), reproducir la música
    backgroundMusic.play()
    isMusicMuted = false
  } else {
    isMusicMuted = true
  }
}

export const cleanupSuperSlotMachine = () => {
  // Detener todos los sonidos si están reproduciéndose
  stopAllSounds()

  // Limpiar todos los intervalos de tirada
  spinIntervals.forEach(clearInterval)
  spinIntervals = []

  // Reiniciar estado de isSpinning y reelsSpun para futuras ejecuciones
  isSpinning = false
  reelsSpun = 0

  // Eliminar event listeners
  document.getElementById('spinAll')?.removeEventListener('click', spinAll)
  document
    .getElementById('resetButton')
    ?.removeEventListener('click', resetGame)
  document
    .getElementById('checkboxInput')
    ?.removeEventListener('change', toggleBackgroundMusic)

  // Remover el enlace al CSS específico de Super Slot Machine
  const cssLink = document.getElementById('superslotmachine-css')
  if (cssLink) {
    cssLink.remove()
  }

  // Limpiar el contenedor del juego
  const container = document.getElementById('app')
  if (container) {
    container.innerHTML = ''
  }
}

// ---- SOUNDS ----
export const spinSound = new Audio('sounds/spin.mp3')
export const winSound = new Audio('sounds/win.mp3')
export const loseSound = new Audio('sounds/lose.mp3')
export const backgroundMusic = new Audio('sounds/background-music.mp3')
export const gameOverSound = new Audio('sounds/gameover.mp3')
export const bowserSound = new Audio('sounds/bowser.mp3')
let isMusicMuted = false

backgroundMusic.loop = true
backgroundMusic.volume = 0.4

function playSoundWithMusicControl(sound) {
  if (!isMusicMuted) {
    backgroundMusic.pause()
  }
  sound.play()

  sound.onended = () => {
    if (!isMusicMuted) {
      backgroundMusic.play()
    }
  }
}

function toggleBackgroundMusic() {
  if (isMusicMuted) {
    backgroundMusic.play()
    isMusicMuted = false
  } else {
    backgroundMusic.pause()
    isMusicMuted = true
  }
}

function stopAllSounds() {
  spinSound.pause()
  spinSound.currentTime = 0

  winSound.pause()
  winSound.currentTime = 0

  loseSound.pause()
  loseSound.currentTime = 0

  bowserSound.pause()
  bowserSound.currentTime = 0

  gameOverSound.pause()
  gameOverSound.currentTime = 0
  backgroundMusic.pause()
  backgroundMusic.currentTime = 0
}

// ---- COINS ----
let coins = 40

function loadCoins() {
  if (localStorage.getItem('coins')) {
    coins = parseInt(localStorage.getItem('coins'))
  } else {
    localStorage.setItem('coins', coins)
  }
}

function getCoins() {
  return coins
}

function updateCoinsDisplay() {
  const coinsDisplay = document.getElementById('coinsDisplay')
  if (coinsDisplay) {
    coinsDisplay.innerText = `${coins}`
  }
}

function decreaseCoins(amount) {
  coins -= amount
  updateCoinsDisplay()
  localStorage.setItem('coins', coins)
}

function increaseCoins(amount) {
  coins += amount
  updateCoinsDisplay()
  localStorage.setItem('coins', coins)
}

function resetCoins() {
  coins = 40
  updateCoinsDisplay()
  localStorage.setItem('coins', coins)
}

// ---- UI ----
const images = [
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134696/marioprofile_vnp0cm.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1727594847/yoshiprofile_ktfxbq.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134186/diddykongprofile_eymofs.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134730/princess-peach-luigi-peach-nintendo-princess-peach-character-mario-party-star-rush-mario-bros-free-png_hggber.webp',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134758/b1ff944a4e722c9d2c98648ff3cf1518_bruhzg.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1727174273/toadprofile_q6hrkf.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134786/96d136000d1c03e095ba6044c941fd2f_cupyzz.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134806/7fd012d1f80c03f3da704bb2fe0fd356_ftjkzo.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134829/bowserprofile_kkwwqt.png'
]

function createUI(container) {
  const gameContainer = document.createElement('div')
  gameContainer.classList.add('slot-machine')
  gameContainer.innerHTML = `
    <div class="header">
      <h1>Super Slot Machine</h1>
      <input type="checkbox" id="checkboxInput">
      <label for="checkboxInput" class="toggleSwitch">
        <div class="speaker">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 75 75">
            <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z" style="stroke:#fff;stroke-width:5;stroke-linejoin:round;fill:#fff;"></path>
            <path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style="fill:none;stroke:#fff;stroke-width:5;stroke-linecap:round"></path>
          </svg>
        </div>
        <div class="mute-speaker">
          <svg version="1.0" viewBox="0 0 75 75" stroke="#fff" stroke-width="5">
            <path d="m39,14-17,15H6V48H22l17,15z" fill="#fff" stroke-linejoin="round"></path>
            <path d="m49,26 20,24m0-24-20,24" fill="#fff" stroke-linecap="round"></path>
          </svg>
        </div>
      </label>
      <div class="coin-zone">
      <img class="coinIcon" src="https://res.cloudinary.com/dye4qdrys/image/upload/v1727174364/coin_igvfsm.png" alt="Moneda">
      <span id="coinsDisplay">0</span>
      <img class="coinIcon" src="https://res.cloudinary.com/dye4qdrys/image/upload/v1727174364/coin_igvfsm.png" alt="Moneda">
      </div>
    </div>
    <div class="reels">
      <div id="reel1" class="reel"><img src="${images[0]}" alt="Personaje 1"></div>
      <div id="reel2" class="reel"><img src="${images[0]}" alt="Personaje 1"></div>
      <div id="reel3" class="reel"><img src="${images[0]}" alt="Personaje 1"></div>
    </div>
    <div class="buttons">
      <button class="spin-button large" id="spinAll">Spin</button>
      <button class="spin-button large" id="resetButton" style="display:none;">Retry</button>
    </div>
    <div class="result-box">
    <p id="result"></p>
    </div>
  `
  container.appendChild(gameContainer)
}

// ---- GAME LOGIC ----
let isSpinning = false
let spinIntervals = []
let reelsSpun = 0

function spinAll() {
  if (isSpinning) return

  isSpinning = true
  reelsSpun = 0
  toggleButton('spinAll', false)
  document.getElementById('resetButton').style.display = 'none'
  displayMessage('')

  if (getCoins() <= 0) {
    showGameOver()
    isSpinning = false
    return
  }

  decreaseCoins(5)

  const reel1 = document.getElementById('reel1')
  const reel2 = document.getElementById('reel2')
  const reel3 = document.getElementById('reel3')

  stopAllSounds()
  playSoundWithMusicControl(spinSound)

  const finalIndices = []

  const winningChance = 0.3
  const isWinningSpin = Math.random() < winningChance
  const bowserChance = 0.2
  const winningIndex = Math.floor(Math.random() * 8)
  const bowserIndex = 8

  function spinReel(reel, duration, index) {
    let spinCounter = 0
    const spinInterval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * 8)

      reel.querySelector('img').src = images[randomIndex]
      spinCounter++

      if (spinCounter * 20 >= duration) {
        clearInterval(spinInterval)
        spinIntervals = spinIntervals.filter((int) => int !== spinInterval)

        if (isWinningSpin) {
          randomIndex = winningIndex
        } else if (Math.random() < bowserChance) {
          randomIndex = bowserIndex
        }

        reel.querySelector('img').src = images[randomIndex]
        finalIndices[index] = randomIndex

        reelsSpun++
        if (reelsSpun === 3) {
          checkWin(finalIndices)
        }
      }
    }, 20)

    spinIntervals.push(spinInterval)
  }

  spinReel(reel1, 2000, 0)
  spinReel(reel2, 2500, 1)
  spinReel(reel3, 3000, 2)
}

function checkWin(finalIndices) {
  spinSound.pause()
  spinSound.currentTime = 0

  const allBowsers = finalIndices.every((val) => val === 8)

  if (allBowsers) {
    decreaseCoins(30)
    playSoundWithMusicControl(bowserSound)
    displayMessage('🔥¡MUAJAJA! Pierdes 30 monedas.🔥')
  } else if (finalIndices.every((val) => val === finalIndices[0])) {
    increaseCoins(20)
    playSoundWithMusicControl(winSound)
    displayMessage('🪙¡Ganas 20 monedas!🪙')
  } else {
    playSoundWithMusicControl(loseSound)
    displayMessage('😭¡OH NOOOO... Has perdido!😭')
  }

  isSpinning = false
  toggleButton('spinAll', true)
}

function resetGame() {
  resetCoins()
  updateCoinsDisplay()
  displayMessage('')

  document.getElementById('resetButton').style.display = 'none'
  toggleButton('spinAll', true)

  gameOverSound.pause()
  gameOverSound.currentTime = 0
}

function showGameOver() {
  displayMessage('😢 Game Over 😢')
  document.getElementById('resetButton').style.display = 'block'
  toggleButton('resetButton', true)
  toggleButton('spinAll', false)
  playSoundWithMusicControl(gameOverSound)
}

function displayMessage(message) {
  const result = document.getElementById('result')
  if (result) {
    result.innerText = message
  }
}

function toggleButton(id, state) {
  const button = document.getElementById(id)
  if (button) {
    button.disabled = !state
  }
}
