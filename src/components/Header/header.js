import '/src/components/Header/header.css'

export const Header = (headerApp) => {
  const header = document.createElement('header')

  const buttonsimon = document.createElement('button')
  const buttonslot = document.createElement('button')
  const buttontic = document.createElement('button')
  const buttonHome = document.createElement('button')

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

  const handleGameClick = (game) => {
    if (game !== 'tictactoe') {
      if (window.homeMusic) {
        window.homeMusic.pause()
        window.homeMusic.currentTime = 0
      }
    } else {
      if (window.homeMusic && window.homeMusic.paused && !window.isMuted) {
        window.homeMusic.play().catch((error) => {
          console.log('Error al reproducir homeMusic en Tic Tac Toe:', error)
        })
      }
    }
    loadGame(game)
  }

  const gameButtons = [
    { button: buttonsimon, game: 'simon' },
    { button: buttonslot, game: 'superslotmachine' },
    { button: buttontic, game: 'tictactoe' }
  ]

  gameButtons.forEach(({ button, game }) => {
    button.addEventListener('click', () => handleGameClick(game))
  })

  buttonHome.addEventListener('click', () => {
    cleanupCurrentGame()
  })

  const divCasita = document.createElement('div')
  divCasita.classList.add('casita')
  divCasita.appendChild(buttonHome)

  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('button-container')
  buttonContainer.append(buttonsimon, buttonslot, buttontic)

  const musicToggleContainer = document.createElement('div')
  musicToggleContainer.classList.add('music-toggle-container')

  const musicToggleInput = document.createElement('input')
  musicToggleInput.type = 'checkbox'
  musicToggleInput.id = 'musicToggle'

  const musicToggleLabel = document.createElement('label')
  musicToggleLabel.setAttribute('for', 'musicToggle')
  musicToggleLabel.classList.add('music-toggle')
  musicToggleLabel.innerHTML = `
    <span class="toggle-icon on">&#128266;</span>
    <span class="toggle-icon off">&#128263;</span>
  `

  musicToggleContainer.appendChild(musicToggleInput)
  musicToggleContainer.appendChild(musicToggleLabel)

  header.append(divCasita, buttonContainer, musicToggleContainer)
  headerApp.append(header)

  const savedMuteState = localStorage.getItem('isMuted') === 'true'
  window.isMuted = savedMuteState
  if (window.homeMusic) {
    window.homeMusic.muted = savedMuteState
  }
  musicToggleInput.checked = savedMuteState

  musicToggleInput.addEventListener('change', () => {
    if (window.toggleAudio) {
      window.toggleAudio()
      musicToggleInput.checked = window.isMuted
    }
  })

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
