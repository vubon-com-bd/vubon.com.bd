import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { InsuranceClaimedEvent } from '../../domain/events/insurance.events';
import { NotifyCustomerCommand } from './commands/notify-customer.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class InsuranceClaimSaga extends BaseSaga {
  readonly name = 'InsuranceClaimSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  claimed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(InsuranceClaimedEvent),
      map((event: InsuranceClaimedEvent) => {
        return new NotifyCustomerCommand('', 'insurance-claimed', `Claim processed: ${event.payload.amount}`);
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(InsuranceClaimedEvent),
      map((event: InsuranceClaimedEvent) => {
        return new UpdateAnalyticsCommand('insurance.claimed', event.payload.shipmentId);
      }),
    );
  };
}
