import {
  updateResultDisplay,
  clearResultDisplay
} from '../../../components/Result/result.js'

export function createTicTacToeUI(container) {
  const gameContainer = document.createElement('div')
  gameContainer.id = 'tic-tac-toe-container'

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

  return {
    gameContainer,
    boardCells: gameContainer.querySelectorAll('.cell'),
    resetButton: gameContainer.querySelector('#reset-button'),
    winsXDisplay: gameContainer.querySelector('#wins-x'),
    winsODisplay: gameContainer.querySelector('#wins-o'),
    drawsDisplay: gameContainer.querySelector('#draws'),
    subtitle: gameContainer.querySelector('#ticsub')
  }
}

export function showResult(message) {
  updateResultDisplay(message)
}

export function clearResult() {
  clearResultDisplay()
}

export function removeTicTacToeUI() {
  const container = document.getElementById('tic-tac-toe-container')
  if (container) container.remove()
}

export function updateCellUI(cellElement, playerEmoji) {
  cellElement.textContent = playerEmoji
}

export function resetBoardUI(boardCells) {
  boardCells.forEach((cell) => {
    cell.textContent = ''
  })
}

export function updateStatsUI({ winsX, winsO, draws }, refs) {
  refs.winsXDisplay.textContent = winsX
  refs.winsODisplay.textContent = winsO
  refs.drawsDisplay.textContent = draws
}
