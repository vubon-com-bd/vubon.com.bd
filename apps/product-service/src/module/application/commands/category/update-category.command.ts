import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateCategoryCommand extends BaseCommand {
  readonly type = 'product.category.update';

  constructor(
    public readonly categoryId: string,
    public readonly name?: string,
    public readonly parentId?: string | null,
  ) {
    super();
  }
}
