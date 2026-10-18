import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GenerateRecoveryCodesHandler } from '@application/commands/auth/generate-recovery-codes.handler.js';
import { GenerateRecoveryCodesCommand } from '@application/commands/auth/generate-recovery-codes.command.js';
import type { AuthRecoveryCodeServiceInterface } from '@application/services/interfaces/auth-recovery-code.service.interface.js';

describe('GenerateRecoveryCodesHandler', () => {
  let handler: GenerateRecoveryCodesHandler;
  let mockService: jest.Mocked<AuthRecoveryCodeServiceInterface>;

  beforeEach(() => {
    mockService = {
      name: 'AuthRecoveryCodeService',
      generate: jest.fn(),
      verify: jest.fn(),
      countRemaining: jest.fn(),
      revokeAll: jest.fn(),
    } as unknown as jest.Mocked<AuthRecoveryCodeServiceInterface>;
    handler = new GenerateRecoveryCodesHandler(mockService);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('auth.generate-recovery-codes');
  });

  it('should call service.generate with default count 10', async () => {
    mockService.generate.mockResolvedValue({
      success: true,
      codes: ['A', 'B', 'C'],
      generatedAt: new Date().toISOString(),
      remainingCount: 3,
    });

    const result = await handler.execute(new GenerateRecoveryCodesCommand('auth-1'));

    expect(mockService.generate).toHaveBeenCalledWith('auth-1', 10);
    expect(result).toEqual(['A', 'B', 'C']);
  });

  it('should use provided count', async () => {
    mockService.generate.mockResolvedValue({
      success: true,
      codes: ['A', 'B'],
      generatedAt: new Date().toISOString(),
      remainingCount: 2,
    });

    await handler.execute(new GenerateRecoveryCodesCommand('auth-1', 5));
    expect(mockService.generate).toHaveBeenCalledWith('auth-1', 5);
  });

  it('should return codes only from response', async () => {
    mockService.generate.mockResolvedValue({
      success: true,
      codes: ['X', 'Y'],
      generatedAt: '2025-01-01',
      remainingCount: 2,
    });
    const result = await handler.execute(new GenerateRecoveryCodesCommand('a-1'));
    expect(result).toEqual(['X', 'Y']);
  });
});
