import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { MfaEnabledEvent } from '../../domain/events/auth-mfa.events';
import { SendRecoveryCodeCommand } from './commands/send-recovery-code.command';

@Injectable()
export class AuthMfaSaga extends BaseSaga {
  readonly name = 'AuthMfaSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  recoveryCodes = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MfaEnabledEvent),
      map((event: MfaEnabledEvent) => {
        return new SendRecoveryCodeCommand(event.payload.userId);
      }),
    );
  };
}
