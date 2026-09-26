/**
 * EmailService — Unit Tests (wrapper)
 * @module auth-service/infrastructure/services/external
 */
import { EmailService } from './email.service';

const mockKernelEmail = () => ({ send: jest.fn().mockResolvedValue({ success: true }) });

describe('EmailService (auth wrapper)', () => {
  let service: EmailService;
  let kernel: ReturnType<typeof mockKernelEmail>;

  beforeEach(() => {
    kernel = mockKernelEmail();
    service = new EmailService(kernel as never);
  });

  it('should send welcome email', async () => {
    await service.sendWelcome('user@example.com', 'John');
    expect(kernel.send).toHaveBeenCalled();
    const payload = kernel.send.mock.calls[0]![0] as { to: string; subject: string };
    expect(payload.to).toBe('user@example.com');
    expect(payload.subject).toContain('Welcome');
  });

  it('should send verification email with code', async () => {
    await service.sendVerification('user@example.com', '123456', '2024-12-31');
    const payload = kernel.send.mock.calls[0]![0] as { variables: { code: string } };
    expect(payload.variables.code).toBe('123456');
  });

  it('should send password reset email with URL', async () => {
    await service.sendPasswordReset('user@example.com', 'https://x.com/reset', '2024-12-31');
    const payload = kernel.send.mock.calls[0]![0] as { variables: { resetUrl: string } };
    expect(payload.variables.resetUrl).toContain('reset');
  });

  it('should send MFA code', async () => {
    await service.sendMfaCode('user@example.com', '654321');
    const payload = kernel.send.mock.calls[0]![0] as { variables: { code: string } };
    expect(payload.variables.code).toBe('654321');
  });

  it('should send recovery codes as joined string', async () => {
    await service.sendRecoveryCodes('user@example.com', ['A', 'B', 'C']);
    const payload = kernel.send.mock.calls[0]![0] as { variables: { codes: string; count: string } };
    expect(payload.variables.codes).toBe('A\nB\nC');
    expect(payload.variables.count).toBe('3');
  });

  it('should send account lock email with reason', async () => {
    await service.sendAccountLock('user@example.com', 'fraud', '2024-12-31');
    const payload = kernel.send.mock.calls[0]![0] as { variables: { reason: string } };
    expect(payload.variables.reason).toBe('fraud');
  });

  it('should send device login email', async () => {
    await service.sendDeviceLogin('user@example.com', 'iPhone', '1.1.1.1', '2024-01-01');
    const payload = kernel.send.mock.calls[0]![0] as { variables: { deviceName: string; ip: string } };
    expect(payload.variables.deviceName).toBe('iPhone');
    expect(payload.variables.ip).toBe('1.1.1.1');
  });

  it('should default unlockAt to "Contact support"', async () => {
    await service.sendAccountLock('user@example.com', 'reason');
    const payload = kernel.send.mock.calls[0]![0] as { variables: { unlockAt: string } };
    expect(payload.variables.unlockAt).toBe('Contact support');
  });
});
