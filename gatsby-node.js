const fs = require("fs").promises
const glob = require("glob")
const path = require("path")

exports.onPostBuild = async () => {
  const publicPath = path.join(__dirname, "public")
  const hash = Date.now()
  const jsonFiles = glob.sync(`${publicPath}/page-data/**/page-data.json`)

  console.log("[onPostBuild] Renaming the following files:")

  for (let file of jsonFiles) {
    console.log(file)
    const newFilename = file.replace(`page-data.json`, `page-data.${hash}.json`)

    await fs.rename(file, newFilename)
  }

  const appShaFiles = glob.sync(`${publicPath}/**/app-*.js`)
  const [appShaFile] = appShaFiles
  const [appShaFilename] = appShaFile.split("/").slice(-1)
  const appShaFilenameReg = new RegExp(appShaFilename, "g")
  const newAppShaFilename = `app-${hash}.js`
  const newFilePath = appShaFile.replace(appShaFilename, newAppShaFilename)

  console.log(
    `[onPostBuild] Renaming: ${appShaFilename} to ${newAppShaFilename}`
  )

  await fs.rename(appShaFile, newFilePath)
  await fs.rename(`${appShaFile}.map`, `${newFilePath}.map`)

  const htmlJSAndJSONFiles = [
    `${newFilePath}.map`,
    ...glob.sync(`${publicPath}/**/*.{html,js,json}`),
  ]

  console.log(
    `[onPostBuild] Replacing page-data.json, ${appShaFilename}, and ${appShaFilename}.map references in the following files:`
  )

  for (let file of htmlJSAndJSONFiles) {
    const stats = await fs.stat(file, "utf8")

    if (!stats.isFile()) {
      continue
    }

    const content = await fs.readFile(file, "utf8")
    const result = content
      .replace(appShaFilenameReg, newAppShaFilename)
      .replace(/page-data.json/g, `page-data.${hash}.json`)

    if (result !== content) {
      console.log(file)
      await fs.writeFile(file, result, "utf8")
    }
  }
}
