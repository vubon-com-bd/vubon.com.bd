/**
 * Auth Social Saga
 * @module identity-service/application/sagas
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { SocialAccountLinkedEvent } from '../../domain/events/social.events.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class AuthSocialSaga extends BaseSaga {
  readonly name = 'AuthSocialSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  socialLinkedSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is SocialAccountLinkedEvent => e instanceof SocialAccountLinkedEvent),
      mergeMap((event) => {
        const payload = event.payload as { userId: string; provider: string };
        return [
          new UpdateAnalyticsCommand('auth.social_linked', payload.userId, {
            provider: payload.provider,
          }),
        ];
      }),
    );
  };
}
