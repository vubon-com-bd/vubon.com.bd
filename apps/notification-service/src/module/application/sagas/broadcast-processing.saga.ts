/**
 * BroadcastProcessingSaga — orchestrate broadcast batches
 * @module notification-service/application/sagas
 *
 * Flow:
 *   BroadcastStartedEvent          → ProcessBroadcastBatch
 *   BroadcastProgressEvent         → (log)
 *   BroadcastCompletedEvent        → (log)
 *   BroadcastPartiallyCompletedEvent → (log)
 *   BroadcastFailedEvent           → (log)
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NOTIFICATION_BROADCAST } from '@vubon/shared-constants/platform/notification';

import {
  BroadcastStartedEvent,
  BroadcastProgressEvent,
  BroadcastCompletedEvent,
  BroadcastPartiallyCompletedEvent,
  BroadcastFailedEvent,
} from '../../domain/events/broadcast.events.js';

import { ProcessBroadcastBatchCommand } from './commands/process-broadcast-batch.command.js';

@Injectable()
export class BroadcastProcessingSaga {
  private readonly logger = new Logger(BroadcastProcessingSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onBroadcastStarted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(BroadcastStartedEvent),
      tap((e: BroadcastStartedEvent) => {
        this.logger.log(
          `Broadcast started: ${e.payload.broadcastId} — ${e.payload.totalRecipients} recipients`,
        );
      }),
      map((e: BroadcastStartedEvent) => {
        return new ProcessBroadcastBatchCommand(
          e.payload.broadcastId,
          NOTIFICATION_BROADCAST.BATCH_SIZE,
        );
      }),
    );
  };

  @Saga()
  onBroadcastProgress = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(BroadcastProgressEvent),
      tap((e: BroadcastProgressEvent) => {
        this.logger.debug(
          `Broadcast progress: ${e.payload.broadcastId} — ${e.payload.processed}/${e.payload.total} (${e.payload.succeeded} ok, ${e.payload.failed} failed)`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onBroadcastCompleted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(BroadcastCompletedEvent),
      tap((e: BroadcastCompletedEvent) => {
        this.logger.log(
          `Broadcast completed: ${e.payload.broadcastId} — ${e.payload.succeeded}/${e.payload.totalRecipients} succeeded`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onBroadcastPartiallyCompleted = (
    events$: Observable<unknown>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(BroadcastPartiallyCompletedEvent),
      tap((e: BroadcastPartiallyCompletedEvent) => {
        this.logger.warn(
          `Broadcast partially completed: ${e.payload.broadcastId} — failed=${e.payload.failed}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onBroadcastFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(BroadcastFailedEvent),
      tap((e: BroadcastFailedEvent) => {
        this.logger.error(
          `Broadcast failed: ${e.payload.broadcastId} — ${e.payload.reason}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };
}
