import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthMfaSettingsQuery } from './get-auth-mfa-settings.query';
import type { AuthMfaRepository } from '../../../domain/repositories/auth-mfa.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

export interface MfaSettingsView {
  readonly enabled: boolean;
  readonly method: string | null;
  readonly lastVerifiedAt: string | null;
}

@QueryHandler(GetAuthMfaSettingsQuery)
export class GetAuthMfaSettingsHandler
  extends BaseQueryHandler<GetAuthMfaSettingsQuery, MfaSettingsView>
  implements IQueryHandler<GetAuthMfaSettingsQuery>
{
  readonly queryType = 'auth.get-mfa-settings';

  constructor(@Inject('AuthMfaRepository') private readonly mfaRepo: AuthMfaRepository) {
    super();
  }

  async execute(query: GetAuthMfaSettingsQuery): Promise<MfaSettingsView> {
    const entity = await this.mfaRepo.findByUserId(UserIdVO.create(query.userId));
    if (!entity) {
      return { enabled: false, method: null, lastVerifiedAt: null };
    }
    return {
      enabled: entity.isEnabled,
      method: entity.type.value,
      lastVerifiedAt: entity.lastVerifiedAt?.toISOString() ?? null,
    };
  }
}
