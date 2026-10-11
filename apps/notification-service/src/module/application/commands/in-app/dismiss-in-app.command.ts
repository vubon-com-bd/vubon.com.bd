import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DismissInAppRequestDTO } from '../../dtos/requests/in-app/in-app.dto.js';

export class DismissInAppCommand extends BaseCommand {
  readonly type = 'in_app.dismiss';
  constructor(public readonly dto: DismissInAppRequestDTO) {
    super();
  }
}
