import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SelectPackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.select';

  constructor(
    public readonly weightKg: number,
    public readonly dimensions?: string,
  ) {
    super();
  }
}
