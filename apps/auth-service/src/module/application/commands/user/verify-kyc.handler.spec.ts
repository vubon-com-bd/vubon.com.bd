/**
 * VerifyKycHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { VerifyKycHandler } from './verify-kyc.handler.js';
import { VerifyKycCommand } from './verify-kyc.command.js';

const mockService = () => ({
  approve: jest.fn<() => Promise<unknown>>(),
  toResponse: jest.fn<() => unknown>(),
});

describe('VerifyKycHandler', () => {
  let handler: VerifyKycHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new VerifyKycHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('VerifyKycCommand');
  });

  it('should delegate approve', async () => {
    service.approve.mockResolvedValue({ id: 'kyc-1' });
    service.toResponse.mockReturnValue({ id: 'kyc-1' });

    const command = new VerifyKycCommand({ userId: 'user-1' } as never);
    const result = await handler.execute(command);

    expect(service.approve).toHaveBeenCalledWith(command.input);
    expect(result).toBeDefined();
  });
});
