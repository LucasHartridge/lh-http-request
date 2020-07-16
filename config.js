require('dotenv',).config({ path: `${__dirname}/.env`, },)

function getLogLevel () {
  return process.env.LOG_LEVEL_REQUESTS
    ? process.env.LOG_LEVEL_REQUESTS
    : process.env.LOG_LEVEL
      ? process.env.LOG_LEVEL : 'error'
}

const config = {
  LOG_LEVEL: getLogLevel(),
}

module.exports = config
