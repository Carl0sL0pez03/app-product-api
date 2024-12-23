import { CreateClientDto } from '../dto/create-client.dto';
import { EnsureClientInteractor } from './ensureClient.interactor';

describe('EnsureClientInteractor', () => {
  const mockClientRepository = {
    findClientByName: jest.fn(),
    createClient: jest.fn(),
  };

  const interactor = new EnsureClientInteractor(mockClientRepository as any);

  it('should return undefined if client already exists', async () => {
    const clientDto = new CreateClientDto();
    clientDto.nameClient = 'carloseli0297@gmail.com';

    mockClientRepository.findClientByName.mockResolvedValue([
      {
        _id: '12312312',
        nameClient: "carloseli0297@gmail.com'",
      },
    ]);

    const result = await interactor.execute(clientDto);

    expect(result).toBeUndefined();
    expect(mockClientRepository.findClientByName).toHaveBeenCalledWith(
      'carloseli0297@gmail.com',
    );
    expect(mockClientRepository.createClient).not.toHaveBeenCalled();
  });

  it('should create a new client if not existing', async () => {
    const clientDto = new CreateClientDto();
    clientDto.nameClient = 'New Client';

    mockClientRepository.findClientByName.mockResolvedValue([]);

    mockClientRepository.createClient.mockResolvedValue({ some: 'output' });

    const result = await interactor.execute(clientDto);

    expect(result).toEqual({ some: 'output' });
    expect(mockClientRepository.findClientByName).toHaveBeenCalledWith(
      'New Client',
    );
    expect(mockClientRepository.createClient).toHaveBeenCalledWith(clientDto);
  });
});
