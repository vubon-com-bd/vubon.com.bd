/**
 * VerifyBiometricHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { VerifyBiometricHandler } from './verify-biometric.handler.js';
import { VerifyBiometricCommand } from './verify-biometric.command.js';

const mockService = () => ({
  name: 'AuthBiometricService',
  verify: jest.fn<() => Promise<unknown>>(),
});

describe('VerifyBiometricHandler', () => {
  let handler: VerifyBiometricHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new VerifyBiometricHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('VerifyBiometricCommand');
  });

  it('should return boolean', async () => {
    service.verify.mockResolvedValue(true);
    const command = new VerifyBiometricCommand({} as never);

    const result = await handler.execute(command);

    expect(result).toBe(true);
    expect(service.verify).toHaveBeenCalledWith(command.input);
  });
});
