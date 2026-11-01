import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AppealSuspensionRequestDTO } from '../../dtos/requests/suspension/index.js';

export class AppealSuspensionCommand extends BaseCommand {
  readonly type = 'vendor.suspension.appeal';
  constructor(
    public readonly dto: AppealSuspensionRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
