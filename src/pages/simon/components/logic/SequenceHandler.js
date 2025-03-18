import gameState from './gamestate.js'
import { playColorSound, playWrongSound } from './AudioManager.js'
import { addToScore } from './ScoreManager.js'
import { showResult } from '../SimonUI.js'

export function nextLevel() {
  gameState.level++
  gameState.playerSequence = []
  gameState.canClick = false

  const randomColor = ['green', 'red', 'yellow', 'blue'][
    Math.floor(Math.random() * 4)
  ]
  gameState.gameSequence.push(randomColor)

  flashSequence()
}

export function flashSequence() {
  let delay = 0
  gameState.gameSequence.forEach((color) => {
    setTimeout(() => {
      flashColor(color)
    }, delay)
    delay += 1000
  })
  setTimeout(() => {
    gameState.canClick = true
  }, delay)
}

function flashColor(color) {
  const button = document.getElementById(color)
  if (!button) return

  button.classList.add('active')
  playColorSound(color)
  setTimeout(() => {
    button.classList.remove('active')
  }, 500)
}

export function handleColorClick(color) {
  if (!gameState.canClick || !gameState.isPlaying) return

  gameState.playerSequence.push(color)
  flashColor(color)

  const index = gameState.playerSequence.length - 1

  if (gameState.playerSequence[index] !== gameState.gameSequence[index]) {
    gameOver()
    return
  }

  if (gameState.playerSequence.length === gameState.gameSequence.length) {
    addToScore(gameState.level * 10)
    showResult(`✅ ¡Bien hecho! Nivel ${gameState.level} completado.`)
    setTimeout(() => {
      nextLevel()
    }, 1000)
  }
}

export function gameOver() {
  gameState.isPlaying = false
  gameState.canClick = false
  playWrongSound()
  showResult(`❌ ¡Has perdido! Puntuación final: ${gameState.score}.`)
}
