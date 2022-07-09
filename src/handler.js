const pipes = require('./pipes');
const ytdl = require('ytdl-core');
const fs = require('fs');
const env = require('../config/env');

module.exports = class Handler {
  /**
   * @summary Download with progress
   * @param {string} data
   * @return {*} path
   */
  static async downloadWithProgress(data) {
    const { url, format } = data;
    const responseInfo = await ytdl.getInfo(url, { quality: 'highestaudio' });
    const info = await pipes.getInfo(responseInfo);
    const nameFile = info.info.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\-]+/g, '-');
    const path = `${env.ftpDir}/${nameFile}.${format}`;
    const file = ytdl(url);

    file.pipe(fs.createWriteStream(path));

    const response = new Promise((resolve, reject) => {
      return file.on('response', (res) => {
        res.on('end', () => {
          resolve(true);
        });
      });
    });

    if (await response) {
      return pipes.download({ path });
    } else {
      return null;
    }
  }
};
