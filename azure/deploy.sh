#!/usr/bin/env bash
set -euo pipefail

RESOURCE_GROUP=${RESOURCE_GROUP:-microfinance-rg}
LOCATION=${LOCATION:-eastus}
ACR_NAME=${ACR_NAME:-microfinanceacr}
CONTAINERAPPS_ENV=${CONTAINERAPPS_ENV:-microfinance-env}

az group create --name "$RESOURCE_GROUP" --location "$LOCATION"

az acr create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$ACR_NAME" \
  --sku Basic

az provider register --namespace Microsoft.App
az provider register --namespace Microsoft.DBforPostgreSQL

az containerapp env create \
  --name "$CONTAINERAPPS_ENV" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION"

echo "Deploy images after building Dockerfiles."
echo "Then run az containerapp up or update using the generated YAML."
