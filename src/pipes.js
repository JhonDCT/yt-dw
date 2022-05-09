module.exports = class Pipes {
  static download(data) {
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
