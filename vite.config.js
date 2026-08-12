import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function base64ThumbnailsPlugin() {
  const virtualModuleId = 'virtual:image-thumbnails'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-base64-thumbnails',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const publicDir = path.resolve(__dirname, 'public')
        const projectImagesDir = path.join(publicDir, 'project_image')
        const myImagesDir = path.resolve(__dirname, 'src/assets/my images')
        
        const thumbnails = {}
        
        const processDir = async (dir) => {
          if (!fs.existsSync(dir)) return;
          const files = fs.readdirSync(dir)
          for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
              const filePath = path.join(dir, file)
              try {
                const lowResBuffer = await sharp(filePath)
                  .resize(60) // Tiny blurry placeholder
                  .jpeg({ quality: 40 })
                  .toBuffer()
                const base64Placeholder = `data:image/jpeg;base64,${lowResBuffer.toString('base64')}`
                // Include both just the filename and the relative path just in case
                thumbnails[file] = base64Placeholder
              } catch (err) {
                console.error(`Failed to process thumbnail for ${file}:`, err.message)
              }
            }
          }
        }

        await processDir(projectImagesDir)
        await processDir(myImagesDir)

        return `export default ${JSON.stringify(thumbnails)};`
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    base64ThumbnailsPlugin()
  ],
  base: '/portfolio.github.io/'
})
