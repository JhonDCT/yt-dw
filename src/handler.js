const pipes = require('./pipes')
const ytdl = require('ytdl-core')
const fs = require('fs')
const env = require('../config/env')
const FTPClient = require('./ftp')

module.exports = class Handler {
  /**
   * @summary Download
   * @param {string} data
   * @return {*} path
   */
  static async download(data) {
    const { url, format } = data
    const responseInfo = await ytdl.getInfo(url, { quality: 'highestaudio' })
    const info = await pipes.getInfo(responseInfo)
    const nameFile = info.info.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\-]+/g, '-')

    const path = `${env.ftpDir}/${nameFile}.${format}`

    // Descarga en local
    const file = ytdl(url).pipe(fs.createWriteStream(path))

    // Copiar archivo al servidor ftp
    // this.uploadFileToFTP({ path, title: info.info.title, format });

    return pipes.download(file)
  }

  /**
   * @summary Download with progress
   * @param {string} data
   * @return {*} path
   */
  static async downloadWithProgress(data) {
    const { url, format } = data

    if (!url && !format) {
      return { err: 'NOT_FOUND_PARAMETERS' }
    }

    const responseInfo = await ytdl.getInfo(url, { quality: 'highestaudio' })
    const info = await pipes.getInfo(responseInfo)
    const nameFile = info.info.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\-]+/g, '-')
    const path = `${env.ftpDir}/${nameFile}.${format}`
    const file = ytdl(url)

    file.pipe(fs.createWriteStream(path))

    const response = new Promise((resolve, reject) => {
      return file.on('response', (res) => {
        res.on('end', () => {
          console.log('termino')
          resolve(true)
        })
      })
    })

    if (await response) {
      return pipes.download({ path })
    } else {
      return null
    }

    // return pipes.download({ path });
  }

  /**
   * @summary Upload file to FTP server
   * @param {*} data
   */
  static async uploadFile(data) {
    const { path } = data

    if (!path) {
      return { error: 'PATH_NOT_FOUND' }
    }

    await FTPClient.connect()
    await FTPClient.uploadFrom(path, path)

    FTPClient.close()
  }

  static async getAllFiles(data) {
    const { path } = data

    if (!path) {
      return { error: 'PATH_NOT_FOUND' }
    }

    await FTPClient.connect()
    const response = await FTPClient.list(path)
    FTPClient.close()

    return response
  }
}
