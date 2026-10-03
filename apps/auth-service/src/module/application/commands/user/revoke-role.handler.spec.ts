/**
 * RevokeRoleHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { RevokeRoleHandler } from './revoke-role.handler.js';
import { RevokeRoleCommand } from './revoke-role.command.js';

const mockService = () => ({ revoke: jest.fn<() => Promise<unknown>>() });

describe('RevokeRoleHandler', () => {
  let handler: RevokeRoleHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new RevokeRoleHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('RevokeRoleCommand');
  });

  it('should delegate revoke', async () => {
    service.revoke.mockResolvedValue(undefined);
    const command = new RevokeRoleCommand({ userId: 'user-1', role: 'admin' } as never);

    await handler.execute(command);

    expect(service.revoke).toHaveBeenCalledWith('user-1', 'admin');
  });
});
