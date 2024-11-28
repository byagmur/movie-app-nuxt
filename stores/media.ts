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
  const searchedMedia = ref<Media[]>([])
  const trailers = ref()
  const genreList = ref([])
  const router = useRouter()
  const mediaType: ComputedRef<'movie' | 'tv'> = computed(() => (router.currentRoute.value.params.media as 'movie' | 'tv'))
  const mediaTypeValue = mediaType.value
  const topMedia = ref<Media[]>([])
  const isSearch = ref(false)

  // const _media = inject('selectedMedia')

  async function fetchPopularMedia(mediaTypeValue: any) {
    try {
      const response = await fetch(`${baseUrl}${mediaTypeValue}/popular?adult=false`, authStore.options)
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

  const searchMedia = async (query: string, mediaTypeValue: any) => {
    if (!query.trim()) {
      searchedMedia.value = []
      isSearch.value = false
    }
    else {
      try {
        const requestUrl = `${baseUrl}search/${mediaTypeValue}?query=${query}&include_adult=false&language=en-US&page=1`
        const res = await fetch(requestUrl, authStore.options)
        const data = await res.json()
        searchedMedia.value = data.results
        console.log(searchedMedia.value)
        console.log('requestUrl', requestUrl)
        isSearch.value = true
      }
      catch (err) {
        return err
      }
    }
  }

  const fetchTrailer = async (mediaTypeValue: any, media_id: number) => {
    try {
      const res = await fetch(`${baseUrl}${mediaTypeValue}/${media_id}/videos`, authStore.options)
      const data = await res.json()
      trailers.value = data
      // console.log(trailers.value)
    }
    catch (err) {
      return err
    }
  }

  const fetchGenres = async (_media: string) => {
    try {
      const res = await fetch(`${baseUrl}genre/${_media}/list?language=en`, authStore.options)
      const data = await res.json()
      genreList.value = data.genres
      // console.log('türler,', genreList.value)
    }
    catch (err) { return err }
  }

  const fetchTopMedia = async (mediaTypeValue: any) => {
    try {
      const res = await fetch(`${baseUrl}${mediaTypeValue}/top_rated?language=en-US&page=1`, authStore.options)
      const data = await res.json()
      topMedia.value = data
      console.log('topmedia',topMedia.value)
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
    searchMedia,
    fetchTrailer,
    trailers,
    mediaType,
    fetchGenres,
    genreList,
    fetchTopMedia,
    topMedia,
    searchedMedia,
    isSearch
  }
})
