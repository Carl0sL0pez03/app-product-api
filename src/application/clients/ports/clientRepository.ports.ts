import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { CreateClientDto } from '../dto/create-client.dto';
import { NativeAttributeValue } from '@aws-sdk/lib-dynamodb';

export interface IClientRepository {
  findClientByName(
    name: string,
  ): Promise<Record<string, NativeAttributeValue>[] | null>;
  createClient(client: CreateClientDto): Promise<PutItemCommandOutput>;
}
