/**
 * AddContactHandler — Unit Tests
 */
import { AddContactHandler } from './add-contact.handler';
import { AddContactCommand } from './add-contact.command';

const mockService = () => ({ add: jest.fn(), toResponse: jest.fn() });

describe('AddContactHandler', () => {
  let handler: AddContactHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new AddContactHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('AddContactCommand');
  });

  it('should delegate add', async () => {
    service.add.mockResolvedValue({ id: 'contact-1' });
    service.toResponse.mockReturnValue({ id: 'contact-1' });

    const command = new AddContactCommand('user-1' as never, { email: 'alt@example.com' } as never);
    const result = await handler.execute(command);

    expect(service.add).toHaveBeenCalledWith('user-1', command.input);
    expect(result.id).toBe('contact-1');
  });
});
