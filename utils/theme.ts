export const isDarkMode = computed(() => useColorMode().value === 'light')
export const toggleColorMode = () => {
  const colorMode = useColorMode()
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
