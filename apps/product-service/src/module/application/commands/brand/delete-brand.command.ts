import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeleteBrandCommand extends BaseCommand {
  readonly type = 'brand.delete';
  constructor(
    public readonly brandId: string,
    public readonly actorId: string,
  ) { super(); }
}
