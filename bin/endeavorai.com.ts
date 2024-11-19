#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";

import { VpcStack } from "../lib/vpc-stack/vpc-stack";
import { BucketStack } from "../lib/bucket-stack/bucket-stack";
import { DynamodbStack } from "../lib/dynamodb-stack/dynamodb-stack";
import { BackendStack } from "../lib/backend-stack/backend-stack";

const app = new cdk.App();

const { vpc } = new VpcStack(app, "VpcStack", {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

const { bucket } = new BucketStack(app, "BucketStack", {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

const { mainPoTable } = new DynamodbStack(app, "DynamodbStack", {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT,
  },
});

new BackendStack(app, "BackendStack", {
  vpc,
  bucket,
  dynamoDbTable: mainPoTable,
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
