import '/src/pages/tictactoe/tictactoe.css'

export const initTicTacToe = (container) => {
  const cssLink = document.createElement('link')
  cssLink.rel = 'stylesheet'
  cssLink.href = '/src/pages/tictactoe/tictactoe.css'
  cssLink.id = 'tictactoe-css'
  document.head.appendChild(cssLink)

  // Crear el contenedor principal para el juego
  const gameContainer = document.createElement('div')
  gameContainer.id = 'tic-tac-toe-container'

  // Crear la interfaz de usuario del juego
  gameContainer.innerHTML = `
    <h1 id="tictitle">Tic Tac Toe</h1>
    <div id="ticsub-container">
      <h3 id="ticsub">Pulsa cualquier casilla para empezar</h3>
    </div>
    <div id="tic-tac-toe-board">
        ${Array(9)
          .fill(0)
          .map((_, i) => `<div class="cell" data-index="${i}"></div>`)
          .join('')}
    </div>
    <div id="statistics">
        <h3>Estadísticas</h3>
        <p>Ganadas por X: <span id="wins-x">0</span></p>
        <p>Ganadas por O: <span id="wins-o">0</span></p>
        <p>Empates: <span id="draws">0</span></p>
    </div>
    <button id="reset-button">Reiniciar Juego</button>
  `

  container.appendChild(gameContainer)

  // Variables del estado del juego
  board = Array(9).fill(null)
  currentPlayer = 'X'
  gameOver = false

  const cells = gameContainer.querySelectorAll('.cell')
  const resetButton = gameContainer.querySelector('#reset-button')
  const subtitle = gameContainer.querySelector('#ticsub') // Referencia al subtítulo
  const subtitleContainer = gameContainer.querySelector('#ticsub-container') // Contenedor del subtítulo

  winsXDisplay = gameContainer.querySelector('#wins-x')
  winsODisplay = gameContainer.querySelector('#wins-o')
  drawsDisplay = gameContainer.querySelector('#draws')

  // Mostrar subtítulo al inicio
  subtitle.style.display = 'block'

  // Cargar estadísticas guardadas
  const initialStats = loadStatistics()
  updateStatisticsUI(initialStats)

  // Añadir eventos a las celdas del tablero
  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      if (subtitle.style.display === 'block') {
        subtitle.style.display = 'none' // Ocultar el subtítulo al primer clic
      }
      cellClickHandler(e)
    })
  })

  // Añadir evento al botón de reinicio
  resetButton.addEventListener('click', () => {
    resetButtonHandler()
    subtitle.style.display = 'block' // Mostrar el subtítulo al reiniciar
  })
}

// Variables globales para el estado del juego
let board = Array(9).fill(null)
let currentPlayer = 'X'
let gameOver = false
let winsXDisplay
let winsODisplay
let drawsDisplay

// Función para manejar clics en las celdas
function cellClickHandler(e) {
  if (!gameOver && e.target.textContent === '') {
    const cellIndex = parseInt(e.target.dataset.index)
    if (makeMove(cellIndex, currentPlayer)) {
      updateGameBoard(cellIndex, currentPlayer)
      if (checkWinner(currentPlayer)) {
        showAlert(`${currentPlayer} gana!`)
        gameOver = true
        const updatedStats = updateStatistics(currentPlayer)
        updateStatisticsUI(updatedStats)
      } else if (isBoardFull()) {
        showAlert('¡Empate!')
        gameOver = true
        const updatedStats = updateStatistics('draw')
        updateStatisticsUI(updatedStats)
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
      }
    }
  }
}

// Función para manejar el botón de reinicio
function resetButtonHandler() {
  resetGame()
  resetUI()
  currentPlayer = 'X'
  gameOver = false
}

// Función para realizar un movimiento
function makeMove(index, player) {
  if (board[index] === null) {
    board[index] = player
    return true
  }
  return false
}

// Función para comprobar si hay un ganador
function checkWinner(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Filas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columnas
    [0, 4, 8],
    [2, 4, 6] // Diagonales
  ]

  return winPatterns.some((pattern) =>
    pattern.every((index) => board[index] === player)
  )
}

// Función para reiniciar el juego
function resetGame() {
  board = Array(9).fill(null)
}

// Función para actualizar el tablero visualmente
function updateGameBoard(index, player) {
  const cell = document.querySelector(`.cell[data-index="${index}"]`)
  if (cell) {
    cell.textContent = player
  }
}

// Función para mostrar una alerta
function showAlert(message) {
  alert(message)
}

// Función para reiniciar la interfaz de usuario
function resetUI() {
  const cells = document.querySelectorAll('.cell')
  cells.forEach((cell) => (cell.textContent = ''))
}

// Función para guardar estadísticas
function saveStatistics(statistics) {
  localStorage.setItem('ticTacToeStats', JSON.stringify(statistics))
}

// Función para cargar estadísticas
function loadStatistics() {
  const stats = localStorage.getItem('ticTacToeStats')
  if (stats) {
    return JSON.parse(stats)
  } else {
    return { winsX: 0, winsO: 0, draws: 0 }
  }
}

// Función para actualizar las estadísticas
function updateStatistics(result) {
  const statistics = loadStatistics()

  if (result === 'X') {
    statistics.winsX += 1
  } else if (result === 'O') {
    statistics.winsO += 1
  } else if (result === 'draw') {
    statistics.draws += 1
  }

  saveStatistics(statistics)
  return statistics
}

// Función para actualizar la interfaz de usuario de las estadísticas
function updateStatisticsUI(statistics) {
  winsXDisplay.textContent = statistics.winsX
  winsODisplay.textContent = statistics.winsO
  drawsDisplay.textContent = statistics.draws
}

// Función para comprobar si el tablero está lleno (empate)
function isBoardFull() {
  return board.every((cell) => cell !== null)
}

// Función de limpieza del juego
export const cleanupTicTacToe = () => {
  const cells = document.querySelectorAll('.cell')
  cells.forEach((cell) => cell.removeEventListener('click', cellClickHandler))

  const resetButton = document.querySelector('#reset-button')
  if (resetButton) {
    resetButton.removeEventListener('click', resetButtonHandler)
  }

  const cssLink = document.getElementById('tictactoe-css')
  if (cssLink) {
    cssLink.remove()
  }

  const container = document.getElementById('tic-tac-toe-container')
  if (container) {
    container.remove()
  }
}
