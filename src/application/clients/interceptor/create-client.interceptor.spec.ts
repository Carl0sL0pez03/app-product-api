import { CallHandler, ExecutionContext } from '@nestjs/common';

import { CreateClientInterceptor } from './create-client.interceptor';

describe('CreateClientInterceptor', () => {
  const mockDynamoDbAdapter = {
    getItem: jest.fn(),
    putItem: jest.fn(),
  };

  const mockExecutionContext = {
    switchToHttp: jest.fn(() => ({
      getRequest: jest.fn(() => ({
        body: { creatorName: 'Test Client' },
      })),
    })),
  } as unknown as ExecutionContext;

  const interceptor = new CreateClientInterceptor(mockDynamoDbAdapter as any);

  it('should call the EnsureClientInteractor and pass control to next handler', async () => {
    const mockCallHandler: CallHandler = {
      handle: jest.fn(),
    };

    // Llamada al interceptor
    const observable = interceptor.intercept(
      mockExecutionContext,
      mockCallHandler,
    );

    observable.then(() => {
      expect(mockCallHandler.handle).toHaveBeenCalled();
      expect(mockDynamoDbAdapter.getItem).toHaveBeenCalled();
    });
  });
});
