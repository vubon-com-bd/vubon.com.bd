import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendTrackingUpdateCommand extends BaseSagaCommand {
  readonly type = 'saga.logistics.send-tracking-update';

  constructor(
    public readonly shipmentId: string,
    public readonly trackingNumber: string,
    public readonly status: string,
  ) {
    super();
  }
}
