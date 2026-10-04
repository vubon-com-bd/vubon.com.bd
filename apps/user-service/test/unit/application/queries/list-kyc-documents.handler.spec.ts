import { ListKycDocumentsHandler } from '@application/queries/kyc/list-kyc-documents.handler';
import { ListKycDocumentsQuery } from '@application/queries/kyc/list-kyc-documents.query';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { createUserKycRepositoryMock } from '../../../helpers/user-repository.mock';

describe('ListKycDocumentsHandler', () => {
  let handler: ListKycDocumentsHandler;
  let kycRepo: ReturnType<typeof createUserKycRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    kycRepo = createUserKycRepositoryMock();
    handler = new ListKycDocumentsHandler(kycRepo);
  });

  it('should return empty list when no documents', async () => {
    kycRepo.findAllByUserId.mockResolvedValue([]);
    const result = await handler.execute(new ListKycDocumentsQuery('user-1'));
    expect(result.items.length).toBe(0);
  });

  it('should map documents to DTOs', async () => {
    const kyc = UserKycEntity.create({
      kycId: KycIdVO.create('kyc-1'),
      userId: UserIdVO.create('user-1'),
      document: KycDocumentVO.create('nid'),
      now,
    });
    kycRepo.findAllByUserId.mockResolvedValue([kyc]);

    const result = await handler.execute(new ListKycDocumentsQuery('user-1'));
    expect(result.items.length).toBe(1);
  });
});
