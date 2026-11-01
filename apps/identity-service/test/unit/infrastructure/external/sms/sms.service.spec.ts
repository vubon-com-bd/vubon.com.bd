/**
 * AuthSmsService unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthSmsService } from '@infrastructure/external/sms/sms.service.js';
import { makeKernelSmsServiceMock } from '@fixtures/index.js';

describe('AuthSmsService', () => {
  let service: AuthSmsService;
  let kernel: ReturnType<typeof makeKernelSmsServiceMock>;

  beforeEach(() => {
    kernel = makeKernelSmsServiceMock();
    service = new AuthSmsService(kernel as never);
  });

  it('send delegates to kernel', async () => {
    const result = await service.send('+8801700000000', 'Hello');
    expect(result).toEqual({ sent: true });
    expect(kernel.send).toHaveBeenCalled();
  });

  it('sendVerificationCode sends OTP', async () => {
    const result = await service.sendVerificationCode('+8801700000000', '123456');
    expect(result).toEqual({ sent: true });
  });

  it('sendMfaCode sends MFA code', async () => {
    const result = await service.sendMfaCode('+8801700000000', '654321');
    expect(result).toEqual({ sent: true });
  });

  it('sendAccountLockAlert sends alert', async () => {
    const result = await service.sendAccountLockAlert(
      '+8801700000000',
      new Date(Date.now() + 3600000).toISOString(),
    );
    expect(result).toEqual({ sent: true });
  });

  it('returns sent:false when kernel fails', async () => {
    kernel.send.mockResolvedValueOnce({ success: false } as never);
    const result = await service.send('+8801700000000', 'Hello');
    expect(result).toEqual({ sent: false });
  });

  it('returns sent:false when kernel throws', async () => {
    kernel.send.mockRejectedValueOnce(new Error('SMS gateway down'));
    const result = await service.send('+8801700000000', 'Hello');
    expect(result).toEqual({ sent: false });
  });
});
