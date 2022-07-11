const env = require('../../config/env')
const ftp = require('basic-ftp')
const FTPClient = new ftp.Client()

module.exports = class FTP {
  /**
   * @summary Connect to FTP
   */
  static connect() {
    return FTPClient.access({
      host: env.ftp.host,
      user: env.ftp.user,
      password: env.ftp.password,
    })
  }

  /**
   * @summary Call to function list
   * @param {Function} fn
   */
  static list(path) {
    return FTPClient.list(path)
  }

  /**
   * @summary Call to function download to
   * @param {string} path
   * @param {Function} fn
   */
  static downloadTo(localPath, remotePath) {
    return FTPClient.downloadTo(localPath, remotePath)
  }

  /**
   * @summary Call to function upload from
   * @param {string} path
   * @param {string} destPath
   * @param {Function} fn
   */
  static uploadFrom(localPath, remotePath) {
    return FTPClient.uploadFrom(localPath, remotePath)
  }

  /**
   * @summary Call to function close
   */
  static close() {
    FTPClient.close()
  }
}
