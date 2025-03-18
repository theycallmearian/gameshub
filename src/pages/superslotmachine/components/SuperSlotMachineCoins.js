let coins = 40

export function loadCoins() {
  if (localStorage.getItem('coins')) {
    coins = parseInt(localStorage.getItem('coins'))
  } else {
    localStorage.setItem('coins', coins)
  }
}

export function getCoins() {
  return coins
}

export function updateCoinsDisplay() {
  const coinsDisplay = document.getElementById('coinsDisplay')
  if (coinsDisplay) {
    coinsDisplay.innerText = `${coins}`
  }
}

export function decreaseCoins(amount) {
  coins -= amount
  updateCoinsDisplay()
  localStorage.setItem('coins', coins)
}

export function increaseCoins(amount) {
  coins += amount
  updateCoinsDisplay()
  localStorage.setItem('coins', coins)
}

export function resetCoins() {
  coins = 40
  updateCoinsDisplay()
  localStorage.setItem('coins', coins)
}
