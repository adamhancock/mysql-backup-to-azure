const backupToAzure = require('./backupAzure')
const listDatabases = require('./listMySQLDatabases')
const moment = require('moment')
const backupMySQL = require('./backupMySQL')
const asyncGzip = require('async-gzip-gunzip').asyncGzip
const config = require('./config/config')
const Cryptr = require('cryptr')

;(async function () {
  // Build array of database names.
  const databases = await listDatabases()

  // for each database
  for await (const db of databases) {
    let fileName = `${moment().format('DD-MM-YY')}/${config.azure.backupfilePrefix}${db}_${moment().format(
      'HH-mm'
    )}.sql`
    console.log(`Backing up ${db}...`)
    let content
    // backup database
    content = await backupMySQL(db)
    // check MySQL dump is not empty
    if (content != undefined) {
      content = `${content.dump.schema}\n${content.dump.data}`

      // compress the string
      if (config.mysqlOptions.compress) {
        console.log(`Compressing ${db}...`)
        content = await asyncGzip(content)
        fileName = fileName.concat('.gz')
      }

      if (config.mysqlOptions.encrypt) {
        const cryptr = new Cryptr(config.mysqlOptions.encryptKey)
        console.log(`Encrypting ${db}...`)
        content = await cryptr.encrypt(content)
        fileName = fileName.concat('.enc')
      }
      // Backup to azure
      await backupToAzure(fileName, content)
    }
  }
})()
