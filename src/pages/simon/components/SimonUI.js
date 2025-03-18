import {
  updateResultDisplay,
  clearResultDisplay
} from '../../../components/Result/result.js'

export function createSimonUI(container) {
  const gameContainer = document.createElement('div')
  gameContainer.id = 'simon-game-container'

  gameContainer.innerHTML = `
    <button id="start-button">Start</button>
    <div class="color-buttons">
      <button id="green" class="color-button"></button>
      <button id="red" class="color-button"></button>
      <button id="yellow" class="color-button"></button>
      <button id="blue" class="color-button"></button>
    </div>
    <div id="score-container">
      <p>Score: <span id="score">0</span></p>
      <p>High Score: <span id="high-score">0</span></p>
    </div>
    <div id="game-result"></div>
  `

  container.appendChild(gameContainer)

  return {
    gameContainer,
    startButton: gameContainer.querySelector('#start-button'),
    colorButtons: gameContainer.querySelectorAll('.color-button'),
    scoreSpan: gameContainer.querySelector('#score'),
    highScoreSpan: gameContainer.querySelector('#high-score')
  }
}

export function showResult(message) {
  updateResultDisplay(message)
}

export function clearResult() {
  clearResultDisplay()
}

export function removeSimonUI() {
  const container = document.getElementById('simon-game-container')
  if (container) container.remove()
}
