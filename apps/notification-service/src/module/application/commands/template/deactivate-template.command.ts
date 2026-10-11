import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateTemplateRequestDTO } from '../../dtos/requests/template/template.dto.js';

export class DeactivateTemplateCommand extends BaseCommand {
  readonly type = 'template.deactivate';
  constructor(public readonly dto: DeactivateTemplateRequestDTO, public readonly actorId?: string) {
    super();
  }
}
