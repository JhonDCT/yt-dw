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

  /**
   * @summary Create a pipe for get info
   * @param {*} data
   * @return {*}
   */
  static getInfo(data) {
    const { videoDetails, formats } = data;

    const info = this.details(videoDetails);
    const availableFormats = formats
      .filter((item) => item.hasAudio)
      .map((item) => this.availableFormats(item));

    return {
      info,
      availableFormats,
    };
  }
};
