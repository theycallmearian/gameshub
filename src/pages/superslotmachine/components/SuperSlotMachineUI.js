import { images } from './SuperSlotMachineLogic.js'

export function createUI(container) {
  const gameContainer = document.createElement('div')
  gameContainer.classList.add('slot-machine')

  gameContainer.innerHTML = `
    <div class="header">
      <h1>Super Slot Machine</h1>
      <input type="checkbox" id="checkboxInput">
      <label for="checkboxInput" class="toggleSwitch">
        <div class="speaker">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 75 75">
            <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z" style="stroke:#fff;stroke-width:5;stroke-linejoin:round;fill:#fff;"></path>
            <path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style="fill:none;stroke:#fff;stroke-width:5;stroke-linecap:round"></path>
          </svg>
        </div>
        <div class="mute-speaker">
          <svg version="1.0" viewBox="0 0 75 75" stroke="#fff" stroke-width="5">
            <path d="m39,14-17,15H6V48H22l17,15z" fill="#fff" stroke-linejoin="round"></path>
            <path d="m49,26 20,24m0-24-20,24" fill="#fff" stroke-linecap="round"></path>
          </svg>
        </div>
      </label>
      <div class="coin-zone">
        <img class="coinIcon" src="https://res.cloudinary.com/dye4qdrys/image/upload/v1727174364/coin_igvfsm.png" alt="Moneda">
        <span id="coinsDisplay">0</span>
        <img class="coinIcon" src="https://res.cloudinary.com/dye4qdrys/image/upload/v1727174364/coin_igvfsm.png" alt="Moneda">
      </div>
    </div>
    <div class="reels">
      <div id="reel1" class="reel"><img src="${images[0]}" alt="Personaje 1"></div>
      <div id="reel2" class="reel"><img src="${images[0]}" alt="Personaje 2"></div>
      <div id="reel3" class="reel"><img src="${images[0]}" alt="Personaje 3"></div>
    </div>
    <div class="buttons">
      <button class="spin-button large" id="spinAll">Spin</button>
      <button class="spin-button large" id="resetButton" style="display:none;">Retry</button>
    </div>
    <div class="result-box">
      <p id="result"></p>
    </div>
  `

  container.appendChild(gameContainer)
}

export function displayMessage(message) {
  const result = document.getElementById('result')
  if (result) {
    result.innerText = message
  }
}

export function toggleButton(id, state) {
  const button = document.getElementById(id)
  if (button) {
    button.disabled = !state
  }
}
