/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import type { Genre, Media, Video } from '~/types'

export const useMovieStore = defineStore('movies', () => {
  const baseUrl = 'https://api.themoviedb.org/3/'
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const popularMovies = ref<Media[]>([])
  const baseUrlImg = 'https://image.tmdb.org/t/p/w500'
  const movieDetails = ref<Media>()
  const isLoading = ref<boolean>(true)
  const searchedMovie = ref<Media>()
  const trailers = ref<Video>()
  const movieGenreList = ref<Genre>()
  const popularTvSeries = ref<Media>()

  async function fetchPopularMovie() {
    try {
      const response = await fetch(`${baseUrl}movie/popular`, authStore.options)
      await response.json().then(data =>
        popularMovies.value = data.results.slice(0, 8),
      )
    }
    catch (err) {
      console.error('veri alinamadi', err)
    }
  }

  const fetchMovieDetails = async (id: number) => {
    try {
      const res = await fetch(`${baseUrl}movie/${id}?language=en-US`, authStore.options)
      const data = await res.json()
      movieDetails.value = data
    //   console.log('detay?', movieDetails)
    }
    catch (error) {
      console.error('Api isteği basarisiz:', error)
    }
  }

  const searchMovie = async () => {
    try {
      const res = await fetch(`${baseUrl}search/movie?include_adult=false&language=en-US&page=1`, authStore.options)
      const data = await res.json()
      searchedMovie.value = data
      console.log(searchedMovie.value)
    }
    catch (err) {
      return err
    }
  }

  const fetchTrailer = async (movie_id: number) => {
    try {
      const res = await fetch(`${baseUrl}movie/{movie_id}/videos`, authStore.options)
      const data = await res.json()
      trailers.value = data
      console.log(trailers.value)
    }
    catch (err) {
      return err
    }
  }

  const fetchMovieGenres = async () => {
    try {
      const res = await fetch(`${baseUrl}genre/movie/list?language=en`, authStore.options)
      const data = await res.json()
      movieGenreList.value = data
      console.log('türler,', movieGenreList.value)
    }
    catch (err) { return err }
  }

  const fetchPopTvSeries = async () => {
    try {
      const res = await fetch(`${baseUrl}tv/popular?language=en-US&page=1`, authStore.options)
      const data = await res.json()
      popularTvSeries.value = data
      console.log('popular series..', popularTvSeries.value)
    }
    catch (err) {
      return err
    }
  }

  return {
    fetchPopularMovie,
    popularMovies,
    fetchMovieDetails,
    baseUrlImg,
    movieDetails,
    isLoading,
    searchMovie,
    fetchTrailer,
    trailers,
  }
})
