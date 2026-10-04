import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeleteCategoryCommand extends BaseCommand {
  readonly type = 'category.delete';
  constructor(
    public readonly categoryId: string,
    public readonly actorId: string,
  ) { super(); }
}
