import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateTemplateRequestDTO } from '../../dtos/requests/template/template.dto.js';

export class ActivateTemplateCommand extends BaseCommand {
  readonly type = 'template.activate';
  constructor(public readonly dto: ActivateTemplateRequestDTO, public readonly actorId?: string) {
    super();
  }
}
