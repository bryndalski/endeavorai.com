import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromContainerMetadata } from "@aws-sdk/credential-providers";
import type { ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloDriver } from "@nestjs/apollo";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeDormModule } from "@nest-dynamodb/typedorm";
import { DocumentClientV3 } from "@typedorm/document-client";
import { join } from "path";
import { dynamoDbPoTable } from "./typedorm.config";
import { PaymentOrderEntity } from "./payment-order/entity/payment-order.entity";

export const libraryProvider = [
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      autoSchemaFile: join(__dirname, "schema.gql"),
      playground: true,
      introspection: true,
      sortSchema: true,
      uploads: false,
      driver: ApolloDriver,
    }),

    inject: [ConfigService],
  }),
  TypeDormModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      table: dynamoDbPoTable,
      entities: [PaymentOrderEntity],
      documentClient: new DocumentClientV3(
        new DynamoDBClient({
          credentials: fromContainerMetadata(),
          region: "eu-central-1",
        })
      ),
    }),
  }),
];
