import '/src/pages/simon/simon.css'

export const initSimon = (container) => {
  // Contenedor del juego
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

  // Estado del juego
  let gameSequence = []
  let playerSequence = []
  let level = 0
  let score = 0
  let highScore = 0
  let isPlaying = false
  let canClick = false

  // Elementos del DOM
  const startButton = gameContainer.querySelector('#start-button')
  const colorButtons = gameContainer.querySelectorAll('.color-button')
  const scoreDisplay = gameContainer.querySelector('#score')
  const highScoreDisplay = gameContainer.querySelector('#high-score')

  // Sonidos
  const sounds = {
    green: new Audio('/sounds/green.mp3'),
    red: new Audio('/sounds/red.mp3'),
    yellow: new Audio('/sounds/yellow.mp3'),
    blue: new Audio('/sounds/blue.mp3'),
    wrong: new Audio('/sounds/wrong.mp3')
  }

  Object.values(sounds).forEach((sound) => (sound.volume = 0.2))

  // **Inicialización**
  disableColorButtons()
  loadHighScore()

  // **Eventos**
  startButton.addEventListener('click', startGame)
  colorButtons.forEach((button) =>
    button.addEventListener('click', handleColorClick)
  )

  function startGame() {
    if (isPlaying) return // Si el juego ya está en curso, no hacer nada

    isPlaying = true
    canClick = false
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
    canClick = false
    disableColorButtons()

    const randomColor = ['green', 'red', 'yellow', 'blue'][
      Math.floor(Math.random() * 4)
    ]
    gameSequence.push(randomColor)

    flashSequence()
  }

  function flashSequence() {
    let delay = 0

    gameSequence.forEach((color) => {
      setTimeout(() => {
        flashColor(color)
      }, delay)
      delay += 1000
    })

    setTimeout(() => {
      canClick = true
      enableColorButtons()
    }, delay)
  }

  function flashColor(color) {
    const button = document.getElementById(color)
    button.classList.add('active')
    playSound(color)
    setTimeout(() => {
      button.classList.remove('active')
    }, 500)
  }

  function playSound(color) {
    if (sounds[color]) {
      sounds[color].currentTime = 0
      sounds[color].play()
    }
  }

  function handleColorClick(e) {
    if (!canClick) return // Bloquea clics si no es el turno del jugador

    const selectedColor = e.target.id
    playerSequence.push(selectedColor)
    flashColor(selectedColor)
    checkPlayerMove()
  }

  function checkPlayerMove() {
    const index = playerSequence.length - 1

    if (playerSequence[index] !== gameSequence[index]) {
      gameOver()
      return
    }

    if (playerSequence.length === gameSequence.length) {
      score += level * 10
      updateScore()
      setTimeout(nextLevel, 1000)
    }
  }

  function gameOver() {
    isPlaying = false
    canClick = false
    playSound('wrong')
    disableColorButtons()

    alert(`¡Oh no! Has perdido. Puntuación final: ${score}`)
  }

  function updateScore() {
    scoreDisplay.textContent = score
    saveHighScore()
  }

  function saveHighScore() {
    if (score > highScore) {
      highScore = score
      localStorage.setItem('simonGameHighScore', highScore)
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

  function disableColorButtons() {
    colorButtons.forEach((button) => {
      button.disabled = true
    })
  }

  function enableColorButtons() {
    colorButtons.forEach((button) => {
      button.disabled = false
    })
  }
}

// **Función de limpieza**
export const cleanupSimon = () => {
  const container = document.getElementById('simon-game-container')
  if (container) container.remove()
}
