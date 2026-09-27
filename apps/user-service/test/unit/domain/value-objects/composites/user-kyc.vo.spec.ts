import { UserKycVO } from '@domain/value-objects/composites/user-kyc.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { KycStatusVO } from '@domain/value-objects/primitives/kyc-status.vo';
import { ActivityTimestampVO } from '@domain/value-objects/primitives/activity-timestamp.vo';

describe('UserKycVO', () => {
  it('creates with null timestamps', () => {
    const vo = UserKycVO.create({
      id: KycIdVO.create('k-1'),
      userId: UserIdVO.create('u-1'),
      document: KycDocumentVO.create('nid'),
      status: KycStatusVO.notStarted(),
      submittedAt: null,
      verifiedAt: null,
    });
    expect(vo.wasSubmitted()).toBe(false);
    expect(vo.isVerified()).toBe(false);
  });

  it('isVerified requires approved + verifiedAt', () => {
    const vo = UserKycVO.create({
      id: KycIdVO.create('k-1'),
      userId: UserIdVO.create('u-1'),
      document: KycDocumentVO.create('nid'),
      status: KycStatusVO.approved(),
      submittedAt: ActivityTimestampVO.now(),
      verifiedAt: ActivityTimestampVO.now(),
    });
    expect(vo.isVerified()).toBe(true);
  });

  it('isPending when status pending', () => {
    const vo = UserKycVO.create({
      id: KycIdVO.create('k-1'),
      userId: UserIdVO.create('u-1'),
      document: KycDocumentVO.create('nid'),
      status: KycStatusVO.pending(),
      submittedAt: null,
      verifiedAt: null,
    });
    expect(vo.isPending()).toBe(true);
  });

  it('throws when id missing', () => {
    expect(() =>
      UserKycVO.create({ id: null as never, userId: {} as never, document: {} as never, status: {} as never, submittedAt: null, verifiedAt: null })
    ).toThrow();
  });

  it('throws when userId missing', () => {
    expect(() =>
      UserKycVO.create({ id: {} as never, userId: null as never, document: {} as never, status: {} as never, submittedAt: null, verifiedAt: null })
    ).toThrow();
  });

  it('wasSubmitted true when submittedAt set', () => {
    const vo = UserKycVO.create({
      id: KycIdVO.create('k-1'),
      userId: UserIdVO.create('u-1'),
      document: KycDocumentVO.create('nid'),
      status: KycStatusVO.pending(),
      submittedAt: ActivityTimestampVO.now(),
      verifiedAt: null,
    });
    expect(vo.wasSubmitted()).toBe(true);
  });
});
