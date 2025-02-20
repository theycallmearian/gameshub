import './style.css'
import { Header, createMain } from './src/components/Header/header.js'
import { initSimon, cleanupSimon } from './src/pages/simon/simon.js'
import {
  initTicTacToe,
  cleanupTicTacToe
} from './src/pages/tictactoe/tictactoe.js'
import {
  initSuperSlotMachine,
  cleanupSuperSlotMachine
} from './src/pages/superslotmachine/superslotmachine.js'

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

const loadGame = (game) => {
  homeMusic.pause()
  homeMusic.currentTime = 0

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

    homeMusic.play().catch((error) => {
      console.log(
        'Reproducción de música fallida debido a falta de interacción del usuario.'
      )
    })
  }
}

window.loadGame = loadGame
window.cleanupCurrentGame = cleanupCurrentGame

document.addEventListener(
  'click',
  () => {
    if (homeMusic.paused) {
      homeMusic.play().catch((error) => {
        console.log(
          'No se pudo reproducir la música hasta que el usuario interactúe con la página.'
        )
      })
    }
  },
  { once: true }
)
