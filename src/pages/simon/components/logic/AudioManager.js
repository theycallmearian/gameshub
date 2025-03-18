const sounds = {
  green: new Audio('/sounds/green.mp3'),
  red: new Audio('/sounds/red.mp3'),
  yellow: new Audio('/sounds/yellow.mp3'),
  blue: new Audio('/sounds/blue.mp3'),
  wrong: new Audio('/sounds/wrong.mp3')
}

Object.values(sounds).forEach((sound) => {
  sound.volume = 0.2
})

export function playColorSound(color) {
  if (sounds[color]) {
    sounds[color].currentTime = 0
    sounds[color].play()
  }
}

export function playWrongSound() {
  sounds.wrong.currentTime = 0
  sounds.wrong.play()
}
