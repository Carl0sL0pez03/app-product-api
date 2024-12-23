import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { EnsureClientInteractor } from '../interactor/ensureClient.interactor';
import { DynamoDBClientRepository } from 'src/infrastructure/client/dynamoDBClientRepository.adapter';
import { DynamoDBAdapter } from 'src/infrastructure/dynamodb/dynamodb.adapter';

@Injectable()
export class CreateClientInterceptor implements NestInterceptor {
  constructor(private readonly dynamoDbAdapter: DynamoDBAdapter) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const clientRepository = new DynamoDBClientRepository(this.dynamoDbAdapter);

    const request = context.switchToHttp().getRequest();
    const clientName: string = request?.body?.creatorName;

    return await new EnsureClientInteractor(clientRepository)
      .execute({ nameClient: clientName })
      .then(() => {
        return next.handle();
      });
  }
}
