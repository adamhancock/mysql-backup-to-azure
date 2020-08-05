const backupToAzure = require('./backupAzure')
const listDatabases = require('./listMySQLDatabases')
const moment = require('moment')
const backupMySQL = require('./backupMySQL')
;(async function () {
  const databases = await listDatabases()
  for await (const db of databases) {
    const fileName = `${moment().format('DD-MM-YY')}/${db}_${moment().format(
      'HH-mm'
    )}.sql`
    console.log(`Backing up ${db}`)
    const content = await backupMySQL(db)

    if (content != undefined) {
      await backupToAzure(fileName, content.dump.data)
    }
  }
})()
