import { ProfileCompletionCalculatorService } from '@infrastructure/services/internal/profile-completion-calculator.service';
import { UserEntity } from '@domain/entities/user.entity';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('ProfileCompletionCalculatorService', () => {
  let service: ProfileCompletionCalculatorService;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    service = new ProfileCompletionCalculatorService();
  });

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  const buildProfile = () =>
    UserProfileEntity.create({ id: 'p-1', userId: UserIdVO.create('user-1'), now });

  it('calculate returns breakdown', () => {
    const r = service.calculate(buildUser(), buildProfile());
    expect(r).toHaveProperty('percentage');
    expect(r).toHaveProperty('completed');
    expect(r).toHaveProperty('missing');
    expect(r).toHaveProperty('isComplete');
  });

  it('isComplete false when profile empty', () => {
    expect(service.isComplete(buildUser(), buildProfile())).toBe(false);
  });

  it('meetsThreshold checks against threshold', () => {
    expect(service.meetsThreshold(buildUser(), buildProfile(), 10)).toBe(true);
    expect(service.meetsThreshold(buildUser(), buildProfile(), 100)).toBe(false);
  });
});
