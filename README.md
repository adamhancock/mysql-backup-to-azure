Docker container to backup MySQL databases direct to Azure Blob Storage.

Blog: https://blog.adamhancock.co.uk/backing-up-mysql-to-azure/

# Run with docker

Run the below command as a cronjob with your desired backup interval. Update the environment variables to your server details.

`docker run -it --rm -e mysql_host=mysql -e mysql_user=root -e mysql_password=changeme -e azure_account=testblob -e azure_accountKey=changeme -e azure_container=backup adamhancock/mysql-backup-to-azure`

# To deploy on Kubernetes

- Copy YAML: https://github.com/adamhancock/mysql-backup-to-azure/tree/master/k8s
- Replace values in secrets.yaml.example with your MySQL and Azure Blob storage details.
- `kubectl apply -f cronjob.yml -f secrets.yml`

# Environment Variables

- mysql_host=
- mysql_user=root
- mysql_password=
- azure_account=<myaccount>
- azure_accountKey=
- azure_container=backup

Container needs to be created via Azure Storage Explorer manually.

Backups will be stored in a folder named with the date. Backups are created with the time appended to the database name, for example 05-08-20/database_11-33.sql

Recommended to use Azure Lifecycles on blob to manage the retention of your backups: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-lifecycle-management-concepts?tabs=azure-portal
