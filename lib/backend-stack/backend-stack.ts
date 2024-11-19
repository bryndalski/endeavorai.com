import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Cluster, ContainerImage } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { join } from "path";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";

type BackendStackProps = {
  vpc: Vpc;
  bucket: Bucket;
  dynamoDbTable: Table;
} & StackProps;

export class BackendStack extends Stack {
  loadBalancedBe: ApplicationLoadBalancedFargateService;

  constructor(
    scope: Construct,
    id: string,
    { vpc, bucket, dynamoDbTable, ...props }: BackendStackProps
  ) {
    super(scope, id, props);

    const cluster = this._createEcsCluster(vpc);

    this._createEcsService(vpc, cluster, bucket, dynamoDbTable);

    this._createAutoScaling();

    this._grantPermissions(bucket, dynamoDbTable);
  }

  private _createEcsService(
    vpc: Vpc,
    cluster: Cluster,
    bucket: Bucket,
    dynamoDbTable: Table
  ) {
    this.loadBalancedBe = new ApplicationLoadBalancedFargateService(
      this,
      "LoadBalancedBe",
      {
        cluster,

        circuitBreaker: { rollback: true },
        memoryLimitMiB: 1024,
        cpu: 256,
        desiredCount: 1,
        maxHealthyPercent: 200,
        minHealthyPercent: 100,

        taskImageOptions: {
          containerPort: 5000,
          image: this._createTaskImage(),
          environment: this._createEnvironmentVariables(bucket, dynamoDbTable),
        },
        publicLoadBalancer: true,
      }
    );
  }

  private _createTaskImage() {
    return ContainerImage.fromAsset(join(__dirname, "../../src/backend"), {
      platform: Platform.LINUX_ARM64,
    });
  }

  private _createEcsCluster(vpc: Vpc) {
    return new Cluster(this, "MainCluster", {
      vpc,
    });
  }

  private _createAutoScaling() {
    const autoScaleGroup = this.loadBalancedBe.service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 2,
    });

    autoScaleGroup.scaleOnMemoryUtilization("MemoryUtilization", {
      targetUtilizationPercent: 70,
    });

    autoScaleGroup.scaleOnCpuUtilization("CPU-utilization", {
      targetUtilizationPercent: 70,
    });
  }

  private _createEnvironmentVariables(bucket: Bucket, dynamoDbTable: Table) {
    return {
      BUCKET_NAME: bucket.bucketName,
      DYNAMODB_TABLE_NAME: dynamoDbTable.tableName,
      AWS_REGION: process.env.CDK_DEFAULT_REGION!,
    };
  }

  private _grantPermissions(bucket: Bucket, dynamoDbTable: Table) {
    bucket.grantReadWrite(this.loadBalancedBe.taskDefinition.taskRole);
    dynamoDbTable.grantReadWriteData(
      this.loadBalancedBe.taskDefinition.taskRole
    );
  }
}
