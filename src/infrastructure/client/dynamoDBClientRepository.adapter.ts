import { v4 as uuidv4 } from 'uuid';
import { GetItemOutput, PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { IClientRepository } from 'src/application/clients/ports/clientRepository.ports';
import { DynamoDBAdapter } from '../dynamodb/dynamodb.adapter';
import { CreateClientDto } from 'src/application/clients/dto/create-client.dto';
import { dateFunctionSave } from 'src/function/dateFunction';

export class DynamoDBClientRepository implements IClientRepository {
  constructor(private dynamoDBAdapter: DynamoDBAdapter) {}

  async findClientByName(name: string): Promise<GetItemOutput | null> {
    return await this.dynamoDBAdapter.getItem({ ':name': name }, 'Customers');
  }

  async createClient(client: CreateClientDto): Promise<PutItemCommandOutput> {
    const newClient = {
      _id: uuidv4(),
      name: client?.name,
      createdAt: dateFunctionSave(client?.createdAt)?.toISOString(),
    };

    return await this.dynamoDBAdapter.putItem(newClient, 'Customers');
  }
}
