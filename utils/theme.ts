export const isDarkMode = computed(() => useColorMode().value === 'dark')
export function toggleColorMode() {
  const colorMode = useColorMode()
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
