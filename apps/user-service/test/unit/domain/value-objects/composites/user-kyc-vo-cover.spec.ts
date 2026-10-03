/**
 * Coverage filler for user-kyc.vo.ts branches
 */
import { UserKycVO } from '@domain/value-objects/composites/user-kyc.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { KycStatusVO } from '@domain/value-objects/primitives/kyc-status.vo';

describe('UserKycVO — coverage filler', () => {
  it('exposes document + status + submittedAt + verifiedAt getters', () => {
    const vo = UserKycVO.create({
      id: KycIdVO.create('k-1'),
      userId: UserIdVO.create('u-1'),
      document: KycDocumentVO.create('nid'),
      status: KycStatusVO.pending(),
      submittedAt: null,
      verifiedAt: null,
    });
    expect(vo.document.value).toBe('nid');
    expect(vo.status.value).toBe('pending');
    expect(vo.submittedAt).toBeNull();
    expect(vo.verifiedAt).toBeNull();
  });
});
