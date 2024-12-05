export function getImage(url: string, size?: 100 | 200 | 500 | 780 | 1280) {
  return `https://image.tmdb.org/t/p/w${size ?? 500}/${url}`
}
