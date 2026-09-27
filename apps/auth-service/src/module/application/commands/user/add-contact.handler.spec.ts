/**
 * AddContactHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { AddContactHandler } from './add-contact.handler.js';
import { AddContactCommand } from './add-contact.command.js';

const mockService = () => ({ add: jest.fn<() => Promise<unknown>>(), toResponse: jest.fn<() => unknown>() });

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
