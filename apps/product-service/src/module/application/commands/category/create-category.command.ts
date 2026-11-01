import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateCategoryRequestDTO } from '../../dtos/requests/category/index.js';

export class CreateCategoryCommand extends BaseCommand {
  readonly type = 'product.category.create';
  constructor(public readonly dto: CreateCategoryRequestDTO) {
    super();
  }
}
