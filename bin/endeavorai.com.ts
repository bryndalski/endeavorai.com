#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { VpcStack } from "../lib/vpc-stack/vpc-stack";

const app = new cdk.App();

const { vpc } = new VpcStack(app, "VpcStack", {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
