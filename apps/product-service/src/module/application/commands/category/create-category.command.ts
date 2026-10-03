import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateCategoryRequestDTO } from '../../dtos/requests/category/create-category.dto.js';

export class CreateCategoryCommand extends BaseCommand {
  readonly type = 'category.create';
  constructor(
    public readonly dto: CreateCategoryRequestDTO,
    public readonly actorId: string,
  ) { super(); }
}
