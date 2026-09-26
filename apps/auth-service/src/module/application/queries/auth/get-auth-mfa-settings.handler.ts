import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthMfaSettingsQuery } from './get-auth-mfa-settings.query';
import type { AuthMfaRepository } from '../../../domain/repositories/auth-mfa.repository.interface';
import type { MfaResponseDTO } from '../../dtos/responses/mfa-response.dto';
import { AUTH_MFA_REPO } from '../../tokens';

@QueryHandler(GetAuthMfaSettingsQuery)
export class GetAuthMfaSettingsHandler
  extends BaseQueryHandler<GetAuthMfaSettingsQuery, MfaResponseDTO>
  implements IQueryHandler<GetAuthMfaSettingsQuery> {
  readonly queryType = 'GetAuthMfaSettingsQuery';
  constructor(
    @Inject(AUTH_MFA_REPO) private readonly repo: AuthMfaRepository,
  ) { super(); }

  async execute(query: GetAuthMfaSettingsQuery): Promise<MfaResponseDTO> {
    const mfa = await this.repo.findByUserId(query.userId);
    if (!mfa) return { enabled: false, type: 'none' };
    return {
      enabled: mfa.isEnabled(),
      type: mfa.type.value,
    };
  }
}
