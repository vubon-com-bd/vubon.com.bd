/**
 * UpdateContactHandler — Unit Tests
 */
import { UpdateContactHandler } from './update-contact.handler';
import { UpdateContactCommand } from './update-contact.command';

const mockService = () => ({ update: jest.fn(), toResponse: jest.fn() });

describe('UpdateContactHandler', () => {
  let handler: UpdateContactHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new UpdateContactHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UpdateContactCommand');
  });

  it('should delegate update', async () => {
    service.update.mockResolvedValue({ id: 'contact-1' });
    service.toResponse.mockReturnValue({ id: 'contact-1' });

    const command = new UpdateContactCommand({ contactId: 'contact-1' } as never);
    const result = await handler.execute(command);

    expect(service.update).toHaveBeenCalledWith(command.input);
    expect(result).toBeDefined();
  });
});
