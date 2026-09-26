import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { EmailCampaignSentEvent } from '../../domain/events/email-marketing.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class EmailAutomationSaga extends BaseSaga {
  readonly name = 'EmailAutomationSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  emailSent = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(EmailCampaignSentEvent),
      map((event: EmailCampaignSentEvent) => {
        return new UpdateAnalyticsCommand(
          'email.sent',
          event.payload.campaignId,
        );
      }),
    );
  };
}
