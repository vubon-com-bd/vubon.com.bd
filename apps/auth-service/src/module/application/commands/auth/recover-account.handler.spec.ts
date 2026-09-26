/**
 * RecoverAccountHandler — Unit Tests
 */
import { RecoverAccountHandler } from './recover-account.handler';
import { RecoverAccountCommand } from './recover-account.command';

const mockUserRepo = () => ({
  findByEmail: jest.fn(),
  save: jest.fn(),
});

const mockHasher = () => ({
  name: 'PasswordHasherService',
  hash: jest.fn(),
});

const mockRecoveryService = () => ({
  name: 'AuthRecoveryCodeService',
  consume: jest.fn(),
});

describe('RecoverAccountHandler', () => {
  let handler: RecoverAccountHandler;
  let userRepo: ReturnType<typeof mockUserRepo>;
  let hasher: ReturnType<typeof mockHasher>;
  let recoveryService: ReturnType<typeof mockRecoveryService>;

  beforeEach(() => {
    userRepo = mockUserRepo();
    hasher = mockHasher();
    recoveryService = mockRecoveryService();
    handler = new RecoverAccountHandler(
      userRepo as never,
      hasher as never,
      recoveryService as never,
    );
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('RecoverAccountCommand');
  });

  it('should throw when user not found', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    const command = new RecoverAccountCommand({
      email: 'noone@example.com',
      recoveryCode: 'ABCD-1234',
      newPassword: 'NewPass123!',
      confirmPassword: 'NewPass123!',
    } as never);

    await expect(handler.execute(command)).rejects.toThrow();
  });

  it('should throw when recovery code invalid', async () => {
    userRepo.findByEmail.mockResolvedValue({ id: 'user-1' });
    recoveryService.consume.mockResolvedValue(false);

    const command = new RecoverAccountCommand({
      email: 'john@example.com',
      recoveryCode: 'INVALID-0000',
      newPassword: 'NewPass123!',
      confirmPassword: 'NewPass123!',
    } as never);

    await expect(handler.execute(command)).rejects.toThrow();
  });

  it('should change password on valid recovery', async () => {
    const user = { id: 'user-1', changePasswordHash: jest.fn() };
    userRepo.findByEmail.mockResolvedValue(user);
    recoveryService.consume.mockResolvedValue(true);
    hasher.hash.mockResolvedValue('$2b$12$new');

    const command = new RecoverAccountCommand({
      email: 'john@example.com',
      recoveryCode: 'ABCD-1234',
      newPassword: 'NewPass123!',
      confirmPassword: 'NewPass123!',
    } as never);

    await handler.execute(command);

    expect(user.changePasswordHash).toHaveBeenCalledWith('$2b$12$new');
    expect(userRepo.save).toHaveBeenCalled();
  });
});
