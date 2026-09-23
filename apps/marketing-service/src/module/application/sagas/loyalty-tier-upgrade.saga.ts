import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { LoyaltyTierUpgradedEvent } from '../../domain/events/loyalty.events';
import { NotifyTierUpgradedCommand } from './commands/notify-tier-upgraded.command';

@Injectable()
export class LoyaltyTierUpgradeSaga extends BaseSaga {
  readonly name = 'LoyaltyTierUpgradeSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  tierUpgraded = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(LoyaltyTierUpgradedEvent),
      map((event: LoyaltyTierUpgradedEvent) => {
        return new NotifyTierUpgradedCommand(
          event.payload.loyaltyId,
          event.payload.newTier,
        );
      }),
    );
  };
}
