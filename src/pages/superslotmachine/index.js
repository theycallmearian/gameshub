import './superslotmachine.css'

import { createUI } from './components/SuperSlotMachineUI.js'
import {
  sounds,
  stopAllSounds,
  toggleBackgroundMusic,
  setMutedState
} from './components/SuperSlotMachineSounds.js'
import {
  initLogic,
  spinAll,
  resetGame,
  cleanupLogic
} from './components/SuperSlotMachineLogic.js'

export function initSuperSlotMachine(container) {
  const cssLink = document.createElement('link')
  cssLink.rel = 'stylesheet'
  cssLink.href = '/src/pages/superslotmachine/superslotmachine.css'
  cssLink.id = 'superslotmachine-css'
  document.head.appendChild(cssLink)

  createUI(container)

  initLogic()

  document.getElementById('spinAll').addEventListener('click', spinAll)
  document.getElementById('resetButton').addEventListener('click', resetGame)
  document
    .getElementById('checkboxInput')
    .addEventListener('change', toggleBackgroundMusic)

  const musicCheckbox = document.getElementById('checkboxInput')
  if (musicCheckbox && !musicCheckbox.checked) {
    sounds.backgroundMusic.play()
    setMutedState(false)
  } else {
    setMutedState(true)
  }
}

export function cleanupSuperSlotMachine() {
  cleanupLogic()

  document.getElementById('spinAll')?.removeEventListener('click', spinAll)
  document
    .getElementById('resetButton')
    ?.removeEventListener('click', resetGame)
  document
    .getElementById('checkboxInput')
    ?.removeEventListener('change', toggleBackgroundMusic)

  const cssLink = document.getElementById('superslotmachine-css')
  if (cssLink) {
    cssLink.remove()
  }

  const appContainer = document.getElementById('app')
  if (appContainer) {
    appContainer.innerHTML = ''
  }
}
