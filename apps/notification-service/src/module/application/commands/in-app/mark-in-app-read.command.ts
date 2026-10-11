import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkInAppReadRequestDTO } from '../../dtos/requests/in-app/in-app.dto.js';

export class MarkInAppReadCommand extends BaseCommand {
  readonly type = 'in_app.mark_read';
  constructor(public readonly dto: MarkInAppReadRequestDTO) {
    super();
  }
}
