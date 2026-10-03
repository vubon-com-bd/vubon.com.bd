import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class MoveCategoryCommand extends BaseCommand {
  readonly type = 'category.move';
  constructor(
    public readonly categoryId: string,
    public readonly newParentId: string | null,
    public readonly actorId: string,
  ) { super(); }
}
