/* eslint-disable unused-imports/no-unused-vars */
import type { Genre, Media, Person, Video } from '~/types'

export const useGenreStore = defineStore('genres', () => {
  const router = useRouter()  
  const config = useRuntimeConfig()
  const auth = useAuthStore()
//   const mediaType: ComputedRef<'movie' | 'tv'> = computed(() => (router.currentRoute.value.params.media as 'movie' | 'tv'))


  const genreList = ref<Genre[]>([])
  const mediaListByGenre = ref<Media[]>([])
  const genreMap = ref<Genre[]>([])

  const fetchGenres = async (_media: string) => {
    try {
      const res = await fetch(`${config.public.baseUrl}genre/${_media}/list?language=en`, auth.options)
      const data = await res.json()
      genreList.value = data.genres
      // console.log('türler,', genreList.value)
    }
    catch (err) { return err }
  }

  const fetchGenresById = async (_mediaType: any, _genreId: number, _page: number) => {
    const res = await fetch(`${config.public.baseUrl}discover/${_mediaType}?with_genres=${_genreId}&page=${_page}`, auth.options)
    const data = await res.json()
    mediaListByGenre.value = data.results
    console.log('yey', mediaListByGenre.value)
  }

  return {
    genreList,
    fetchGenresById,
    mediaListByGenre,
    fetchGenres
  }
})
