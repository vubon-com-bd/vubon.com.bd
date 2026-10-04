import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeactivateBrandCommand extends BaseCommand {
  readonly type = 'brand.deactivate';
  constructor(
    public readonly brandId: string,
    public readonly actorId: string,
  ) { super(); }
}
