import { SubmitKycHandler } from '@application/commands/kyc/submit-kyc.handler';
import { SubmitKycCommand } from '@application/commands/kyc/submit-kyc.command';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock, createUserKycRepositoryMock } from '../../../helpers/user-repository.mock';

describe('SubmitKycHandler', () => {
  let handler: SubmitKycHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  let kycRepo: ReturnType<typeof createUserKycRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    kycRepo = createUserKycRepositoryMock();
    handler = new SubmitKycHandler(kycRepo as never, userRepo as never);
  });

  const buildEligibleUser = () => {
    const u = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    u.markEmailVerified();
    u.activate(now);
    return u;
  };

  it('should submit KYC when eligible', async () => {
    userRepo.findById.mockResolvedValue(buildEligibleUser());
    kycRepo.findByUserId.mockResolvedValue(null);

    const result = await handler.execute(
      new SubmitKycCommand({
        userId: 'user-1',
        documents: [{ type: 'nid', frontUrl: 'https://cdn.example.com/nid.jpg' }],
        acceptTerms: true,
      })
    );
    expect(result.userId).toBe('user-1');
    expect(kycRepo.save).toHaveBeenCalled();
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(
      handler.execute(
        new SubmitKycCommand({
          userId: 'missing',
          documents: [{ type: 'nid', frontUrl: 'https://x.com/a.jpg' }],
          acceptTerms: true,
        })
      )
    ).rejects.toThrow();
  });

  it('should throw when no documents', async () => {
    userRepo.findById.mockResolvedValue(buildEligibleUser());
    kycRepo.findByUserId.mockResolvedValue(null);
    await expect(
      handler.execute(
        new SubmitKycCommand({ userId: 'user-1', documents: [], acceptTerms: true })
      )
    ).rejects.toThrow();
  });
});
