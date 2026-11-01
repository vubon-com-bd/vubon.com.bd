/**
 * User Onboarding Saga
 * @module identity-service/application/sagas
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { UserCreatedEvent } from '../../domain/events/user.events.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class UserOnboardingSaga extends BaseSaga {
  readonly name = 'UserOnboardingSaga';
  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  onboardingSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is UserCreatedEvent => e instanceof UserCreatedEvent),
      mergeMap((event) => {
        const payload = event.payload as { userId: string };
        return [new UpdateAnalyticsCommand('user.onboarded', payload.userId)];
      }),
    );
  };
}
