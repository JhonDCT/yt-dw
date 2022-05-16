const pipes = require('./pipes');
const ytdl = require('ytdl-core');
const fs = require('fs');
const env = require('../config/env');
const FTPClient = require('./ftp');

module.exports = class Handler {
  /**
   * @summary Download
   * @param {string} data
   * @return {*} path
   */
  static async download(data) {
    const { url, format } = data;
    const responseInfo = await ytdl.getInfo(url, { quality: 'highestaudio' });
    const info = await pipes.getInfo(responseInfo);
    const nameFile = info.info.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\-]+/g, '-');

    const path = `${env.ftpDir}/${nameFile}.${format}`;

    // Descarga en local
    const file = ytdl(url).pipe(fs.createWriteStream(path));

    // Copiar archivo al servidor ftp
    // this.uploadFileToFTP({ path, title: info.info.title, format });

    return pipes.download(file);
  }

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
          console.log('termino');
          resolve(true);
        });
      });
    });

    console.log(response);

    if (response) {
      return pipes.download({ path });
    }

    // return pipes.download({ path });
  }

  /**
   * @summary Upload file to FTP server
   * @param {*} data
   */
  static async uploadFileToFTP(data) {
    const { path, title, format } = data;
    const destName = `${title}.${format}`;

    FTPClient.put(path, destName, (err) => {
      if (err) throw err;
      FTPClient.end();
    });
  }

  // TODO: Decidir que método, funciona mejor v1
  /**
   * @summary Get all files from directory
   * @param {*} data
   * @return {*} response
   */
  static async getFilesFromDir(data) {
    let { path } = data;

    if (!path) {
      return {
        message: 'FOLDER_EXISTS_NOT_FOUND',
      };
    }

    if (path) {
      path = `${env.ftpDir}/${path}`;
    }

    const files = this.getFiles(path, []);

    return files;
  }

  // TODO: Decidir que método, funciona mejor v2
  /**
   * @summary Read a directory
   * @param {*} data
   * @return {*} response
   */
  static async readDir(data) {
    let { path } = data;

    if (!path) {
      return {
        message: 'FOLDER_EXISTS_NOT_FOUND',
      };
    }

    if (path) {
      path = `${env.ftpDir}/${path}`;
    }

    const files = fs.readdirSync(path).map((file) => {
      if (fs.statSync(`${path}/${file}`).isDirectory()) {
        return { directory: true, path: `${path}/${file}` };
      } else {
        return { file: true, path: `${path}/${file}` };
      }
    });

    return files;
  }

  /**
   * @summary Delete a local file
   * @param {*} data
   */
  static deleteLocalFile(data) {
    const { path } = data;

    fs.unlinkSync(path);
  }

  /**
   * @summary Get all files from any directory and subdirectory
   * @param {*} dir
   * @param {*} files_
   * @return {*} response
   */
  static getFiles(dir, files_) {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const name = `${dir}/${file}`;
      if (fs.statSync(name).isDirectory()) {
        this.getFiles(name, files_);
      } else {
        files_.push(name);
      }
    });

    return files_;
  }

  /** ========================== DEPRECATED ======================== */

  /**
   * @summary Get list from initial directory
   * @return {*}
   * @deprecated
   */
  static async getAllFilesAndFolder() {
    return new Promise((resolve, reject) => {
      return FTPClient.list((err, files) => {
        if (err) reject(err);
        return resolve(files);
      });
    });
  }
};
