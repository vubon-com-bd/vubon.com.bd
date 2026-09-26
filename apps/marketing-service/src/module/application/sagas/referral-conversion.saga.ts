import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ReferralConvertedEvent } from '../../domain/events/referral.events';
import { NotifyReferralRewardCommand } from './commands/notify-referral-reward.command';

@Injectable()
export class ReferralConversionSaga extends BaseSaga {
  readonly name = 'ReferralConversionSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  referralConverted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReferralConvertedEvent),
      map((event: ReferralConvertedEvent) => {
        return new NotifyReferralRewardCommand(
          event.payload.referralId,
          event.payload.refereeId,
        );
      }),
    );
  };
}
