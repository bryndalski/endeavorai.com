import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class DynamodbStack extends Stack {
  mainPoTable: Table;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super();

    this._createDynamodb();
  }

  private _createDynamodb() {
    this.mainPoTable = new Table(this, "MainPoTable", {
      tableName: "MainPoTable",
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY, //used for development only
      deletionProtection: false, //used for development only
    });
  }
}
