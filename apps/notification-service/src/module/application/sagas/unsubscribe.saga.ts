/**
 * UnsubscribeSaga — handle user opt-out and channel disable events
 * @module notification-service/application/sagas
 *
 * Flow:
 *   PreferenceOptedOutEvent       → HandleUnsubscribe
 *   PreferenceChannelToggledEvent (enabled=false) → HandleUnsubscribe
 *   PreferenceCategoryToggledEvent (enabled=false) → HandleUnsubscribe
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import {
  PreferenceOptedOutEvent,
  PreferenceChannelToggledEvent,
  PreferenceCategoryToggledEvent,
} from '../../domain/events/preference.events.js';

import { HandleUnsubscribeCommand } from './commands/handle-unsubscribe.command.js';

@Injectable()
export class UnsubscribeSaga {
  private readonly logger = new Logger(UnsubscribeSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onOptedOut = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PreferenceOptedOutEvent),
      tap((e: PreferenceOptedOutEvent) => {
        this.logger.log(
          `User opted out: ${e.payload.userId} scope=${e.payload.scope}`,
        );
      }),
      map((e: PreferenceOptedOutEvent) => {
        return new HandleUnsubscribeCommand(
          e.payload.userId,
          e.payload.scope,
          e.payload.reason,
        );
      }),
    );
  };

  @Saga()
  onChannelToggled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PreferenceChannelToggledEvent),
      filter((e: PreferenceChannelToggledEvent) => !e.payload.enabled),
      map((e: PreferenceChannelToggledEvent) => {
        this.logger.log(
          `Channel disabled: user=${e.payload.userId} channel=${e.payload.channel}`,
        );
        return new HandleUnsubscribeCommand(
          e.payload.userId,
          e.payload.channel,
          'channel_disabled',
        );
      }),
    );
  };

  @Saga()
  onCategoryToggled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PreferenceCategoryToggledEvent),
      filter((e: PreferenceCategoryToggledEvent) => !e.payload.enabled),
      map((e: PreferenceCategoryToggledEvent) => {
        this.logger.log(
          `Category disabled: user=${e.payload.userId} category=${e.payload.category}`,
        );
        return new HandleUnsubscribeCommand(
          e.payload.userId,
          e.payload.category,
          'category_disabled',
        );
      }),
    );
  };
}
