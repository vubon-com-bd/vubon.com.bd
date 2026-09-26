import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { AffiliateApprovedEvent } from '../../domain/events/affiliate.events';
import { NotifyAffiliateApprovedCommand } from './commands/notify-affiliate-approved.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class AffiliateAttributionSaga extends BaseSaga {
  readonly name = 'AffiliateAttributionSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  affiliateApproved = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AffiliateApprovedEvent),
      map((event: AffiliateApprovedEvent) => {
        return new NotifyAffiliateApprovedCommand(event.payload.affiliateId);
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AffiliateApprovedEvent),
      map((event: AffiliateApprovedEvent) => {
        return new UpdateAnalyticsCommand('affiliate.approved', event.payload.affiliateId);
      }),
    );
  };
}
