import gameState from './GameState.js'
import { updateStatistics } from './StatsManager.js'

export function makeMove(index) {
  if (gameState.board[index] !== null || gameState.gameOver) {
    return false
  }
  gameState.board[index] = gameState.currentPlayer
  return true
}

export function checkWinner() {
  const b = gameState.board
  const p = gameState.currentPlayer

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  return winPatterns.some((pattern) => pattern.every((i) => b[i] === p))
}

export function isBoardFull() {
  return gameState.board.every((cell) => cell !== null)
}

export function endGame(result) {
  gameState.gameOver = true
  if (result === 'draw') {
    updateStatistics('draw')
  } else {
    updateStatistics(result)
  }
}

export function resetBoard() {
  gameState.board = Array(9).fill(null)
  gameState.gameOver = false
}

export function switchPlayer() {
  gameState.currentPlayer = gameState.currentPlayer === '🟡' ? '👻' : '🟡'
}
