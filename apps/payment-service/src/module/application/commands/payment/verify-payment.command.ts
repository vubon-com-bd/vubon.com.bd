import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class VerifyPaymentCommand extends BaseCommand {
  readonly type = 'payment.verify';

  constructor(
    public readonly paymentId: string,
    public readonly gatewaySignature?: string,
    public readonly gatewayData?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
