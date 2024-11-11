import fs from 'fs'
import path from 'path'

const readFiles = async () => {
  const pagesDir = './src/pages'
  const files = await fs.promises.readdir(pagesDir, { recursive: true })
  
  const playgroundConfig = { files: {} };
  await Promise.all(files.map(async file => {
    if (!file.endsWith('.js')) return Promise.resolve()
    const fileContent = await fs.promises.readFile(path.join(pagesDir, file), { encoding: 'utf-8' })

    const fileName = path.basename(file)
    playgroundConfig.files[fileName] = { content: fileContent }
  }))
  fs.writeFileSync(`public/playground.config.json`, JSON.stringify(playgroundConfig))
}

readFiles()