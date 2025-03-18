import gameState from './gamestate.js'
import {
  resetScore,
  addToScore,
  getScore,
  loadHighScore,
  saveHighScore,
  getHighScore
} from './ScoreManager.js'
import { playColorSound, playWrongSound } from './AudioManager.js'
import {
  nextLevel,
  handleColorClick,
  flashSequence,
  gameOver
} from './SequenceHandler.js'

function startGame() {
  if (gameState.isPlaying) return
  gameState.isPlaying = true
  gameState.canClick = false

  gameState.gameSequence = []
  gameState.playerSequence = []
  gameState.level = 0
  resetScore()

  nextLevel()
}

function resetState() {
  gameState.gameSequence = []
  gameState.playerSequence = []
  gameState.level = 0
  gameState.score = 0
  gameState.isPlaying = false
  gameState.canClick = false
}

function getGameState() {
  return gameState
}

export {
  startGame,
  resetState,
  handleColorClick,
  getScore,
  loadHighScore,
  saveHighScore,
  getHighScore,
  nextLevel,
  flashSequence,
  gameOver,
  getGameState
}
