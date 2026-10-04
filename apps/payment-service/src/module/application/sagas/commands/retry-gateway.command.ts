import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RetryGatewayCommand extends BaseCommand {
  readonly type = 'saga.retry_gateway';
  constructor(
    public readonly paymentId: string,
    public readonly attempt: number,
    public readonly delayMs: number,
  ) {
    super();
  }
}
