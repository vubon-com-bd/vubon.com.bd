import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserKycStatusQuery } from './get-user-kyc-status.query.js';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto.js';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface.js';
import { USER_KYC_SERVICE } from '../../services/interfaces/user-kyc.service.interface.js';

@QueryHandler(GetUserKycStatusQuery)
export class GetUserKycStatusHandler
  extends BaseQueryHandler<GetUserKycStatusQuery, UserKycResponseDTO | null>
  implements IQueryHandler<GetUserKycStatusQuery>
{
  readonly queryType = 'user.get-kyc-status';
  constructor(@Inject(USER_KYC_SERVICE) private readonly service: UserKycServiceInterface) { super(); }
  async execute(q: GetUserKycStatusQuery): Promise<UserKycResponseDTO | null> { return this.service.findForUser(q.userId); }
}
