import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class AddWarrantyExclusionCommand extends BaseCommand {
  readonly type = 'vendor.warranty.add_exclusion';
  constructor(
    public readonly vendorId: string,
    public readonly term: string,
    public readonly actorId?: string,
  ) { super(); }
}
