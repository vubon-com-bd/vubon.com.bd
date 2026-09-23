import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { LeadCreatedEvent } from '../../domain/events/lead.events';
import { SendCartRecoveryEmailCommand } from './commands/send-cart-recovery-email.command';

@Injectable()
export class AbandonedCartRecoverySaga extends BaseSaga {
  readonly name = 'AbandonedCartRecoverySaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  cartAbandoned = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(LeadCreatedEvent),
      map((event: LeadCreatedEvent) => {
        return new SendCartRecoveryEmailCommand(event.payload.leadId);
      }),
    );
  };
}
