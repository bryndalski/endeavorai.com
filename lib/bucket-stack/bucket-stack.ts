import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class BucketStack extends Stack {
  bucket: Bucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this._createBucket();
  }

  private _createBucket() {
    this.bucket = new Bucket(this, "MainBucket", {
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
