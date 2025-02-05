import '/src/pages/simon/simon.css'

export const initSimon = (container) => {
  const cssLink = document.createElement('link')
  cssLink.rel = 'stylesheet'
  cssLink.href = '/src/pages/simon/simon.css'
  cssLink.id = 'simon-css'
  document.head.appendChild(cssLink)

  const gameContainer = document.createElement('div')
  gameContainer.id = 'simon-game-container'

  gameContainer.innerHTML = `
    <button id="start-button">Start</button>
    <div class="color-buttons">
      <button id="green" class="color-button"></button>
      <button id="red" class="color-button"></button>
      <button id="yellow" class="color-button"></button>
      <button id="blue" class="color-button"></button>
    </div>
    <div id="score-container">
      <p>Score: <span id="score">0</span></p>
      <p>High Score: <span id="high-score">0</span></p>
    </div>
  `

  container.appendChild(gameContainer)

  gameSequence = []
  playerSequence = []
  level = 0
  score = 0
  highScore = 0
  isPlaying = false
  isGameOver = false

  startButton = gameContainer.querySelector('#start-button')
  colorButtons = gameContainer.querySelectorAll('.color-button')
  scoreDisplay = gameContainer.querySelector('#score')
  highScoreDisplay = gameContainer.querySelector('#high-score')

  loadHighScore()

  startButton.addEventListener('click', startButtonHandler)
  colorButtons.forEach((button) => {
    button.addEventListener('click', colorButtonHandler)
  })
}

// Variables globales para el estado del juego
let gameSequence = []
let playerSequence = []
let level = 0
let score = 0
let highScore = 0
let isPlaying = false
let isGameOver = false

let startButton
let colorButtons
let scoreDisplay
let highScoreDisplay

const sounds = {
  green: new Audio('/sounds/green.mp3'),
  red: new Audio('/sounds/red.mp3'),
  yellow: new Audio('/sounds/yellow.mp3'),
  blue: new Audio('/sounds/blue.mp3'),
  wrong: new Audio('/sounds/wrong.mp3')
}

function startButtonHandler() {
  if (!isPlaying || isGameOver) {
    isGameOver = false
    startGame()
  }
}

function colorButtonHandler(e) {
  if (!isPlaying && !isGameOver) {
    const selectedColor = e.target.id
    playerSequence.push(selectedColor)
    flashColor(selectedColor)
    checkPlayerMove()
  }
}

function startGame() {
  gameSequence = []
  playerSequence = []
  level = 0
  score = 0
  updateScore()
  nextLevel()
}

function nextLevel() {
  level++
  playerSequence = []
  const randomColor = ['green', 'red', 'yellow', 'blue'][
    Math.floor(Math.random() * 4)
  ]
  gameSequence.push(randomColor)
  flashSequence()
}

function flashSequence() {
  isPlaying = true
  startButton.disabled = true
  let delay = 0
  gameSequence.forEach((color) => {
    setTimeout(() => {
      flashColor(color)
    }, delay)
    delay += 1200
  })
  setTimeout(() => {
    isPlaying = false
    startButton.disabled = false
  }, delay)
}

function flashColor(color) {
  const button = document.querySelector(`#${color}`)
  button.classList.add('active')
  playSound(color)
  setTimeout(() => {
    button.classList.remove('active')
  }, 600)
}

function playSound(color) {
  if (sounds[color]) {
    sounds[color].currentTime = 0
    sounds[color].play()
  }
}

function checkPlayerMove() {
  const currentMoveIndex = playerSequence.length - 1
  if (playerSequence[currentMoveIndex] !== gameSequence[currentMoveIndex]) {
    isPlaying = true
    isGameOver = true
    playSound('wrong')
    alert('¡Oh no... has perdido! Tu puntuación final es: ' + score)
    sounds.wrong.onended = () => {
      isPlaying = false
    }
  } else if (playerSequence.length === gameSequence.length) {
    score += level * 10
    updateScore()
    setTimeout(nextLevel, 1000)
  }
}

function updateScore() {
  scoreDisplay.textContent = score
  saveHighScore()
}

function saveHighScore() {
  if (isLocalStorageAvailable() && score > highScore) {
    highScore = score
    localStorage.setItem('simonGameHighScore', highScore.toString())
    updateHighScoreDisplay()
  }
}

function loadHighScore() {
  const savedHighScore = localStorage.getItem('simonGameHighScore')
  highScore = savedHighScore ? parseInt(savedHighScore, 10) : 0
  updateHighScoreDisplay()
}

function updateHighScoreDisplay() {
  highScoreDisplay.textContent = highScore
}

function isLocalStorageAvailable() {
  try {
    localStorage.setItem('test', 'test')
    localStorage.removeItem('test')
    return true
  } catch (e) {
    return false
  }
}

export const cleanupSimon = () => {
  if (startButton) {
    startButton.removeEventListener('click', startButtonHandler)
  }

  if (colorButtons) {
    colorButtons.forEach((button) => {
      button.removeEventListener('click', colorButtonHandler)
    })
  }

  Object.values(sounds).forEach((sound) => {
    sound.pause()
    sound.currentTime = 0
  })

  const cssLink = document.getElementById('simon-css')
  if (cssLink) {
    cssLink.remove()
  }

  const container = document.getElementById('simon-game-container')
  if (container) {
    container.remove()
  }
}
