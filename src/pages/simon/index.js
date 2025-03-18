import './simon.css'
import {
  createSimonUI,
  removeSimonUI,
  showResult,
  clearResult
} from './components/SimonUI.js'

import {
  startGame,
  resetState,
  handleColorClick,
  getScore,
  loadHighScore,
  saveHighScore
} from './components/logic/index.js'

export function initSimon(container) {
  const { gameContainer, startButton, colorButtons, scoreSpan, highScoreSpan } =
    createSimonUI(container)

  const currentHighScore = loadHighScore()
  highScoreSpan.textContent = currentHighScore

  clearResult()

  startButton.addEventListener('click', () => {
    resetState()
    startGame()
    updateScoreUI()
  })

  colorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const color = button.id
      handleColorClick(color)
      updateScoreUI()

      saveHighScore()
      highScoreSpan.textContent = loadHighScore()
    })
  })

  function updateScoreUI() {
    scoreSpan.textContent = getScore()
  }
}

export function cleanupSimon() {
  removeSimonUI()
  clearResult()
}
