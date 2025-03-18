import './style.css'
import { Header, createMain } from './src/components/Header/header.js'
import { initSimon, cleanupSimon } from './src/pages/simon/index.js'
import { initTicTacToe, cleanupTicTacToe } from './src/pages/tictactoe/index.js'
import {
  initSuperSlotMachine,
  cleanupSuperSlotMachine
} from './src/pages/superslotmachine/index.js'

const headerApp = document.querySelector('body')
Header(headerApp)

const mainApp = document.querySelector('body')
createMain(mainApp)

const appDiv = document.getElementById('app')
const mainTitle = document.createElement('h1')
const subTitle = document.createElement('h2')
mainTitle.id = 'games-hub-title'
mainTitle.textContent = 'Games Hub'
subTitle.id = 'games-hub-subtitle'
subTitle.textContent = 'Select a Game To Start'
mainTitle.style.textAlign = 'center'
subTitle.style.textAlign = 'center'
appDiv.appendChild(mainTitle)
appDiv.appendChild(subTitle)

const cleanupFunctions = {
  simon: cleanupSimon,
  tictactoe: cleanupTicTacToe,
  superslotmachine: cleanupSuperSlotMachine
}

const cssLinks = {
  simon: './src/pages/simon/simon.css',
  tictactoe: './src/pages/tictactoe/tictactoe.css',
  superslotmachine: './src/pages/superslotmachine/superslotmachine.css'
}

let currentGame = null
let currentCssLink = null

let homeMusic = new Audio('sounds/home-music.mp3')
homeMusic.loop = true
homeMusic.volume = 0.1

window.homeMusic = homeMusic

let isMuted = localStorage.getItem('isMuted') === 'true'
window.isMuted = isMuted

homeMusic.muted = isMuted

if (!isMuted) {
  homeMusic.play().catch((error) => {
    console.log(
      'HomeMusic no pudo reproducirse de inicio (sin interacción):',
      error
    )
  })
}

const saveMutePreference = () => {
  localStorage.setItem('isMuted', isMuted)
}

const loadGame = (game) => {
  if (game === 'tictactoe') {
    if (homeMusic.paused && !isMuted) {
      homeMusic.play().catch((error) => {
        console.log('Error al reproducir homeMusic para Tic Tac Toe:', error)
      })
    }
  } else {
    homeMusic.pause()
    homeMusic.currentTime = 0
  }

  if (currentGame && cleanupFunctions[currentGame]) {
    cleanupFunctions[currentGame]()
  }
  if (currentCssLink) {
    document.head.removeChild(currentCssLink)
    currentCssLink = null
  }

  mainTitle.style.display = 'none'
  subTitle.style.display = 'none'

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = cssLinks[game]
  document.head.appendChild(link)
  currentCssLink = link

  currentGame = game

  switch (game) {
    case 'simon':
      initSimon(appDiv)
      break
    case 'superslotmachine':
      initSuperSlotMachine(appDiv)
      break
    case 'tictactoe':
      initTicTacToe(appDiv)
      break
  }
}

const cleanupCurrentGame = () => {
  if (currentGame && cleanupFunctions[currentGame]) {
    cleanupFunctions[currentGame]()
    currentGame = null

    if (currentCssLink) {
      document.head.removeChild(currentCssLink)
      currentCssLink = null
    }

    appDiv.innerHTML = ''

    appDiv.appendChild(mainTitle)
    appDiv.appendChild(subTitle)
    mainTitle.style.display = 'block'
    subTitle.style.display = 'block'

    if (!isMuted) {
      homeMusic.play().catch((error) => {
        console.log('Error al reanudar homeMusic:', error)
      })
    }
  }
}

window.loadGame = loadGame
window.cleanupCurrentGame = cleanupCurrentGame

window.toggleAudio = function () {
  isMuted = !isMuted
  window.isMuted = isMuted

  if (!isMuted && homeMusic.paused) {
    homeMusic.play().catch((error) => {
      console.log('Error al reanudar homeMusic al desmutear:', error)
    })
  } else if (isMuted) {
    homeMusic.pause()
  }

  homeMusic.muted = isMuted
  saveMutePreference()

  const audioElements = document.querySelectorAll('audio')
  audioElements.forEach((audio) => {
    audio.muted = isMuted
  })
}
