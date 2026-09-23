import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import {
  CampaignLaunchedEvent,
  CampaignCompletedEvent,
} from '../../domain/events/campaign.events';
import { NotifyCampaignLaunchedCommand } from './commands/notify-campaign-launched.command';
import { NotifyCampaignCompletedCommand } from './commands/notify-campaign-completed.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class CampaignLifecycleSaga extends BaseSaga {
  readonly name = 'CampaignLifecycleSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  campaignLaunched = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CampaignLaunchedEvent),
      map((event: CampaignLaunchedEvent) => {
        return new NotifyCampaignLaunchedCommand(event.payload.campaignId);
      }),
    );
  };

  @Saga()
  campaignCompleted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CampaignCompletedEvent),
      map((event: CampaignCompletedEvent) => {
        return new NotifyCampaignCompletedCommand(event.payload.campaignId);
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CampaignLaunchedEvent),
      map((event: CampaignLaunchedEvent) => {
        return new UpdateAnalyticsCommand('campaign.launched', event.payload.campaignId);
      }),
    );
  };
}
