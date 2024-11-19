import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromContainerMetadata } from "@aws-sdk/credential-providers";
import type { ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloDriver } from "@nestjs/apollo";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeDormModule } from "@nest-dynamodb/typedorm";
import { DocumentClientV3 } from "@typedorm/document-client";
import { join } from "path";
import { DynamicModule } from "@nestjs/common";
import { dynamoDbPoTable } from "./typedorm.config";

export const libraryProvider: DynamicModule[] = [
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      autoSchemaFile: join(__dirname, "schema.gql"),
      playground: configService.get("ENABLED_PLAYGROUND"),
      introspection: configService.get("ENABLED_PLAYGROUND"),
      sortSchema: true,
      uploads: false,
      driver: ApolloDriver,

      subscriptions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "graphql-ws": {
          path: "/subscriptions",
          onConnect: (context) => {
            if (context && context.connectionParams) {
              const { authorization, Authorization } = context.connectionParams;
              const headers = {
                authorization: authorization || Authorization,
              };
              return { req: { headers } };
            } else {
              return { req: {} }; // Provide default headers or handle the absence of connectionParams
            }
          },
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "subscriptions-transport-ws": {
          path: "/subscriptions",
          onConnect: (connectionParams) => {
            if (connectionParams) {
              const { authorization, Authorization } = connectionParams;
              const headers = {
                authorization: authorization || Authorization,
              };
              return { req: { headers } };
            }
          },
        },
      },

      context: (request) => {
        return request.subscriptions
          ? {
              req: {
                headers: {
                  ...(request.connectionParams || {}),
                },
              },
            }
          : { req: request.req };
      },
    }),

    inject: [ConfigService],
  }),
  TypeDormModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      table: dynamoDbPoTable,
      entities: [],
      documentClient: new DocumentClientV3(
        new DynamoDBClient({
          credentials: fromContainerMetadata(),
          region: "eu-west-1",
        })
      ),
    }),
  }),
];
