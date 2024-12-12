import type {  Media, Person, Video } from '~/types'

export const useMediaStore = defineStore('movies', () => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const authStore = useAuthStore()
  const mediaList = ref<Media[]>([])
  const mediaDetails = ref<Media>()
  const isLoading = ref<boolean>(true)
  const searchedMedia = ref<Media[]>([])
  const trailers = ref<Video[]>([])
  const mediaType: ComputedRef<'movie' | 'tv'> = computed(() => (router.currentRoute.value.params.media as 'movie' | 'tv'))
  const topMedia = ref<Media[]>([])
  const isSearch = ref(false)
  const peopleList = ref<Person[]>([])
  const searchPage = ref(1)
  const totalPages = ref()

  async function fetchPopularMedia(_mediaType: any) {
    try {
      const response = await fetch(`${config.public.baseUrl}${_mediaType}/popular?adult=false`, authStore.options)
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

  const fetchMediaDetails = async (_mediaType: any, id: number) => {
    try {
      const res = await fetch(`${config.public.baseUrl}${_mediaType}/${id}?language=en-US`, authStore.options)
      //  (`https://api.themoviedb.org/3/tv/11652`)
      const data = await res.json()
      mediaDetails.value = data
    }
    catch (error) {
      console.error('Api istegi basarisiz', error)
    }
  }

  const searchMedia = async (query: string, _mediaType: any) => {
    if (!query) {
      searchedMedia.value = []
      isSearch.value = false
    }
    else if (query.length > 1) {
      try {
        const requestUrl = `${config.public.baseUrl}search/${_mediaType}?query=${query}&include_adult=false&language=en-US&page=${searchPage.value}`
        const res = await fetch(requestUrl, authStore.options)
        const data = await res.json()
        searchedMedia.value = data.results
        // console.log(searchedMedia.value)
        // console.log('requestUrl', requestUrl)
        isSearch.value = true
        totalPages.value = data.total_pages
        console.log('totalpages',totalPages.value)
      }
      catch (err) {
        return err
      }
    }
  }

  const fetchTrailer = async (_mediaType: any, media_id: number) => {
    try {
      const res = await fetch(`${config.public.baseUrl}${_mediaType}/${media_id}/videos`, authStore.options)
      const data = await res.json()
      trailers.value = data.results.slice(0, 5)
      console.log('trailers', trailers.value)
    }
    catch (err) {
      return err
    }
  }

  const fetchTopMedia = async (_mediaType: any) => {
    try {
      const res = await fetch(`${config.public.baseUrl}${_mediaType}/top_rated?language=en-US&page=1`, authStore.options)
      const data = await res.json()
      topMedia.value = data.results
      // console.log('topmedia', topMedia.value)
    }
    catch (err) { return err }
  }

  const fetchPeopleList = async () => {
    const res = await fetch(`${config.public.baseUrl}/person/popular?language=en-US&page=1`, authStore.options)
    const data = await res.json()
    peopleList.value = data.results
    // console.log('people--', peopleList.value)
  }

  return {
    fetchPopularMedia,
    mediaList,
    fetchMediaDetails,
    mediaDetails,
    isLoading,
    searchMedia,
    fetchTrailer,
    trailers,
    mediaType,
    fetchTopMedia,
    topMedia,
    searchedMedia,
    isSearch,
    peopleList,
    fetchPeopleList,
    searchPage,
    totalPages,
  }
})
