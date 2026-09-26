/**
 * AuthSocialSaga — Reacts to social link
 * @module auth-service/application/sagas
 *
 * Flow:
 *   SocialLinkedEvent → UpdateAnalyticsCommand
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { SocialLinkedEvent } from '../../domain/events/auth-social.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class AuthSocialSaga extends BaseSaga<void> {
  readonly name = 'AuthSocialSaga';

  @Saga()
  socialLinked = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SocialLinkedEvent),
      map((event) => {
        const payload = event.payload as {
          userId: string;
          provider: string;
        };
        return new UpdateAnalyticsCommand('social_linked', payload.userId, {
          provider: payload.provider,
        });
      }),
    );
  };

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}
}
