import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateCategoryRequestDTO } from '../../dtos/requests/category/update-category.dto.js';

export class UpdateCategoryCommand extends BaseCommand {
  readonly type = 'category.update';
  constructor(
    public readonly dto: UpdateCategoryRequestDTO,
    public readonly actorId: string,
  ) { super(); }
}
