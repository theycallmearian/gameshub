import gameState from './GameState.js'
import {
  makeMove,
  checkWinner,
  isBoardFull,
  resetBoard,
  switchPlayer,
  endGame
} from './BoardManager.js'
import { updateStatistics, getStatistics } from './StatsManager.js'

export function startGame() {
  resetBoard()
  gameState.currentPlayer = '🟡'
  gameState.gameOver = false
}

export function handleCellClick(cellIndex) {
  if (!makeMove(cellIndex)) {
    return null
  }

  if (checkWinner()) {
    endGame(gameState.currentPlayer)
    return { status: 'win', winner: gameState.currentPlayer }
  }

  if (isBoardFull()) {
    endGame('draw')
    return { status: 'draw' }
  }

  switchPlayer()
  return { status: 'continue', nextPlayer: gameState.currentPlayer }
}

export function getBoard() {
  return gameState.board
}

export function getCurrentPlayer() {
  return gameState.currentPlayer
}

export function isGameOver() {
  return gameState.gameOver
}

export function loadStats() {
  return getStatistics()
}
