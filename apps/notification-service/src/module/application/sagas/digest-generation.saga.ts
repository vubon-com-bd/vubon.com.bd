/**
 * DigestGenerationSaga — orchestrate digest send
 * @module notification-service/application/sagas
 *
 * Flow:
 *   DigestReadyEvent     → SendDigestSaga
 *   DigestSentEvent      → (log)
 *   DigestFailedEvent    → (log)
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  DigestReadyEvent,
  DigestSentEvent,
  DigestFailedEvent,
} from '../../domain/events/digest.events.js';

import { SendDigestSagaCommand } from './commands/send-digest-saga.command.js';

@Injectable()
export class DigestGenerationSaga {
  private readonly logger = new Logger(DigestGenerationSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onDigestReady = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DigestReadyEvent),
      tap((e: DigestReadyEvent) => {
        this.logger.log(
          `Digest ready: ${e.payload.digestId} — ${e.payload.itemCount} items`,
        );
      }),
      map((e: DigestReadyEvent) => {
        return new SendDigestSagaCommand(
          e.payload.digestId,
          'system',
          e.payload.itemCount,
        );
      }),
    );
  };

  @Saga()
  onDigestSent = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DigestSentEvent),
      tap((e: DigestSentEvent) => {
        this.logger.log(
          `Digest sent: ${e.payload.digestId} via ${e.payload.channel}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onDigestFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DigestFailedEvent),
      tap((e: DigestFailedEvent) => {
        this.logger.error(
          `Digest failed: ${e.payload.digestId} — ${e.payload.reason}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };
}
