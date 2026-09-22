import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetKycStatusQuery } from './get-kyc-status.query';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto';

@QueryHandler(GetKycStatusQuery)
export class GetKycStatusHandler
  extends BaseQueryHandler<GetKycStatusQuery, KycResponseDTO | null>
  implements IQueryHandler<GetKycStatusQuery>
{
  readonly queryType = 'user.kyc.get-status';

  constructor(private readonly kycService: UserKycServiceInterface) {
    super();
  }

  async execute(query: GetKycStatusQuery): Promise<KycResponseDTO | null> {
    return this.kycService.findByUserId(query.userId);
  }
}
