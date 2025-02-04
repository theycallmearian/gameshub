import '/src/components/Header/header.css'

export const Header = (headerApp) => {
  const header = document.createElement('header')

  const buttonsimon = document.createElement('button')
  const buttonslot = document.createElement('button')
  const buttontic = document.createElement('button')
  const buttonHome = document.createElement('button')

  // Títulos originales y emojis
  const titles = {
    simon: 'Simon',
    slot: 'Super Slot Machine',
    tic: 'Tic, Tac, Toe',
    home: '🏠'
  }

  const emojis = {
    simon: '🚦',
    slot: '🎰',
    tic: '📅',
    home: '🏠'
  }

  // Configurar texto inicial
  buttonsimon.textContent = titles.simon
  buttonslot.textContent = titles.slot
  buttontic.textContent = titles.tic
  buttonHome.innerHTML = emojis.home

  // Añadir eventos para los botones
  buttonsimon.addEventListener('click', () => {
    homeMusic.pause()
    homeMusic.currentTime = 0
    loadGame('simon')
  })
  buttonslot.addEventListener('click', () => {
    homeMusic.pause()
    homeMusic.currentTime = 0
    loadGame('superslotmachine')
  })
  buttontic.addEventListener('click', () => {
    homeMusic.pause()
    homeMusic.currentTime = 0
    loadGame('tictactoe')
  })
  buttonHome.addEventListener('click', () => {
    cleanupCurrentGame()
  })

  // Crear un contenedor específico para la casita
  const divCasita = document.createElement('div')
  divCasita.classList.add('casita')
  divCasita.appendChild(buttonHome)

  // Crear el contenedor para los botones de los juegos
  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('button-container')
  buttonContainer.append(buttonsimon, buttonslot, buttontic)

  header.append(divCasita, buttonContainer)
  headerApp.append(header)

  // Añadir la música de la página principal
  homeMusic = new Audio('sounds/home-music.mp3')
  homeMusic.loop = true
  homeMusic.volume = 0.3

  // Reproducir la música de la página principal al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    homeMusic.play()
  })

  // Listener para cambiar texto a emojis según el tamaño de la pantalla
  const updateButtonTitles = () => {
    if (window.innerWidth <= 1080) {
      buttonsimon.textContent = emojis.simon
      buttonslot.textContent = emojis.slot
      buttontic.textContent = emojis.tic
    } else {
      buttonsimon.textContent = titles.simon
      buttonslot.textContent = titles.slot
      buttontic.textContent = titles.tic
    }
  }

  // Escuchar cambios de tamaño en la ventana
  window.addEventListener('resize', updateButtonTitles)

  // Llamar al inicio para ajustar según el tamaño actual
  updateButtonTitles()
}

// Declarar la música de la página principal para que esté disponible globalmente
let homeMusic

// Crear y exportar la función createMain que añade el contenedor principal del juego
export const createMain = (mainApp) => {
  const main = document.createElement('main')
  const divApp = document.createElement('div')
  divApp.id = 'app'
  main.appendChild(divApp)
  mainApp.appendChild(main)
}
