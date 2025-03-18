const STORAGE_KEY = 'ticTacToeStats'

function loadStatistics() {
  const statsStr = localStorage.getItem(STORAGE_KEY)
  if (statsStr) {
    return JSON.parse(statsStr)
  }

  return { winsX: 0, winsO: 0, draws: 0 }
}

function saveStatistics(stats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
}

export function updateStatistics(result) {
  const stats = loadStatistics()
  if (result === '🟡') {
    stats.winsX += 1
  } else if (result === '👻') {
    stats.winsO += 1
  } else if (result === 'draw') {
    stats.draws += 1
  }
  saveStatistics(stats)
  return stats
}

export function getStatistics() {
  return loadStatistics()
}
