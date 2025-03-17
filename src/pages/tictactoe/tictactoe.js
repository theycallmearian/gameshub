import '/src/pages/tictactoe/tictactoe.css'
import {
  updateResultDisplay,
  clearResultDisplay
} from '../../components/Result/result.js'

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
      <h3 id="ticsub">Pulsa una casilla</h3>
    </div>
    <div id="tic-tac-toe-board">
        ${Array(9)
          .fill(0)
          .map((_, i) => `<div class="cell" data-index="${i}"></div>`)
          .join('')}
    </div>
    <div id="statistics">
        <h3>Estadísticas</h3>
        <p>Ganadas por 🟡: <span id="wins-x">0</span></p>
        <p>Ganadas por 👻: <span id="wins-o">0</span></p>
        <p>Empates: <span id="draws">0</span></p>
    </div>
    <button id="reset-button">Reiniciar Juego</button>
    <div id="game-result"></div>
  `

  container.appendChild(gameContainer)

  // Inicializar estado del juego
  board = Array(9).fill(null)
  currentPlayer = '🟡'
  gameOver = false

  const cells = gameContainer.querySelectorAll('.cell')
  const resetButton = gameContainer.querySelector('#reset-button')
  const subtitle = gameContainer.querySelector('#ticsub')

  winsXDisplay = gameContainer.querySelector('#wins-x')
  winsODisplay = gameContainer.querySelector('#wins-o')
  drawsDisplay = gameContainer.querySelector('#draws')

  subtitle.style.display = 'block'

  // Cargar estadísticas guardadas
  const initialStats = loadStatistics()
  updateStatisticsUI(initialStats)

  // Añadir eventos a las celdas del tablero
  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      if (subtitle.style.display === 'block') {
        subtitle.style.display = 'none'
      }
      cellClickHandler(e)
    })
  })

  // Añadir evento al botón de reinicio
  resetButton.addEventListener('click', () => {
    resetButtonHandler()
    subtitle.style.display = 'block'
  })

  // Limpiar resultado previo
  clearResultDisplay()
}

// Variables globales para el estado del juego
let board = Array(9).fill(null)
let currentPlayer = '🟡'
let gameOver = false
let winsXDisplay
let winsODisplay
let drawsDisplay

function cellClickHandler(e) {
  // Comprobamos que la celda esté vacía y el juego no haya terminado
  if (!gameOver && e.target.textContent.trim() === '') {
    const cellIndex = parseInt(e.target.dataset.index)
    if (makeMove(cellIndex, currentPlayer)) {
      updateGameBoard(cellIndex, currentPlayer)
      if (checkWinner(currentPlayer)) {
        updateResultDisplay(`🎉 ¡${currentPlayer} gana!`)
        gameOver = true
        const updatedStats = updateStatistics(currentPlayer)
        updateStatisticsUI(updatedStats)
      } else if (isBoardFull()) {
        updateResultDisplay('😮 ¡Empate!')
        gameOver = true
        const updatedStats = updateStatistics('draw')
        updateStatisticsUI(updatedStats)
      } else {
        // Alternar turno
        currentPlayer = currentPlayer === '🟡' ? '👻' : '🟡'
      }
    }
  }
}

function resetButtonHandler() {
  resetGame()
  resetUI()
  currentPlayer = '🟡'
  gameOver = false
  clearResultDisplay()
}

function makeMove(index, player) {
  if (board[index] === null) {
    board[index] = player
    return true
  }
  return false
}

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

function resetGame() {
  board = Array(9).fill(null)
}

function updateGameBoard(index, player) {
  const cell = document.querySelector(`.cell[data-index="${index}"]`)
  if (cell) {
    // Asignar el emoji al textContent de la celda
    cell.textContent = player
  }
}

function resetUI() {
  const cells = document.querySelectorAll('.cell')
  cells.forEach((cell) => (cell.textContent = ''))
}

function saveStatistics(statistics) {
  localStorage.setItem('ticTacToeStats', JSON.stringify(statistics))
}

function loadStatistics() {
  const stats = localStorage.getItem('ticTacToeStats')
  return stats ? JSON.parse(stats) : { winsX: 0, winsO: 0, draws: 0 }
}

function updateStatistics(result) {
  const statistics = loadStatistics()

  // Aquí, tratamos a '🟡' como X, y '👻' como O
  if (result === '🟡') {
    statistics.winsX += 1
  } else if (result === '👻') {
    statistics.winsO += 1
  } else if (result === 'draw') {
    statistics.draws += 1
  }

  saveStatistics(statistics)
  return statistics
}

function updateStatisticsUI(statistics) {
  winsXDisplay.textContent = statistics.winsX
  winsODisplay.textContent = statistics.winsO
  drawsDisplay.textContent = statistics.draws
}

function isBoardFull() {
  return board.every((cell) => cell !== null)
}

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

  clearResultDisplay()
}
