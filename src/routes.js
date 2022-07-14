const handler = require('./download/handler')
const fs = require('fs')

module.exports = (app) => {
  app.get('/generate-path-download', async (req, res) => {
    const { url, format } = req.query

    const response = await handler.downloadWithProgress({
      url,
      format,
    })

    return res.json(response)
  })

  app.get('/download', async (req, res) => {
    const path = req.query.path

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + path,
    })
    fs.createReadStream(path).pipe(res)
  })

  app.get('/get-files', async (req, res) => {
    const path = req.query.path
    const response = await handler.getAllFiles({ path })

    return res.json(response)
  })

  app.get('/upload', async (req, res) => {
    const path = req.query.path

    const response = await handler.uploadFile({ path })

    return res.json(response)
  })

  app.get('/download-ftp', async (req, res) => {
    await handler.downloadFile()

    return res.json({})
  })
}
