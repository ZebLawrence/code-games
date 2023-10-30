import fs from 'fs'
import path from 'path'
import config from './playground.config.json' assert { type: "json" };

const CURR_DIR = process.cwd()
/**
 * Recurses directories to find the files that match the reg ex filter
 * @param {string} startPath 
 * @param {RegExp} filter 
 * @param {func} callback 
 * @returns 
 */
const recurseDir = (startPath, filter, callback) => {
  console.log('recurseDir for', [startPath, filter, callback])
  if (!fs.existsSync(startPath)) {
      console.log('no dir ', startPath)
      return
  }

  const files = fs.readdirSync(startPath)
  for (let file of files) {
    const filename = path.join(startPath, file)
    const stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      recurseDir(filename, filter, callback)
    } else if (filter.test(filename)) {
      callback(filename)
    }
  }
};

console.log('the config to parse', config)
const { files } = config

Object.entries(files).forEach(([fileName, fileProps]) => {
  console.table({fileName, fileProps})
  const regEx = new RegExp(fileName)
  recurseDir('./src', regEx, resultFile => {
    console.log('found file', resultFile)
    const fileContent = fs.readFileSync(resultFile, { encoding: 'utf-8' })
    console.log('file content', fileContent)
    if (fileContent) {
      fileProps.content = fileContent
    }
  })
});

console.log('The updated config', config)
fs.writeFileSync(`public/playground.config.json`, JSON.stringify(config))
