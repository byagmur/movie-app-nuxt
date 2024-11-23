import { inject } from 'vue'
/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import type { Genre, Media, Video } from '~/types'

export const useMediaStore = defineStore('movies', () => {
  const baseUrl = 'https://api.themoviedb.org/3/'
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const mediaList = ref<Media[]>([])
  const baseUrlImg = 'https://image.tmdb.org/t/p/w500'
  const mediaDetails = ref<Media>()
  const isLoading = ref<boolean>(true)
  const searchedMedia = ref<Media>()
  const trailers = ref<Video>()
  const genreList = ref<Genre>()
  const router = useRouter()
  const mediaType: ComputedRef<'movie' | 'tv'> = computed(() => (router.currentRoute.value.params.media as 'movie' | 'tv'))
  const mediaTypeValue = mediaType.value

  // const _media = inject('selectedMedia')

  async function fetchPopularMedia(mediaTypeValue: any) {
    try {
      const response = await fetch(`${baseUrl}${mediaTypeValue}/popular`, authStore.options)
      await response.json().then(data =>
        mediaList.value = data.results.slice(0, 20),
      )
    }
    catch (err) {
      console.error('veri alinamadi', err)
    }
  }

  // watch(() => selected, (nw, ow) => {
  //   if(nw !== ow){
  //     fetchMovieDetails(selected)
  //   }
  // })

  const fetchMediaDetails = async (mediaTypeValue: any, id: number) => {
    try {
      const res = await fetch(`${baseUrl}${mediaTypeValue}/${id}?language=en-US`, authStore.options)
      //  (`https://api.themoviedb.org/3/tv/11652`)
      const data = await res.json()
      mediaDetails.value = data
    }
    catch (error) {
      console.error('Api isteği basarisiz:', error)
    }
  }

  const searchMovie = async () => {
    try {
      const res = await fetch(`${baseUrl}search/movie?include_adult=false&language=en-US&page=1`, authStore.options)
      const data = await res.json()
      searchedMedia.value = data
      console.log(searchedMedia.value)
    }
    catch (err) {
      return err
    }
  }

  const fetchTrailer = async (movie_id: number) => {
    try {
      const res = await fetch(`${baseUrl}movie/${movie_id}/videos`, authStore.options)
      const data = await res.json()
      trailers.value = data
      console.log(trailers.value)
    }
    catch (err) {
      return err
    }
  }

  const fetchGenres = async (mediaTypeValue: any) => {
    try {
      const res = await fetch(`${baseUrl}genre/${mediaTypeValue}/list?language=en`, authStore.options)
      const data = await res.json()
      genreList.value = data
      console.log('türler,', genreList.value)
    }
    catch (err) { return err }
  }

  return {
    fetchPopularMedia,
    mediaList,
    fetchMediaDetails,
    baseUrlImg,
    mediaDetails,
    isLoading,
    searchMovie,
    fetchTrailer,
    trailers,
    mediaType,
    fetchGenres,
    genreList,
  }
})
