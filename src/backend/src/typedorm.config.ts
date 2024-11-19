import { INDEX_TYPE, Table } from "@typedorm/common";

export const dynamoDbPoTable = new Table({
  name: "PoTable",
  partitionKey: "PK",
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: "GSI1PK",
      sortKey: "GSI1SK",
    },
    GSI2: {
      type: INDEX_TYPE.GSI,
      partitionKey: "GSI2PK",
      sortKey: "GSI2SK",
    },
  },
});
