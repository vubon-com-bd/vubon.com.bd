/**
 * ResendVerificationHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { ResendVerificationHandler } from './resend-verification.handler.js';
import { ResendVerificationCommand } from './resend-verification.command.js';

const mockUserRepo = () => ({
  findByEmail: jest.fn() as jest.Mock,
});

const mockVerificationService = () => ({
  name: 'UserVerificationService',
  request: jest.fn() as jest.Mock,
});

describe('ResendVerificationHandler', () => {
  let handler: ResendVerificationHandler;
  let userRepo: ReturnType<typeof mockUserRepo>;
  let verificationService: ReturnType<typeof mockVerificationService>;

  beforeEach(() => {
    userRepo = mockUserRepo();
    verificationService = mockVerificationService();
    handler = new ResendVerificationHandler(
      userRepo as never,
      verificationService as never,
    );
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('ResendVerificationCommand');
  });

  it('should be a no-op if user not found (no leak)', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    const command = new ResendVerificationCommand({
      identifier: 'missing@example.com',
    } as never);

    await handler.execute(command);

    expect(verificationService.request).not.toHaveBeenCalled();
  });

  it('should request verification when user found', async () => {
    userRepo.findByEmail.mockResolvedValue({ id: 'user-1' });
    const command = new ResendVerificationCommand({
      identifier: 'john@example.com',
    } as never);

    await handler.execute(command);

    expect(verificationService.request).toHaveBeenCalledWith({
      userId: 'user-1',
      type: 'email',
    });
  });
});
