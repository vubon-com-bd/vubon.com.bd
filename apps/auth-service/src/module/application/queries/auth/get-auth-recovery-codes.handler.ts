import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthRecoveryCodesQuery } from './get-auth-recovery-codes.query';
import type { AuthRecoveryCodeRepository } from '../../../domain/repositories/auth-recovery-code.repository.interface';
import { AUTH_RECOVERY_CODE_REPO } from '../../tokens';

export interface RecoveryCodeSummaryDTO {
  readonly id: string;
  readonly masked: string;
  readonly status: string;
  readonly createdAt: string;
}

@QueryHandler(GetAuthRecoveryCodesQuery)
export class GetAuthRecoveryCodesHandler
  extends BaseQueryHandler<GetAuthRecoveryCodesQuery, readonly RecoveryCodeSummaryDTO[]>
  implements IQueryHandler<GetAuthRecoveryCodesQuery> {
  readonly queryType = 'GetAuthRecoveryCodesQuery';
  constructor(
    @Inject(AUTH_RECOVERY_CODE_REPO)
    private readonly repo: AuthRecoveryCodeRepository,
  ) { super(); }

  async execute(
    query: GetAuthRecoveryCodesQuery,
  ): Promise<readonly RecoveryCodeSummaryDTO[]> {
    const codes = await this.repo.findByUserId(query.userId);
    return codes.map((c) => ({
      id: c.id,
      masked: c.code.masked,
      status: c.status.value,
      createdAt: c.createdAt,
    }));
  }
}
