import {
  loadCoins,
  getCoins,
  updateCoinsDisplay,
  decreaseCoins,
  increaseCoins,
  resetCoins
} from './SuperSlotMachineCoins.js'

import {
  sounds,
  playSoundWithMusicControl,
  stopAllSounds
} from './SuperSlotMachineSounds.js'

import { displayMessage, toggleButton } from './SuperSlotMachineUI.js'

export const images = [
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134696/marioprofile_vnp0cm.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1727594847/yoshiprofile_ktfxbq.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134186/diddykongprofile_eymofs.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134730/princess-peach-luigi-peach-nintendo-princess-peach-character-mario-party-star-rush-mario-bros-free-png_hggber.webp',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134758/b1ff944a4e722c9d2c98648ff3cf1518_bruhzg.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1727174273/toadprofile_q6hrkf.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134786/96d136000d1c03e095ba6044c941fd2f_cupyzz.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134806/7fd012d1f80c03f3da704bb2fe0fd356_ftjkzo.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1729134829/bowserprofile_kkwwqt.png'
]

let isSpinning = false
let spinIntervals = []
let reelsSpun = 0

export function initLogic() {
  loadCoins()
  updateCoinsDisplay()
}

export function spinAll() {
  if (isSpinning) return

  isSpinning = true
  reelsSpun = 0
  toggleButton('spinAll', false)
  document.getElementById('resetButton').style.display = 'none'
  displayMessage('')

  if (getCoins() <= 0) {
    showGameOver()
    isSpinning = false
    return
  }

  decreaseCoins(5)

  const reel1 = document.getElementById('reel1')
  const reel2 = document.getElementById('reel2')
  const reel3 = document.getElementById('reel3')

  stopAllSounds()
  playSoundWithMusicControl(sounds.spinSound)

  const finalIndices = []

  const winningChance = 0.3
  const isWinningSpin = Math.random() < winningChance
  const bowserChance = 0.2
  const winningIndex = Math.floor(Math.random() * 8)
  const bowserIndex = 8

  function spinReel(reel, duration, index) {
    let spinCounter = 0
    const spinInterval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * 8)

      reel.querySelector('img').src = images[randomIndex]
      spinCounter++

      if (spinCounter * 20 >= duration) {
        clearInterval(spinInterval)
        spinIntervals = spinIntervals.filter((int) => int !== spinInterval)

        if (isWinningSpin) {
          randomIndex = winningIndex
        } else if (Math.random() < bowserChance) {
          randomIndex = bowserIndex
        }

        reel.querySelector('img').src = images[randomIndex]
        finalIndices[index] = randomIndex

        reelsSpun++
        if (reelsSpun === 3) {
          checkWin(finalIndices)
        }
      }
    }, 20)

    spinIntervals.push(spinInterval)
  }

  spinReel(reel1, 2000, 0)
  spinReel(reel2, 2500, 1)
  spinReel(reel3, 3000, 2)
}

function checkWin(finalIndices) {
  sounds.spinSound.pause()
  sounds.spinSound.currentTime = 0

  const allBowsers = finalIndices.every((val) => val === 8)

  if (allBowsers) {
    decreaseCoins(30)
    playSoundWithMusicControl(sounds.bowserSound)
    displayMessage('🔥¡MUAJAJA! Pierdes 30 monedas.🔥')
  } else if (finalIndices.every((val) => val === finalIndices[0])) {
    increaseCoins(20)
    playSoundWithMusicControl(sounds.winSound)
    displayMessage('🪙¡Ganas 20 monedas!🪙')
  } else {
    playSoundWithMusicControl(sounds.loseSound)
    displayMessage('😭¡OH NOOOO... Has perdido!😭')
  }

  isSpinning = false
  toggleButton('spinAll', true)
}

export function resetGame() {
  resetCoins()
  displayMessage('')

  document.getElementById('resetButton').style.display = 'none'
  toggleButton('spinAll', true)

  sounds.gameOverSound.pause()
  sounds.gameOverSound.currentTime = 0
}

export function showGameOver() {
  displayMessage('😢 Game Over 😢')
  document.getElementById('resetButton').style.display = 'block'
  toggleButton('resetButton', true)
  toggleButton('spinAll', false)
  playSoundWithMusicControl(sounds.gameOverSound)
}

export function cleanupLogic() {
  stopAllSounds()
  spinIntervals.forEach(clearInterval)
  spinIntervals = []
  isSpinning = false
  reelsSpun = 0
}
