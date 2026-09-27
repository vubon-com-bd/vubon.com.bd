/**
 * UserEmailService Unit Test (mocked kernel EmailService)
 */
import { jest } from '@jest/globals';

import { UserEmailService } from '@infrastructure/external/email/email.service';

describe('UserEmailService (mocked)', () => {
  let service: UserEmailService;
  let kernel: { send: jest.Mock };

  beforeEach(() => {
    kernel = { send: jest.fn().mockResolvedValue({ success: true }) };
    service = new UserEmailService(kernel as never);
  });

  it('sendWelcome → kernel.send', async () => {
    await service.sendWelcome('user@example.com', {
      userName: 'John',
      loginUrl: 'https://vubon.com/login',
    });
    expect(kernel.send).toHaveBeenCalled();
    const arg = kernel.send.mock.calls[0][0];
    expect(arg.to).toBe('user@example.com');
    expect(arg.subject).toContain('Welcome');
  });

  it('sendProfileComplete → kernel.send', async () => {
    await service.sendProfileComplete('user@example.com', {
      userName: 'John',
      profileUrl: 'https://vubon.com/u/john',
      completionScore: 100,
    });
    expect(kernel.send).toHaveBeenCalled();
  });

  it('sendKycSubmitted → kernel.send', async () => {
    await service.sendKycSubmitted('user@example.com', {
      userName: 'John',
      submittedAt: '2026-01-01',
      estimatedReviewHours: 48,
    });
    expect(kernel.send).toHaveBeenCalled();
  });

  it('sendKycVerified → kernel.send', async () => {
    await service.sendKycVerified('user@example.com', {
      userName: 'John',
      verifiedAt: '2026-01-01',
    });
    expect(kernel.send).toHaveBeenCalled();
  });

  it('sendKycRejected → kernel.send', async () => {
    await service.sendKycRejected('user@example.com', {
      userName: 'John',
      reason: 'Blurry',
      retryUrl: 'https://vubon.com/kyc',
    });
    expect(kernel.send).toHaveBeenCalled();
  });
});
