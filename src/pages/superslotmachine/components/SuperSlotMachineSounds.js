export const sounds = {
  spinSound: new Audio('sounds/spin.mp3'),
  winSound: new Audio('sounds/win.mp3'),
  loseSound: new Audio('sounds/lose.mp3'),
  backgroundMusic: new Audio('sounds/background-music.mp3'),
  gameOverSound: new Audio('sounds/gameover.mp3'),
  bowserSound: new Audio('sounds/bowser.mp3')
}

let isMusicMuted = false

sounds.backgroundMusic.loop = true
sounds.backgroundMusic.volume = 0.3

Object.keys(sounds).forEach((soundKey) => {
  if (soundKey !== 'backgroundMusic') {
    sounds[soundKey].volume = 0.4
  }
})

export function playSoundWithMusicControl(sound) {
  if (!isMusicMuted) {
    sounds.backgroundMusic.pause()
  }
  sound.play()

  sound.onended = () => {
    if (!isMusicMuted) {
      sounds.backgroundMusic.play()
    }
  }
}

export function toggleBackgroundMusic() {
  if (isMusicMuted) {
    sounds.backgroundMusic.play()
    isMusicMuted = false
  } else {
    sounds.backgroundMusic.pause()
    isMusicMuted = true
  }
}

export function stopAllSounds() {
  Object.values(sounds).forEach((sound) => {
    sound.pause()
    sound.currentTime = 0
  })
}

export function isMuted() {
  return isMusicMuted
}

export function setMutedState(newState) {
  isMusicMuted = newState
  if (isMusicMuted) {
    sounds.backgroundMusic.pause()
  } else {
    sounds.backgroundMusic.play().catch(() => {})
  }
}
