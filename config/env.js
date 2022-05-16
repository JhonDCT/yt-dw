const dotenv = require('dotenv');
dotenv.config();

const env = {
  ftpDir: process.env.FTP_DIR,
  ftp: {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
  },
};

module.exports = env;
