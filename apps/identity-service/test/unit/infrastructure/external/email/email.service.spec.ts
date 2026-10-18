/**
 * AuthEmailService unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthEmailService } from '@infrastructure/external/email/email.service.js';
import { makeKernelEmailServiceMock } from '@fixtures/index.js';

describe('AuthEmailService', () => {
  let service: AuthEmailService;
  let kernel: ReturnType<typeof makeKernelEmailServiceMock>;

  beforeEach(() => {
    kernel = makeKernelEmailServiceMock();
    service = new AuthEmailService(kernel as never);
  });

  it('sendWelcome sends email', async () => {
    const result = await service.sendWelcome('user@x.com', 'Test User');
    expect(result).toEqual({ sent: true });
    expect(kernel.send).toHaveBeenCalled();
  });

  it('sendVerificationCode sends code', async () => {
    const result = await service.sendVerificationCode('user@x.com', 'Test', '123456');
    expect(result).toEqual({ sent: true });
  });

  it('sendPasswordReset sends reset link', async () => {
    const result = await service.sendPasswordReset(
      'user@x.com',
      'Test',
      'https://vubon.com.bd/reset?token=abc',
    );
    expect(result).toEqual({ sent: true });
  });

  it('sendMfaCode sends MFA code', async () => {
    const result = await service.sendMfaCode('user@x.com', 'Test', '654321');
    expect(result).toEqual({ sent: true });
  });

  it('sendRecoveryCodes sends codes', async () => {
    const result = await service.sendRecoveryCodes('user@x.com', 'Test', ['ABCD1234', 'EFGH5678']);
    expect(result).toEqual({ sent: true });
  });

  it('sendAccountLockAlert sends alert', async () => {
    const result = await service.sendAccountLockAlert(
      'user@x.com',
      'Test',
      new Date(Date.now() + 3600000).toISOString(),
    );
    expect(result).toEqual({ sent: true });
  });

  it('sendDeviceLoginAlert sends alert', async () => {
    const result = await service.sendDeviceLoginAlert(
      'user@x.com',
      'Test',
      'Chrome on Windows',
      '1.2.3.4',
    );
    expect(result).toEqual({ sent: true });
  });

  it('returns sent:false when kernel fails', async () => {
    kernel.send.mockResolvedValueOnce({ success: false } as never);
    const result = await service.sendWelcome('user@x.com', 'Test');
    expect(result).toEqual({ sent: false });
  });

  it('returns sent:false when kernel throws', async () => {
    kernel.send.mockRejectedValueOnce(new Error('SMTP down'));
    const result = await service.sendWelcome('user@x.com', 'Test');
    expect(result).toEqual({ sent: false });
  });
});
