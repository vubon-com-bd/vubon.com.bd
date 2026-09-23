import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyAffiliateApprovedCommand extends BaseSagaCommand {
  readonly type = 'marketing.saga.notify-affiliate-approved';

  constructor(public readonly affiliateId: string) {
    super();
  }
}
