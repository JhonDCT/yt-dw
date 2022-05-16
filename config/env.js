const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const env = {
  ftpDir: path.join(__dirname, process.env.FTP_DIR),
  ftp: {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
  },
};

module.exports = env;
