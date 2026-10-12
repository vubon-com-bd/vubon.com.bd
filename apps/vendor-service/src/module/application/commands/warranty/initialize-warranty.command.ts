import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class InitializeWarrantyCommand extends BaseCommand {
  readonly type = 'vendor.warranty.initialize';
  constructor(
    public readonly vendorId: string,
    public readonly actorId?: string,
  ) { super(); }
}
