export const createResultDisplay = () => {
  let resultContainer = document.getElementById('game-result')

  if (!resultContainer) {
    resultContainer = document.createElement('div')
    resultContainer.id = 'game-result'

    const appDiv = document.getElementById('app')
    if (appDiv) {
      appDiv.appendChild(resultContainer)
    }
  }

  resultContainer.textContent = ''
  return resultContainer
}

export const updateResultDisplay = (message) => {
  let resultContainer = document.getElementById('game-result')

  if (!resultContainer) {
    resultContainer = createResultDisplay()
  }

  resultContainer.textContent = message
}

export const clearResultDisplay = () => {
  const resultContainer = document.getElementById('game-result')
  if (resultContainer) {
    resultContainer.textContent = ''
  }
}
