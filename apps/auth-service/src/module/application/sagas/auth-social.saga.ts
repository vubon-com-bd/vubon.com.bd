import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { SocialLinkedEvent } from '../../domain/events/auth-social.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class AuthSocialSaga extends BaseSaga {
  readonly name = 'AuthSocialSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SocialLinkedEvent),
      map((event: SocialLinkedEvent) => {
        return new UpdateAnalyticsCommand('auth.social.linked', event.payload.userId);
      }),
    );
  };
}
