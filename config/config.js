if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

module.exports = {
  mysql: {
    host: process.env.mysql_host || 'localhost',
    port: process.env.mysql_port || 3306,
    user: process.env.mysql_user || 'root',
    password: process.env.mysql_password || 'changeme',
  },
  mysqlOptions: {
    compress: process.env.mysql_compress || true,
    encrypt: process.env.mysql_encrypt || false,
    encryptKey: process.env.mysql_encryptKey,
  },
  azure: {
    account: process.env.azure_account         || '' ,
    accountKey: process.env.azure_accountKey   || '',
    containerName: process.env.azure_container || '',
    backupfilePrefix: process.env.azure_backupfileprefix || '', 
  },
}
