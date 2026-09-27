import { UserTierEvaluatorService } from '@infrastructure/services/internal/user-tier-evaluator.service';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('UserTierEvaluatorService', () => {
  let service: UserTierEvaluatorService;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    service = new UserTierEvaluatorService();
  });

  it('evaluate returns tier + flags', () => {
    const u = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    u.markEmailVerified();
    const r = service.evaluate({ user: u, hasKyc: false, accountAgeDays: 30 });
    expect(r.tier).toBeDefined();
    expect(r.maxAddresses).toBeGreaterThan(0);
  });

  it('computeTier for admin is platinum', () => {
    const a = UserEntity.create({
      id: UserIdVO.create('admin-1'),
      email: UserEmailVO.create('admin@example.com'),
      name: UserNameVO.create('Admin'),
      type: UserTypeVO.create('admin'),
      now,
    });
    const tier = service.computeTier({ user: a, hasKyc: false, accountAgeDays: 0 });
    expect(tier).toBe('platinum');
  });
});
