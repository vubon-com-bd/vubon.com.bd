import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserKycStatusQuery } from './get-user-kyc-status.query';
import type { UserKycRepository } from '../../../domain/repositories/user-kyc.repository.interface';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(GetUserKycStatusQuery)
export class GetUserKycStatusHandler
  extends BaseQueryHandler<GetUserKycStatusQuery, UserKycResponseDTO | null>
  implements IQueryHandler<GetUserKycStatusQuery>
{
  readonly queryType = 'user.get-kyc-status';

  constructor(@Inject('UserKycRepository') private readonly kycRepo: UserKycRepository) {
    super();
  }

  async execute(query: GetUserKycStatusQuery): Promise<UserKycResponseDTO | null> {
    const entity = await this.kycRepo.findByUserId(UserIdVO.create(query.userId));
    if (!entity) return null;
    return {
      success: true,
      kyc: {
        userId: entity.userId.value,
        status: entity.status,
        level: entity.isVerified ? 2 : 0,
        documents: [
          {
            id: entity.userId.value,
            type: entity.documentType,
            frontUrl: entity.documentUrl,
            number: entity.documentNumber,
            uploadedAt: entity.submittedAt?.toISOString() ?? new Date().toISOString(),
            verified: entity.isVerified,
          },
        ],
        submittedAt: entity.submittedAt?.toISOString() ?? undefined,
        reviewedAt: entity.reviewedAt?.toISOString() ?? undefined,
        rejectionReason: entity.rejectionReason ?? undefined,
        updatedAt: entity.updatedAt,
      },
    };
  }
}
