import { Injectable, InternalServerErrorException } from '@nestjs/common';

import {
  DynamoDBClient,
  GetItemOutput,
  PutItemCommandOutput,
  ScanOutput,
} from '@aws-sdk/client-dynamodb';

import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBAdapter {
  private client: DynamoDBDocumentClient;

  constructor() {
    const dbClient = new DynamoDBClient({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });
    this.client = DynamoDBDocumentClient.from(dbClient);
  }

  async getItem(
    key: { [key: string]: any },
    tableName: string,
  ): Promise<GetItemOutput> {
    try {
      const command = new GetCommand({
        TableName: tableName,
        Key: key,
      });

      const response = await this.client.send(command);
      return response?.Item;
    } catch (error) {
      throw new InternalServerErrorException(
        'Ha ocurrido un error al obtener un elemento de dynamo.',
      );
    }
  }

  async putItem(
    item: { [key: string]: any },
    tableName: string,
  ): Promise<PutItemCommandOutput> {
    try {
      const command = new PutCommand({
        TableName: tableName,
        Item: item,
      });

      const response = await this.client.send(command);
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Ha ocurrido un error al actualizar un elemento de dynamo.',
      );
    }
  }

  async getAllItems(tableName: string): Promise<ScanOutput[]> {
    try {
      const command = new ScanCommand({
        TableName: tableName,
      });

      const response = await this.client.send(command);
      return response?.Items;
    } catch (error) {
      console.log('e', error);

      throw new InternalServerErrorException(
        'Ha ocurrido un error al obtener todos los elementos de dynamo.',
      );
    }
  }
}
