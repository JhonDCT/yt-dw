const env = require('../../config/env');
const FTPClient = require('ftp');
const ftpClient = new FTPClient();

module.exports = class FTP {
  /**
   * @summary Connect to FTP
   */
  static connect() {
    ftpClient.connect({
      host: env.ftp.host,
      user: env.ftp.user,
      password: env.ftp.password,
    });
  }

  /**
   * @summary Call to function ready
   * @param {Function} fn
   */
  static ready(fn) {
    this.connect();

    ftpClient.on('ready', fn);
  }

  /**
   * @summary Call to function list
   * @param {Function} fn
   */
  static list(fn) {
    this.ready(() => {
      ftpClient.list(fn);
    });
  }

  /**
   * @summary Call to function get
   * @param {string} path
   * @param {Function} fn
   */
  static get(path, fn) {
    this.ready(() => {
      ftpClient.get(path, fn);
    });
  }

  /**
   * @summary Call to function put
   * @param {string} path
   * @param {string} destPath
   * @param {Function} fn
   */
  static put(path, destPath, fn) {
    this.ready(() => {
      ftpClient.put(path, destPath, fn);
    });
  }

  /**
   * @summary Call to function pwd
   * @param {Function} fn
   */
  static pwd(fn) {
    this.ready(() => {
      ftpClient.pwd(fn);
    });
  }

  /**
   * @summary Call to function logout
   */
  static disconnect() {
    ftpClient.logout();
  }

  /**
   * @summary Call to function end
   */
  static end() {
    ftpClient.end();
  }
};
