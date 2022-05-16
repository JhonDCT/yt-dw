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

  /**
   * @summary Create a pipe for details
   * @param {*} data
   * @return {*}
   */
  static details(data) {
    const { embed, title, description, lengthSeconds, thumbnails } = data;

    return {
      flashUrl: embed.flashUrl,
      title,
      description,
      lengthSeconds,
      thumbnails,
    };
  }

  /**
   * @summary Create a pipe for availableFormats
   * @param {*} data
   * @return {*}
   */
  static availableFormats(data) {
    const { url, mimeType, width, height, quality } = data;

    return {
      url,
      mimeType,
      width,
      height,
      quality,
    };
  }
};
