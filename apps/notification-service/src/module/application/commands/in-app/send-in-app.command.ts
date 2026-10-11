import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendInAppRequestDTO } from '../../dtos/requests/in-app/in-app.dto.js';

export class SendInAppCommand extends BaseCommand {
  readonly type = 'in_app.send';
  constructor(public readonly dto: SendInAppRequestDTO, public readonly actorId?: string) {
    super();
  }
}
