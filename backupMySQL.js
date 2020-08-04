const mysqldump = require('mysqldump')
module.exports = async function (database) {
  try {
    return await mysqldump({
      connection: {
        database: database,
        ...require('./config/config.json').mysql
      }
    })
  } catch (e) {
    console.log(e)
  }
}
