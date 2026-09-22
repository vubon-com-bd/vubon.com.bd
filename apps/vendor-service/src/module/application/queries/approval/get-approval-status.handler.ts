import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetApprovalStatusQuery } from './get-approval-status.query';
import type { VendorApprovalRepository } from '../../../domain/repositories/vendor-approval.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { ApprovalResponseDto } from '../../dtos/responses/approval-response.dto';

@QueryHandler(GetApprovalStatusQuery)
export class GetApprovalStatusHandler
  extends BaseQueryHandler<GetApprovalStatusQuery, ApprovalResponseDto>
  implements IQueryHandler<GetApprovalStatusQuery>
{
  readonly queryType = 'vendor.approval.get-status';

  constructor(private readonly approvalRepo: VendorApprovalRepository) {
    super();
  }

  async execute(query: GetApprovalStatusQuery): Promise<ApprovalResponseDto> {
    const approval = await this.approvalRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    if (!approval) throw new VendorNotFoundAppError(query.vendorId);

    return {
      id: approval.id.value,
      vendorId: approval.vendorId.value,
      status: approval.status.value,
      reason: approval.reason?.value ?? null,
      reviewedBy: approval.reviewedBy?.value ?? null,
      reviewedAt: approval.reviewedAt?.toISOString() ?? null,
    };
  }
}
