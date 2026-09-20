import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthRecoveryCodesQuery } from './get-auth-recovery-codes.query';
import type { AuthRecoveryCodeRepository } from '../../../domain/repositories/auth-recovery-code.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

export interface RecoveryCodesStatusView {
  readonly total: number;
  readonly remaining: number;
}

@QueryHandler(GetAuthRecoveryCodesQuery)
export class GetAuthRecoveryCodesHandler
  extends BaseQueryHandler<GetAuthRecoveryCodesQuery, RecoveryCodesStatusView>
  implements IQueryHandler<GetAuthRecoveryCodesQuery>
{
  readonly queryType = 'auth.get-recovery-codes';

  constructor(@Inject('AuthRecoveryCodeRepository') private readonly recoveryRepo: AuthRecoveryCodeRepository) {
    super();
  }

  async execute(query: GetAuthRecoveryCodesQuery): Promise<RecoveryCodesStatusView> {
    const all = await this.recoveryRepo.findByUserId(UserIdVO.create(query.userId));
    const remaining = all.filter((c) => !c.isUsed).length;
    return { total: all.length, remaining };
  }
}
