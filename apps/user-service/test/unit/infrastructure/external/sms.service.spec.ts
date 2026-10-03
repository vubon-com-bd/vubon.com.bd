import { jest } from '@jest/globals';

import { UserSmsService } from '@infrastructure/external/sms/sms.service';

describe('UserSmsService (mocked)', () => {
  let service: UserSmsService;
  let kernel: { send: jest.Mock };

  beforeEach(() => {
    kernel = { send: jest.fn().mockResolvedValue({ success: true }) };
    service = new UserSmsService(kernel as never);
  });

  it('sendVerificationCode → kernel.send with message field', async () => {
    await service.sendVerificationCode('+8801712345678', '123456');
    expect(kernel.send).toHaveBeenCalled();
    const arg = kernel.send.mock.calls[0][0];
    expect(arg.to).toBe('+8801712345678');
    expect(arg.message).toContain('123456');
  });

  it('sendKycStatusUpdate → kernel.send', async () => {
    await service.sendKycStatusUpdate('+8801712345678', 'approved');
    expect(kernel.send).toHaveBeenCalled();
    expect(kernel.send.mock.calls[0][0].message).toContain('approved');
  });
});
