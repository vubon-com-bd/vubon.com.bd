import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class FeatureBrandCommand extends BaseCommand {
  readonly type = 'brand.feature';
  constructor(
    public readonly brandId: string,
    public readonly actorId: string,
  ) { super(); }
}
