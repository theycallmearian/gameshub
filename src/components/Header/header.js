import '/src/components/Header/header.css'

export const Header = (headerApp) => {
  const header = document.createElement('header')

  const buttonsimon = document.createElement('button')
  const buttonslot = document.createElement('button')
  const buttontic = document.createElement('button')
  const buttonHome = document.createElement('button')

  // Títulos y emojis
  const titles = {
    simon: 'Simon',
    slot: 'Super Slot Machine',
    tic: 'Tic, Tac, Toe',
    home: '🏠'
  }

  const emojis = {
    simon: '🚦',
    slot: '🎰',
    tic: '❌',
    home: '🏠'
  }

  buttonsimon.textContent = titles.simon
  buttonslot.textContent = titles.slot
  buttontic.textContent = titles.tic
  buttonHome.innerHTML = emojis.home

  // Función para manejar clics en los botones de juego
  const handleGameClick = (game) => {
    if (game !== 'tictactoe') {
      if (window.homeMusic) {
        window.homeMusic.pause()
        window.homeMusic.currentTime = 0
      }
    } else {
      // Para Tic Tac Toe, si la música está pausada y no está mute, se reproduce
      if (window.homeMusic && window.homeMusic.paused && !window.isMuted) {
        window.homeMusic.play().catch((error) => {
          console.log('Error al reproducir homeMusic en Tic Tac Toe:', error)
        })
      }
    }
    loadGame(game)
  }

  // Asignar eventos a los botones de juego
  const gameButtons = [
    { button: buttonsimon, game: 'simon' },
    { button: buttonslot, game: 'superslotmachine' },
    { button: buttontic, game: 'tictactoe' }
  ]

  gameButtons.forEach(({ button, game }) => {
    button.addEventListener('click', () => handleGameClick(game))
  })

  // Evento para el botón Home
  buttonHome.addEventListener('click', () => {
    cleanupCurrentGame()
  })

  // Contenedor para el botón Home (casita)
  const divCasita = document.createElement('div')
  divCasita.classList.add('casita')
  divCasita.appendChild(buttonHome)

  // Contenedor para los botones de juego
  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('button-container')
  buttonContainer.append(buttonsimon, buttonslot, buttontic)

  // --- Toggle de Música Personalizado ---
  const musicToggleContainer = document.createElement('div')
  musicToggleContainer.classList.add('music-toggle-container')

  // Input checkbox oculto
  const musicToggleInput = document.createElement('input')
  musicToggleInput.type = 'checkbox'
  musicToggleInput.id = 'musicToggle'

  // Label que actuará como toggle
  const musicToggleLabel = document.createElement('label')
  musicToggleLabel.setAttribute('for', 'musicToggle')
  musicToggleLabel.classList.add('music-toggle')
  musicToggleLabel.innerHTML = `
    <span class="toggle-icon on">&#128266;</span>
    <span class="toggle-icon off">&#128263;</span>
  `

  musicToggleContainer.appendChild(musicToggleInput)
  musicToggleContainer.appendChild(musicToggleLabel)
  // --- Fin Toggle de Música ---

  header.append(divCasita, buttonContainer, musicToggleContainer)
  headerApp.append(header)

  // Aplicar estado de mute desde localStorage al cargar la página
  const savedMuteState = localStorage.getItem('isMuted') === 'true'
  window.isMuted = savedMuteState
  if (window.homeMusic) {
    window.homeMusic.muted = savedMuteState
  }
  musicToggleInput.checked = savedMuteState

  // Evento para el toggle de música
  musicToggleInput.addEventListener('change', () => {
    if (window.toggleAudio) {
      window.toggleAudio()
      musicToggleInput.checked = window.isMuted
    }
  })

  // Actualiza los títulos según el tamaño de la pantalla
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
  window.addEventListener('resize', updateButtonTitles)
  updateButtonTitles()
}

export const createMain = (mainApp) => {
  const main = document.createElement('main')
  const divApp = document.createElement('div')
  divApp.id = 'app'
  main.appendChild(divApp)
  mainApp.appendChild(main)
}
