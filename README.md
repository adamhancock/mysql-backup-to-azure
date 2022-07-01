This is a Fork of https://github.com/adamhancock/mysql-backup-to-azure to provide some more configuration options in the script.
- Added mysql_port configuration
- Added default Docker values for environment variables
- Added docker-compose file for ease of building and running
- Added build script

Docker container to backup MySQL databases direct to Azure Blob Storage.

Blog: https://blog.adamhancock.co.uk/backing-up-mysql-to-azure/

# Build & run

Use ```docker-compose build``` to build the image locally and ```docker-compose up``` to run it. modify the ```docker-compose.yml``` file with your parameters.
Note, you can override ```network_mode``` if you want to connect to other containers, just remove this and change the mysql_host with the docker container hostname.

# docker-compose.yaml
```
version: '3.2'

services:
  mysql-to-azure-backup:
    build:
      dockerfile: Dockerfile
      context: .
    network_mode: host
    environment:
      - mysql_host=localhost
      - mysql_port=3306
      - mysql_user=root
      - mysql_password=changeme
      - azure_account=
      - azure_accountKey=
      - azure_container=existing_backup_container
```


# Run with docker using pre-build image

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

The destination container needs to be created via Azure Storage Explorer manually.

Backups will be stored in a folder named with the date. Backups are created with the time appended to the database name, for example 05-08-20/database_11-33.sql

The backup file format will be the database schema followed by the data.

Recommended to use Azure Lifecycles on blob to manage the retention of your backups: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-lifecycle-management-concepts?tabs=azure-portal
