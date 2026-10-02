import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ActivateCategoryCommand extends BaseCommand {
  readonly type = 'category.activate';
  constructor(
    public readonly categoryId: string,
    public readonly actorId: string,
  ) { super(); }
}
