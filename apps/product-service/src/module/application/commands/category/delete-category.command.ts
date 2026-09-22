import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteCategoryCommand extends BaseCommand {
  readonly type = 'product.category.delete';

  constructor(public readonly categoryId: string) {
    super();
  }
}
