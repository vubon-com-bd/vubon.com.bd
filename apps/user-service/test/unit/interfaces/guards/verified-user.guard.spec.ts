/**
 * VerifiedUserGuard Unit Test
 */
import { ForbiddenException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { VerifiedUserGuard } from '@interfaces/guards/verified-user.guard';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('VerifiedUserGuard', () => {
  let guard: VerifiedUserGuard;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    guard = new VerifiedUserGuard(userRepo as never);
  });

  const buildContext = (user: unknown): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ user, params: {} }),
      }),
    }) as unknown as ExecutionContext;

  const buildVerifiedUser = () => {
    const u = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    u.markEmailVerified();
    return u;
  };

  it('should allow verified user', async () => {
    userRepo.findById.mockResolvedValue(buildVerifiedUser());
    const ctx = buildContext({ userId: 'user-1' });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('should throw when no authenticated user', async () => {
    const ctx = buildContext(null);
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);
    const ctx = buildContext({ userId: 'missing' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should throw when email not verified', async () => {
    const u = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    userRepo.findById.mockResolvedValue(u);
    const ctx = buildContext({ userId: 'user-1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });
});
