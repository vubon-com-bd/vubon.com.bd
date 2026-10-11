import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RenderTemplateRequestDTO } from '../../dtos/requests/template/template.dto.js';

export class RenderTemplateCommand extends BaseCommand {
  readonly type = 'template.render';
  constructor(public readonly dto: RenderTemplateRequestDTO) {
    super();
  }
}
