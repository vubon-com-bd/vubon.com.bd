/**
 * DigestGenerationSaga — generates digests when due
 * @module notification-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  DigestGeneratedEvent,
  DigestSentEvent,
} from '@domain/events/digest.events.js';

import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class DigestGenerationSaga {
  private readonly logger = new Logger(DigestGenerationSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onGenerated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DigestGeneratedEvent),
      tap((e: DigestGeneratedEvent) => {
        this.logger.log(
          `Saga: digest generated → ${e.payload.digestId} (${e.payload.itemCount} items)`,
        );
      }),
      map((e: DigestGeneratedEvent) => {
        return new UpdateAnalyticsCommand(e.payload.digestId, 'digest.generated', {
          itemCount: e.payload.itemCount,
        });
      }),
    );
  };

  @Saga()
  onSent = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DigestSentEvent),
      map((e: DigestSentEvent) => {
        this.logger.log(`Saga: digest sent → ${e.payload.digestId}`);
        return new UpdateAnalyticsCommand(e.payload.digestId, 'digest.sent', {
          itemCount: e.payload.itemCount,
        });
      }),
    );
  };
}
