/**
 * GenerateRecoveryCodesHandler — Unit Tests
 */
import { GenerateRecoveryCodesHandler } from './generate-recovery-codes.handler';
import { GenerateRecoveryCodesCommand } from './generate-recovery-codes.command';

const mockRecoveryService = () => ({
  name: 'AuthRecoveryCodeService',
  generateForUser: jest.fn(),
});

describe('GenerateRecoveryCodesHandler', () => {
  let handler: GenerateRecoveryCodesHandler;
  let recoveryService: ReturnType<typeof mockRecoveryService>;

  beforeEach(() => {
    recoveryService = mockRecoveryService();
    handler = new GenerateRecoveryCodesHandler(recoveryService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('GenerateRecoveryCodesCommand');
  });

  it('should pass count and invalidatePrevious', async () => {
    recoveryService.generateForUser.mockResolvedValue({ codes: [], generatedAt: '' });

    const command = new GenerateRecoveryCodesCommand('user-1' as never, {
      password: 'x',
      count: 5,
      invalidatePrevious: false,
    } as never);

    await handler.execute(command);

    expect(recoveryService.generateForUser).toHaveBeenCalledWith('user-1', 5, false);
  });
});
