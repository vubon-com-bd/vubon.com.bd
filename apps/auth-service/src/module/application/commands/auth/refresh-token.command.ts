import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RefreshTokenRequestDTO } from '../../dtos/requests/auth/refresh-token.dto';

export class RefreshTokenCommand extends BaseCommand {
  readonly type = 'auth.refresh-token';
  constructor(public readonly input: RefreshTokenRequestDTO) { super(); }
}
