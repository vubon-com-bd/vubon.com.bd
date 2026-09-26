/**
 * VerifyMfaHandler — Unit Tests
 */
import { VerifyMfaHandler } from './verify-mfa.handler';
import { VerifyMfaCommand } from './verify-mfa.command';

const mockMfaService = () => ({
  name: 'AuthMfaService',
  verify: jest.fn(),
});

describe('VerifyMfaHandler', () => {
  let handler: VerifyMfaHandler;
  let mfaService: ReturnType<typeof mockMfaService>;

  beforeEach(() => {
    mfaService = mockMfaService();
    handler = new VerifyMfaHandler(mfaService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('VerifyMfaCommand');
  });

  it('should return boolean from service', async () => {
    mfaService.verify.mockResolvedValue(true);

    const command = new VerifyMfaCommand(
      { challengeId: 'x', code: '123456' } as never,
      'user-1' as never,
    );

    const result = await handler.execute(command);

    expect(result).toBe(true);
    expect(mfaService.verify).toHaveBeenCalledWith(command.input, 'user-1');
  });
});
