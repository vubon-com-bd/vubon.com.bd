/**
 * UpdateSlaCommand
 * @module support-service/application/commands/sla
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateSlaRequestDTO } from '../../dtos/requests/sla/update-sla.dto';

export class UpdateSlaCommand extends BaseCommand {
  readonly type = 'support.sla.update';

  constructor(public readonly payload: UpdateSlaRequestDTO) {
    super();
  }
}
