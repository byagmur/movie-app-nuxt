// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
    rules: {
      'no-undef': 'off',
      'no-console': 'off'
    },
    vue: true,
    typescript: true,
  })
  