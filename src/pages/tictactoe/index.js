import './tictactoe.css'

import {
  createTicTacToeUI,
  removeTicTacToeUI,
  showResult,
  clearResult,
  updateCellUI,
  resetBoardUI,
  updateStatsUI
} from './components/TicTacToeUI.js'

import {
  startGame,
  handleCellClick,
  getBoard,
  getCurrentPlayer,
  isGameOver,
  loadStats
} from './components/logic/index.js'

export function initTicTacToe(container) {
  const refs = createTicTacToeUI(container)

  const stats = loadStats()
  updateStatsUI(stats, refs)

  startGame()
  resetBoardUI(refs.boardCells)
  clearResult()

  refs.subtitle.style.display = 'block'

  refs.boardCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const index = parseInt(cell.dataset.index)
      if (isGameOver()) return

      const result = handleCellClick(index)

      if (result) {
        const board = getBoard()
        updateCellUI(cell, board[index])

        if (result.status === 'win') {
          showResult(`🎉 ¡${result.winner} gana!`)

          updateStatsUI(loadStats(), refs)
        } else if (result.status === 'draw') {
          showResult('😮 ¡Empate!')
          updateStatsUI(loadStats(), refs)
        } else if (result.status === 'continue') {
        }
      }

      refs.subtitle.style.display = 'none'
    })
  })

  refs.resetButton.addEventListener('click', () => {
    startGame()
    resetBoardUI(refs.boardCells)
    clearResult()

    refs.subtitle.style.display = 'block'
  })
}

export function cleanupTicTacToe() {
  removeTicTacToeUI()
  clearResult()
}
