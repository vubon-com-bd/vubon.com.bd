import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthRecoveryCodesQuery } from './get-auth-recovery-codes.query.js';
import type { AuthRecoveryCodeRepository } from '../../../domain/repositories/auth-recovery-code.repository.interface.js';
import { AUTH_RECOVERY_CODE_REPOSITORY } from '../../../domain/repositories/auth-recovery-code.repository.interface.js';

export interface RecoveryCodesCountDTO {
  readonly total: number;
  readonly remaining: number;
  readonly used: number;
}

@QueryHandler(GetAuthRecoveryCodesQuery)
export class GetAuthRecoveryCodesHandler
  extends BaseQueryHandler<GetAuthRecoveryCodesQuery, RecoveryCodesCountDTO>
  implements IQueryHandler<GetAuthRecoveryCodesQuery>
{
  readonly queryType = 'auth.get-recovery-codes';
  constructor(@Inject(AUTH_RECOVERY_CODE_REPOSITORY) private readonly repo: AuthRecoveryCodeRepository) { super(); }

  async execute(query: GetAuthRecoveryCodesQuery): Promise<RecoveryCodesCountDTO> {
    const codes = await this.repo.findByAuthId({ value: query.authId } as never);
    const used = codes.filter((c) => c.isUsed()).length;
    return {
      total: codes.length,
      remaining: codes.length - used,
      used,
    };
  }
}
