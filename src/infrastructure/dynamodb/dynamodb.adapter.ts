import { Injectable, InternalServerErrorException } from '@nestjs/common';

import {
  DynamoDBClient,
  PutItemCommandOutput,
  ScanOutput,
} from '@aws-sdk/client-dynamodb';

import {
  DynamoDBDocumentClient,
  NativeAttributeValue,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
  UpdateCommandOutput,
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

  async getAllItems(tableName: string): Promise<ScanOutput[]> {
    try {
      const command = new ScanCommand({
        TableName: tableName,
      });

      const response = await this.client.send(command);
      return response?.Items;
    } catch (error) {
      throw new InternalServerErrorException(
        'Ha ocurrido un error al obtener todos los elementos de dynamo.',
      );
    }
  }

  async getItem(
    name: string,
    tableName: string,
  ): Promise<Record<string, NativeAttributeValue>[]> {
    try {
      const command = new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: 'nameClient = :nameValue',
        ExpressionAttributeValues: {
          ':nameValue': name,
        },
      });

      const response = await this.client.send(command);
      return response?.Items;
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

  async updateItem(
    key: { [key: string]: any },
    tableName: string,
    updateExpression: string,
    expressionAttributeValues: { [key: string]: any },
    expressionAttributeNames: { [key: string]: any },
  ): Promise<UpdateCommandOutput> {
    try {
      const command = new UpdateCommand({
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'UPDATED_NEW',
      });

      return await this.client.send(command);
    } catch (error) {
      throw new InternalServerErrorException(
        'Ha ocurrido un error al actualizar el elemento en DynamoDB.',
      );
    }
  }
}
