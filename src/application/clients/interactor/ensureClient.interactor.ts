import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { CreateClientDto } from '../dto/create-client.dto';
import { IClientRepository } from '../ports/clientRepository.ports';

export class EnsureClientInteractor {
  constructor(private clientRepository: IClientRepository) {}

  async execute(
    clientDto: CreateClientDto,
  ): Promise<PutItemCommandOutput | undefined> {
    const existingClient = await this.clientRepository.findClientByName(
      clientDto?.name,
    );

    if (existingClient) return;

    return await this.clientRepository.createClient(clientDto);
  }
}
