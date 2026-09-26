/**
 * PushService — Unit Tests (wrapper)
 * @module auth-service/infrastructure/services/external
 */
import { PushService } from './push.service';

const mockKernelPush = () => ({ send: jest.fn().mockResolvedValue(undefined) });

describe('PushService (auth wrapper)', () => {
  let service: PushService;
  let kernel: ReturnType<typeof mockKernelPush>;

  beforeEach(() => {
    kernel = mockKernelPush();
    service = new PushService(kernel as never);
  });

  it('should send device login push', async () => {
    await service.sendDeviceLogin('user-1', 'iPhone', '1.1.1.1');
    const payload = kernel.send.mock.calls[0]![0] as { userId: string; title: string };
    expect(payload.userId).toBe('user-1');
    expect(payload.title).toContain('Login');
  });

  it('should send MFA challenge push', async () => {
    await service.sendMfaChallenge('user-1', 'challenge-abc');
    const payload = kernel.send.mock.calls[0]![0] as { userId: string; data: { challengeId: string } };
    expect(payload.userId).toBe('user-1');
    expect(payload.data.challengeId).toBe('challenge-abc');
  });

  it('should include device + IP in data', async () => {
    await service.sendDeviceLogin('user-1', 'iPhone', '1.2.3.4');
    const payload = kernel.send.mock.calls[0]![0] as { data: { deviceName: string; ip: string } };
    expect(payload.data.deviceName).toBe('iPhone');
    expect(payload.data.ip).toBe('1.2.3.4');
  });
});
