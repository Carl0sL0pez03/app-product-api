import { v4 as uuidv4 } from 'uuid';
import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { IClientRepository } from 'src/application/clients/ports/clientRepository.ports';
import { DynamoDBAdapter } from '../dynamodb/dynamodb.adapter';
import { CreateClientDto } from 'src/application/clients/dto/create-client.dto';
import { dateFunctionSave } from 'src/function/dateFunction';
import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb';

export class DynamoDBClientRepository implements IClientRepository {
  constructor(private dynamoDBAdapter: DynamoDBAdapter) {}

  async findClientByName(
    name: string,
  ): Promise<Record<string, NativeAttributeValue>[] | null> {
    return await this.dynamoDBAdapter.getItem(name, 'Customers');
  }

  async createClient(client: CreateClientDto): Promise<PutItemCommandOutput> {
    const newClient = {
      _id: uuidv4(),
      nameClient: client?.nameClient,
      createdAt: dateFunctionSave(client?.createdAt)?.toISOString(),
    };

    return await this.dynamoDBAdapter.putItem(newClient, 'Customers');
  }
}
