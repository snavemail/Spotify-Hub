type HashParams = {
  [type: string]: string
}

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
export function getHashParams() {
  const hashParams: HashParams = {}
  let e
  const r = /([^&;=]+)=?([^&;]*)/g
  const q = window.location.hash.substring(1)
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2])
  }
  return hashParams
}

// Turns milliseconds into minutes and seconds
export function millisToMinutesSeconds(millis: number): {
  minutes: number
  seconds: number
} {
  const minutes = Math.floor(millis / 60000)
  const seconds = parseInt(((millis % 60000) / 1000).toFixed(0))
  return { minutes: minutes, seconds: seconds }
}

export function formatMillis(millis: number): string {
  const time = millisToMinutesSeconds(millis)
  const minutes = time.minutes
  const seconds = time.seconds
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export function formatMillisHuman(millis: number): string {
  const time = millisToMinutesSeconds(millis)
  const minutes = time.minutes
  const seconds = time.seconds
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// Higher-order function for async/await error handling
export const catchErrors = <T extends (...args: any[]) => Promise<any>>(fn: T) =>
  async function (...args: Parameters<T>): Promise<void> {
    try {
      await fn(...args)
    } catch (err) {}
  }
