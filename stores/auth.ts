export const useAuthStore = defineStore('auth', () => {
    const config = useRuntimeConfig()
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.public.NUXT_TMDB_TOKEN}`,
  
      },
    }
  
    const fetchAuth = async () => {
      fetch('https://api.themoviedb.org/3/authentication', options)
        .then(res => res.json())
        .catch(err => console.error(err))
    }
  
    return {
      fetchAuth,
      options,
    }
  })
  