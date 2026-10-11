import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { OptOutRequestDTO } from '../../dtos/requests/preference/preference.dto.js';

export class OptOutCommand extends BaseCommand {
  readonly type = 'preference.opt_out';
  constructor(public readonly dto: OptOutRequestDTO) {
    super();
  }
}
