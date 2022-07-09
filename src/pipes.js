module.exports = class Pipes {
  /**
   * @summary Create a pipe for download
   * @param {*} data
   * @return {*}
   */
  static download(data) {
    const { path } = data;

    return {
      path,
    };
  }
};
