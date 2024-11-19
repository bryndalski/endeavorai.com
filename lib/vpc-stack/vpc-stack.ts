import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Vpc } from "aws-cdk-lib/aws-ec2";

export class VpcStack extends Stack {
  vpc: Vpc;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this._createMainVpc();
  }

  private _createMainVpc() {
    this.vpc = new Vpc(this, "MainVpc", {
      enableDnsHostnames: true,
      enableDnsSupport: true,
      maxAzs: 3,
      natGateways: 1,
    });
  }
}
