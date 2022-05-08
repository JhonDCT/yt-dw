const pipes = require("./pipes");
const ytdl = require("ytdl-core");

module.exports = class Handler {
  static async download(data) {
    const { url } = data;
    const info = await ytdl.getInfo(url);

    const response = pipes.download(info);

    return response;
  }
};
