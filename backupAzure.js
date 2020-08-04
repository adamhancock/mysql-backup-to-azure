const {
  BlobServiceClient,
  StorageSharedKeyCredential
} = require('@azure/storage-blob')
module.exports = async function (blobName, content) {
  // Enter your storage account name and shared key
  const { account, accountKey, containerName } = require('./config.json').azure

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(
    account,
    accountKey
  )
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  )

  const containerClient = blobServiceClient.getContainerClient(containerName)

  // const blobName = `${name}-${new Date().getTime()}`
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)
  const uploadBlobResponse = await blockBlobClient.upload(
    content,
    content.length
  )
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  )
}
