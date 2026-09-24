import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { KpiBreachEvent } from '../../domain/events/kpi.events';
import { NotifyKpiBreachCommand } from './commands/notify-kpi-breach.command';

@Injectable()
export class KpiMonitoringSaga extends BaseSaga {
  readonly name = 'KpiMonitoringSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  notifyOnBreach = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(KpiBreachEvent),
      map(
        (event: KpiBreachEvent) =>
          new NotifyKpiBreachCommand(
            event.payload.kpiId,
            event.payload.name,
            event.payload.actual,
            event.payload.target,
          ),
      ),
    );
  };
}
