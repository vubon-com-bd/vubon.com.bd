import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateCategoryRequestDTO } from '../../dtos/requests/category/index.js';

export class UpdateCategoryCommand extends BaseCommand {
  readonly type = 'product.category.update';
  constructor(public readonly dto: UpdateCategoryRequestDTO) {
    super();
  }
}
