/**
 * CreateSlaCommand
 * @module support-service/application/commands/sla
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateSlaRequestDTO } from '../../dtos/requests/sla/create-sla.dto';

export class CreateSlaCommand extends BaseCommand {
  readonly type = 'support.sla.create';

  constructor(public readonly payload: CreateSlaRequestDTO) {
    super();
  }
}
