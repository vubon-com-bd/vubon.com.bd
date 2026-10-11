import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { OptInRequestDTO } from '../../dtos/requests/preference/preference.dto.js';

export class OptInCommand extends BaseCommand {
  readonly type = 'preference.opt_in';
  constructor(public readonly dto: OptInRequestDTO) {
    super();
  }
}
