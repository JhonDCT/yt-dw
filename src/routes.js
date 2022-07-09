const handler = require('./handler');
const fs = require('fs');

module.exports = (app) => {
  app.get('/generate-path-download', async (req, res) => {
    const { url, format } = req.query;

    if (!url && !format) {
      return res.status(400).json({ err: 'NOT_FOUND_PARAMETERS' });
    }

    const response = await handler.downloadWithProgress({
      url,
      format,
    });

    return res.json(response);
  });

  app.get('/download', async (req, res) => {
    const path = req.query.path;

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + path,
    });
    fs.createReadStream(path).pipe(res);
  });
};
