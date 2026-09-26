/**
 * SmsService — Unit Tests (wrapper)
 * @module auth-service/infrastructure/services/external
 */
import { SmsService } from './sms.service';

const mockKernelSms = () => ({ send: jest.fn().mockResolvedValue(undefined) });

describe('SmsService (auth wrapper)', () => {
  let service: SmsService;
  let kernel: ReturnType<typeof mockKernelSms>;

  beforeEach(() => {
    kernel = mockKernelSms();
    service = new SmsService(kernel as never);
  });

  it('should send OTP SMS', async () => {
    await service.sendOtp('+8801712345678', '123456');
    const payload = kernel.send.mock.calls[0]![0] as { to: string; message: string };
    expect(payload.to).toBe('+8801712345678');
    expect(payload.message).toContain('123456');
  });

  it('should send MFA code SMS', async () => {
    await service.sendMfaCode('+8801712345678', '654321');
    const payload = kernel.send.mock.calls[0]![0] as { message: string };
    expect(payload.message).toContain('654321');
  });

  it('should send account locked SMS with reason', async () => {
    await service.sendAccountLocked('+8801712345678', 'fraud detected');
    const payload = kernel.send.mock.calls[0]![0] as { message: string };
    expect(payload.message).toContain('fraud detected');
  });
});
