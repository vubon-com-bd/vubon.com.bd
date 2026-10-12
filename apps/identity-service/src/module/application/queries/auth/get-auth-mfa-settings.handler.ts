import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthMfaSettingsQuery } from './get-auth-mfa-settings.query.js';
import type { MfaResponseDTO } from '../../dtos/responses/mfa-response.dto.js';
import type { MfaRepository } from '../../../domain/repositories/mfa.repository.interface.js';
import { MFA_REPOSITORY } from '../../../domain/repositories/mfa.repository.interface.js';

@QueryHandler(GetAuthMfaSettingsQuery)
export class GetAuthMfaSettingsHandler
  extends BaseQueryHandler<GetAuthMfaSettingsQuery, MfaResponseDTO>
  implements IQueryHandler<GetAuthMfaSettingsQuery>
{
  readonly queryType = 'auth.get-mfa-settings';
  constructor(@Inject(MFA_REPOSITORY) private readonly repo: MfaRepository) { super(); }

  async execute(query: GetAuthMfaSettingsQuery): Promise<MfaResponseDTO> {
    const mfa = await this.repo.findPrimaryByAuthId({ value: query.authId } as never);
    if (!mfa) return { success: true, enabled: false };
    return {
      success: true,
      enabled: mfa.isEnabledAndVerified(),
      primaryMethod: mfa.method.value,
    };
  }
}
