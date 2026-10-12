import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthAccountLockStatusQuery } from './get-auth-account-lock-status.query.js';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto.js';
import type { AuthAccountLockServiceInterface } from '../../services/interfaces/auth-account-lock.service.interface.js';
import { AUTH_ACCOUNT_LOCK_SERVICE } from '../../services/interfaces/auth-account-lock.service.interface.js';

@QueryHandler(GetAuthAccountLockStatusQuery)
export class GetAuthAccountLockStatusHandler
  extends BaseQueryHandler<GetAuthAccountLockStatusQuery, AuthAccountLockResponseDTO>
  implements IQueryHandler<GetAuthAccountLockStatusQuery>
{
  readonly queryType = 'auth.get-lock-status';
  constructor(@Inject(AUTH_ACCOUNT_LOCK_SERVICE) private readonly service: AuthAccountLockServiceInterface) { super(); }

  async execute(query: GetAuthAccountLockStatusQuery): Promise<AuthAccountLockResponseDTO> {
    return this.service.getStatus(query.userId);
  }
}
