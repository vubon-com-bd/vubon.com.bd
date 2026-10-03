import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ActivateBrandCommand extends BaseCommand {
  readonly type = 'brand.activate';
  constructor(
    public readonly brandId: string,
    public readonly actorId: string,
  ) { super(); }
}
