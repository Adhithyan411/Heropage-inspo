import { defineConfig } from 'shaders/config'

export default defineConfig({
  // Components are imported from 'shaders/react'
  framework: 'react',
  // Shaders project this codebase is connected to
  project: '15fb9b95-a18d-458f-a350-d67964683471',
  // Where `npx shaders install` writes component files
  outDir: 'components/shaders',
})
