import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateCategoryCommand extends BaseCommand {
  readonly type = 'product.category.create';

  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly parentId?: string | null,
  ) {
    super();
  }
}
