import gameState from './gamestate.js'

export function resetScore() {
  gameState.score = 0
}

export function addToScore(points) {
  gameState.score += points
}

export function getScore() {
  return gameState.score
}

export function loadHighScore() {
  const saved = localStorage.getItem('simonGameHighScore')
  gameState.highScore = saved ? parseInt(saved, 10) : 0
  return gameState.highScore
}

export function saveHighScore() {
  if (gameState.score > gameState.highScore) {
    gameState.highScore = gameState.score
    localStorage.setItem('simonGameHighScore', gameState.highScore)
  }
  return gameState.highScore
}

export function getHighScore() {
  return gameState.highScore
}
