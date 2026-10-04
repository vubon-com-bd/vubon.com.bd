/**
 * RejectKycHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { RejectKycHandler } from './reject-kyc.handler.js';
import { RejectKycCommand } from './reject-kyc.command.js';

const mockService = () => ({
  reject: jest.fn<() => Promise<unknown>>(),
  toResponse: jest.fn<() => unknown>(),
});

describe('RejectKycHandler', () => {
  let handler: RejectKycHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new RejectKycHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('RejectKycCommand');
  });

  it('should delegate reject', async () => {
    service.reject.mockResolvedValue({ id: 'kyc-1' });
    service.toResponse.mockReturnValue({ id: 'kyc-1' });

    const command = new RejectKycCommand({ userId: 'user-1', reason: 'Blurry' } as never);
    await handler.execute(command);

    expect(service.reject).toHaveBeenCalledWith(command.input);
  });
});
