#!/usr/bin/env bash

// The stage you deploy the service to
export STAGE=mylocal

// The AWS region you deploy the service to
export REGION=us-west-2

// The service version
export SERVICE_VERSION=0.0.1

// The AWS profile that grants permission to deploy the service 
export mylocal_SNS_EMAIL=my.email@fakemail.com

// The AWS account ID you deploy the service to
export mylocal_AWS_ACCOUNT_ID=012498357781

// The AWS KMS ARN to encrypt/decrypt your local environment secrets
export mylocal_AWS_KMS_KEY_ARN=arn:aws:kms:us-west-2:xxxxxxxxxxxx:key/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

// The AWS profile that grants permission to deploy the service 
export AWS_PROFILE=my-aws-profile