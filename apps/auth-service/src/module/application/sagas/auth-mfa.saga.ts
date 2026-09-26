/**
 * AuthMfaSaga — Reacts to MFA enable
 * @module auth-service/application/sagas
 *
 * Flow:
 *   MfaEnabledEvent → SendRecoveryCodeCommand
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { MfaEnabledEvent } from '../../domain/events/auth-mfa.events';
import { SendRecoveryCodeCommand } from './commands/send-recovery-code.command';

@Injectable()
export class AuthMfaSaga extends BaseSaga<void> {
  readonly name = 'AuthMfaSaga';

  @Saga()
  mfaEnabled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MfaEnabledEvent),
      map((event) => {
        const payload = event.payload as { userId: string };
        return new SendRecoveryCodeCommand(
          payload.userId,
          'noreply@vubon.com',
          [],
        );
      }),
    );
  };

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}
}
