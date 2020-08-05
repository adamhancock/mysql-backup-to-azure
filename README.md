Docker container to run as a job and backup MySQL databases to Azure Blob Storage.

# Environment Variables

- mysql_host=
- mysql_user=root
- mysql_password=
- azure_account=<myaccount>
- azure_accountKey=
- azure_container=backup

Container needs to be created via Azure Storage Explorer manually.

Backups will be stored in a folder named with the date. Backups are created with the time appended to the database name, for example 05-08-20/database_11-33.sql
