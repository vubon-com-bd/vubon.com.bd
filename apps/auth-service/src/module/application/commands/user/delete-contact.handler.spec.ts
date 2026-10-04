/**
 * DeleteContactHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { DeleteContactHandler } from './delete-contact.handler.js';
import { DeleteContactCommand } from './delete-contact.command.js';

const mockService = () => ({ remove: jest.fn<() => Promise<unknown>>() });

describe('DeleteContactHandler', () => {
  let handler: DeleteContactHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new DeleteContactHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('DeleteContactCommand');
  });

  it('should delegate remove', async () => {
    service.remove.mockResolvedValue(undefined);
    const command = new DeleteContactCommand({ contactId: 'contact-1' } as never);

    await handler.execute(command);

    expect(service.remove).toHaveBeenCalledWith('contact-1');
  });
});
