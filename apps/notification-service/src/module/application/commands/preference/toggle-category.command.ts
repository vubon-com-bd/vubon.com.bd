import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ToggleCategoryRequestDTO } from '../../dtos/requests/preference/preference.dto.js';

export class ToggleCategoryCommand extends BaseCommand {
  readonly type = 'preference.toggle_category';
  constructor(public readonly dto: ToggleCategoryRequestDTO) {
    super();
  }
}
