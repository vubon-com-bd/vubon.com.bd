import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ClaimInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.claim';

  constructor(
    public readonly insuranceId: string,
    public readonly amount: number,
    public readonly reason: string,
  ) {
    super();
  }
}
