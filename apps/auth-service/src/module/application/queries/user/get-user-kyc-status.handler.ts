import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserKycStatusQuery } from './get-user-kyc-status.query';
import type { UserKycRepository } from '../../../domain/repositories/user-kyc.repository.interface';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto';
import { USER_KYC_REPO } from '../../tokens';

@QueryHandler(GetUserKycStatusQuery)
export class GetUserKycStatusHandler
  extends BaseQueryHandler<GetUserKycStatusQuery, UserKycResponseDTO | null>
  implements IQueryHandler<GetUserKycStatusQuery> {
  readonly queryType = 'GetUserKycStatusQuery';
  constructor(
    @Inject(USER_KYC_REPO) private readonly repo: UserKycRepository,
  ) { super(); }

  async execute(
    query: GetUserKycStatusQuery,
  ): Promise<UserKycResponseDTO | null> {
    const k = await this.repo.findByUserId(query.userId);
    if (!k) return null;
    const doc = k.documentNumber;
    const masked = doc.length > 4 ? `****${doc.slice(-4)}` : '****';
    return {
      id: k.id,
      userId: k.userId,
      status: k.status,
      documentType: k.documentType as never,
      documentNumberMasked: masked,
    };
  }
}
