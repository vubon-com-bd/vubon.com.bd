import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeactivateCategoryCommand extends BaseCommand {
  readonly type = 'category.deactivate';
  constructor(
    public readonly categoryId: string,
    public readonly actorId: string,
  ) { super(); }
}
