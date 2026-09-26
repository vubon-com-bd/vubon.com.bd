import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetVerificationQuery } from './get-verification.query';
import type { VendorVerificationRepository } from '../../../domain/repositories/vendor-verification.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { VerificationResponseDto } from '../../dtos/responses/verification-response.dto';

@QueryHandler(GetVerificationQuery)
export class GetVerificationHandler
  extends BaseQueryHandler<GetVerificationQuery, VerificationResponseDto>
  implements IQueryHandler<GetVerificationQuery>
{
  readonly queryType = 'vendor.verification.get';

  constructor(private readonly verificationRepo: VendorVerificationRepository) {
    super();
  }

  async execute(query: GetVerificationQuery): Promise<VerificationResponseDto> {
    const verification = await this.verificationRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    if (!verification) throw new VendorNotFoundAppError(query.vendorId);

    return {
      id: verification.id.value,
      vendorId: verification.vendorId.value,
      status: verification.status.value,
      submittedAt: verification.submittedAt?.toISOString() ?? null,
      verifiedAt: verification.verifiedAt?.toISOString() ?? null,
      documentCount: verification.documents.length,
    };
  }
}
