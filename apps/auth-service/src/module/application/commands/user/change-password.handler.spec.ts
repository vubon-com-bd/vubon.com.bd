/**
 * ChangePasswordHandler — Unit Tests
 */
import { ChangePasswordHandler } from './change-password.handler';
import { ChangePasswordCommand } from './change-password.command';

const mockUserRepo = () => ({ findById: jest.fn(), save: jest.fn() });
const mockHasher = () => ({ verify: jest.fn(), hash: jest.fn() });

describe('ChangePasswordHandler', () => {
  let handler: ChangePasswordHandler;
  let userRepo: ReturnType<typeof mockUserRepo>;
  let hasher: ReturnType<typeof mockHasher>;

  beforeEach(() => {
    userRepo = mockUserRepo();
    hasher = mockHasher();
    handler = new ChangePasswordHandler(userRepo as never, hasher as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('ChangePasswordCommand');
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);

    const command = new ChangePasswordCommand('user-1' as never, {
      currentPassword: 'Old123!',
      newPassword: 'New123!',
      confirmPassword: 'New123!',
    } as never);

    await expect(handler.execute(command)).rejects.toThrow();
  });

  it('should throw when current password wrong', async () => {
    userRepo.findById.mockResolvedValue({ passwordHash: '$2b$hash' });
    hasher.verify.mockResolvedValue(false);

    const command = new ChangePasswordCommand('user-1' as never, {
      currentPassword: 'WrongPass',
      newPassword: 'New123!',
      confirmPassword: 'New123!',
    } as never);

    await expect(handler.execute(command)).rejects.toThrow();
  });

  it('should update password on valid input', async () => {
    const user = { passwordHash: '$2b$hash', changePasswordHash: jest.fn() };
    userRepo.findById.mockResolvedValue(user);
    hasher.verify.mockResolvedValue(true);
    hasher.hash.mockResolvedValue('$2b$new');

    const command = new ChangePasswordCommand('user-1' as never, {
      currentPassword: 'Old123!',
      newPassword: 'New123!',
      confirmPassword: 'New123!',
    } as never);

    await handler.execute(command);

    expect(user.changePasswordHash).toHaveBeenCalledWith('$2b$new');
    expect(userRepo.save).toHaveBeenCalled();
  });
});
