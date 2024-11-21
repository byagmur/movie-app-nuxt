export function getImage(url: string, size?: 100 | 200 | 300 | 400 | 500) {
  return `https://image.tmdb.org/t/p/w${size ?? 500}/${url}`
}
