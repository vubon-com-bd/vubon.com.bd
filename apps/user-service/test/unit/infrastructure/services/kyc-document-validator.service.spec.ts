import { KycDocumentValidatorService } from '@infrastructure/services/internal/kyc-document-validator.service';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('KycDocumentValidatorService', () => {
  let service: KycDocumentValidatorService;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    service = new KycDocumentValidatorService();
  });

  const buildUser = () => {
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

  it('checkEligibility for verified active user → eligible', () => {
    const r = service.checkEligibility(buildUser(), null);
    expect(r.eligible).toBe(true);
  });

  it('checkEligibility for unverified user → not eligible', () => {
    const u = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    u.activate(now);
    const r = service.checkEligibility(u, null);
    expect(r.eligible).toBe(false);
  });

  it('validateDocuments passes valid NID', () => {
    const r = service.validateDocuments([
      { type: 'nid', frontUrl: 'https://cdn.example.com/nid.jpg' },
    ]);
    expect(r.valid).toBe(true);
  });

  it('validateDocuments fails empty list', () => {
    const r = service.validateDocuments([]);
    expect(r.valid).toBe(false);
  });

  it('validateDocuments fails non-URL', () => {
    const r = service.validateDocuments([
      { type: 'nid', frontUrl: 'not-a-url' },
    ]);
    expect(r.valid).toBe(false);
  });

  it('validateDocuments fails invalid type', () => {
    const r = service.validateDocuments([
      { type: 'invalid-doc', frontUrl: 'https://x.com/a.jpg' },
    ]);
    expect(r.valid).toBe(false);
  });
});
