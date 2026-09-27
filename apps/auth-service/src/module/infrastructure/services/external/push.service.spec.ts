/**
 * PushService — Unit Tests (wrapper)
 * @module auth-service/infrastructure/services/external
 */
import { jest } from '@jest/globals';

import { PushService } from './push.service.js';

const mockKernelPush = () => ({
  send: jest
    .fn<
      (msg: {
        userId: string;
        title: string;
        body?: string;
        data?: {
          challengeId?: string;
          deviceName?: string;
          ip?: string;
        };
      }) => Promise<unknown>
    >()
    .mockResolvedValue(undefined),
});

describe('PushService (auth wrapper)', () => {
  let service: PushService;
  let kernel: ReturnType<typeof mockKernelPush>;

  beforeEach(() => {
    kernel = mockKernelPush();
    service = new PushService(kernel as never);
  });

  it('should send device login push', async () => {
    await service.sendDeviceLogin('user-1', 'iPhone', '1.1.1.1');
    const payload = kernel.send.mock.calls[0]![0];
    expect(payload.userId).toBe('user-1');
    expect(payload.title).toContain('Login');
  });

  it('should send MFA challenge push', async () => {
    await service.sendMfaChallenge('user-1', 'challenge-abc');
    const payload = kernel.send.mock.calls[0]![0];
    expect(payload.userId).toBe('user-1');
    expect(payload.data?.challengeId).toBe('challenge-abc');
  });

  it('should include device + IP in data', async () => {
    await service.sendDeviceLogin('user-1', 'iPhone', '1.2.3.4');
    const payload = kernel.send.mock.calls[0]![0];
    expect(payload.data?.deviceName).toBe('iPhone');
    expect(payload.data?.ip).toBe('1.2.3.4');
  });
});
