#!/bin/bash

kubectl get cronjob mysql-backup-to-azure
kubectl get jobs

JOB_NAME=`kubectl get jobs --template ' {{range .items}}{{.metadata.name}}{{"\n"}}{{end}}' | awk '{print $1}' | tail -n 1`
pods=$(kubectl get pods --selector=job-name=$JOB_NAME --output=jsonpath={.items[*].metadata.name})

echo $pods
kubectl logs $pods
