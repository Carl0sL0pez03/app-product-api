import { GetItemOutput, PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { CreateClientDto } from '../dto/create-client.dto';

export interface IClientRepository {
  findClientByName(name: string): Promise<GetItemOutput | null>;
  createClient(client: CreateClientDto): Promise<PutItemCommandOutput>;
}
