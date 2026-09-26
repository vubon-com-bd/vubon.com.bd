/**
 * EnableMfaHandler — Unit Tests
 */
import { EnableMfaHandler } from './enable-mfa.handler';
import { EnableMfaCommand } from './enable-mfa.command';

const mockMfaService = () => ({
  name: 'AuthMfaService',
  beginEnrollment: jest.fn(),
});

describe('EnableMfaHandler', () => {
  let handler: EnableMfaHandler;
  let mfaService: ReturnType<typeof mockMfaService>;

  beforeEach(() => {
    mfaService = mockMfaService();
    handler = new EnableMfaHandler(mfaService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('EnableMfaCommand');
  });

  it('should call beginEnrollment', async () => {
    const mockResult = { secret: 'X', qrCodeUrl: 'y', recoveryCodes: [] };
    mfaService.beginEnrollment.mockResolvedValue(mockResult);

    const command = new EnableMfaCommand('user-1' as never, {
      type: 'totp',
      password: 'x',
    } as never);

    const result = await handler.execute(command);

    expect(mfaService.beginEnrollment).toHaveBeenCalledWith('user-1', command.input);
    expect(result).toEqual(mockResult);
  });
});
