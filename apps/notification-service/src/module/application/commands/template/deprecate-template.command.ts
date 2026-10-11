import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeprecateTemplateRequestDTO } from '../../dtos/requests/template/template.dto.js';

export class DeprecateTemplateCommand extends BaseCommand {
  readonly type = 'template.deprecate';
  constructor(public readonly dto: DeprecateTemplateRequestDTO, public readonly actorId?: string) {
    super();
  }
}
