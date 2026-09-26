import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { LoyaltyPointsEarnedEvent } from '../../domain/events/loyalty.events';
import { NotifyLoyaltyPointsEarnedCommand } from './commands/notify-loyalty-points-earned.command';

@Injectable()
export class LoyaltyPointsExpirySaga extends BaseSaga {
  readonly name = 'LoyaltyPointsExpirySaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  pointsEarned = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(LoyaltyPointsEarnedEvent),
      map((event: LoyaltyPointsEarnedEvent) => {
        return new NotifyLoyaltyPointsEarnedCommand(
          event.payload.loyaltyId,
          event.payload.points,
        );
      }),
    );
  };
}
