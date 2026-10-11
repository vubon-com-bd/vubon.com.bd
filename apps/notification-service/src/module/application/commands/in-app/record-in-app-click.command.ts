import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { InAppClickRequestDTO } from '../../dtos/requests/in-app/in-app.dto.js';

export class RecordInAppClickCommand extends BaseCommand {
  readonly type = 'in_app.record_click';
  constructor(public readonly dto: InAppClickRequestDTO) {
    super();
  }
}
