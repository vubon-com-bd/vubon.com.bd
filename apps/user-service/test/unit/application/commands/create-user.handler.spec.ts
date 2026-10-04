/**
 * CreateUserHandler Unit Test
 */
import { CreateUserHandler } from '@application/commands/user/create-user.handler';
import { CreateUserCommand } from '@application/commands/user/create-user.command';
import { UserEntity } from '@domain/entities/user.entity';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new CreateUserHandler(userRepo);
  });

  const buildCommand = () =>
    new CreateUserCommand({
      email: 'user@example.com',
      password: 'Test123!@#',
      type: 'individual',
      firstName: 'John',
      lastName: 'Doe',
      acceptTerms: true,
    });

  describe('execute', () => {
    it('should create a user when email is unique', async () => {
      userRepo.findByEmail.mockResolvedValue(null);

      const result = await handler.execute(buildCommand());

      expect(result.email).toBe('user@example.com');
      expect(result.type).toBe('individual');
      expect(result.status).toBe('pending');
      expect(userRepo.save).toHaveBeenCalledTimes(1);
    });

    it('should throw UserAlreadyExistsApplicationError on duplicate email', async () => {
      const existing = UserEntity.create({
        id: { value: 'existing-1' } as never,
        email: { value: 'user@example.com' } as never,
        name: { value: 'Existing User' } as never,
        type: { value: 'individual' } as never,
        now: '2026-01-01T00:00:00.000Z',
      });
      userRepo.findByEmail.mockResolvedValue(existing);

      await expect(handler.execute(buildCommand())).rejects.toThrow(
        'User already exists'
      );
      expect(userRepo.save).not.toHaveBeenCalled();
    });

    it('should use "Unnamed User" when no firstName/lastName', async () => {
      userRepo.findByEmail.mockResolvedValue(null);
      const cmd = new CreateUserCommand({
        email: 'anon@example.com',
        password: 'Test123!@#',
        type: 'individual',
        acceptTerms: true,
      });

      const result = await handler.execute(cmd);
      expect(result.email).toBe('anon@example.com');
      expect(userRepo.save).toHaveBeenCalled();
    });

    it('should call findByEmail with correct email VO', async () => {
      userRepo.findByEmail.mockResolvedValue(null);
      await handler.execute(buildCommand());
      expect(userRepo.findByEmail).toHaveBeenCalledTimes(1);
      const arg = userRepo.findByEmail.mock.calls[0][0];
      expect(arg.value).toBe('user@example.com');
    });

    it('should save the created user', async () => {
      userRepo.findByEmail.mockResolvedValue(null);
      await handler.execute(buildCommand());
      const saved = userRepo.save.mock.calls[0][0];
      expect(saved.email.value).toBe('user@example.com');
      expect(saved.name.value).toContain('John');
    });
  });
});
