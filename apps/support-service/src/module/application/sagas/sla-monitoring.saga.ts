import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { SlaBreachedEvent } from '../../domain/events/sla.events';
import { TriggerSlaAlertCommand } from './commands/trigger-sla-alert.command';

@Injectable()
export class SlaMonitoringSaga extends BaseSaga {
  readonly name = 'SlaMonitoringSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  alert = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SlaBreachedEvent),
      map((event: SlaBreachedEvent) => {
        return new TriggerSlaAlertCommand(event.payload.ticketId, event.payload.slaId);
      }),
    );
  };
}
