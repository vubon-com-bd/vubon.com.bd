import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateRecurringCommand extends BaseCommand {
  readonly type = 'recurring.create';

  constructor(
    public readonly paymentId: string,
    public readonly frequency: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly nextRunAt: string,
    public readonly maxCycles?: number,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
