import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateWarrantyCommand extends BaseCommand {
  readonly type = 'vendor.warranty.update';

  constructor(
    public readonly vendorId: string,
    public readonly warrantyType: string,
    public readonly durationDays: number,
    public readonly terms?: string,
  ) {
    super();
  }
}
