const handler = require('./handler');

module.exports = (app) => {
  app.get('/generate-path-download', async (req, res) => {
    const response = await handler.download({
      url: req.query.url,
      format: req.query.format,
    });

    return res.json(response);
  });

  app.get('/read-dir', async (req, res) => {
    const body = { path: req.query.path };
    const response = await handler.readDir(body);

    return res.json(response);
  });

  app.get('/download', async (req, res) => {
    const path = req.query.path;

    return res.download(path);
  });

  app.get('/get-files', async (req, res) => {
    const response = await handler.getAllFilesAndFolder();

    return res.json(response);
  });

  // app.get('/generate-path-download', async (req, res) => {
  //   const response = await handler.download({
  //     url: req.query.url,
  //     format: req.query.format,
  //   });

  //   return res.json(response);
  // });
};
