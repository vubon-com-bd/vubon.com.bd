/**
 * Auth MFA Saga
 * @module identity-service/application/sagas
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import {
  AuthMfaEnabledEvent,
  AuthMfaDisabledEvent,
} from '../../domain/events/auth.events.js';
import { NotifySecurityEventCommand } from './commands/notify-security-event.command.js';
import { SendMfaDisabledAlertCommand } from './commands/send-mfa-disabled-alert.command.js';

@Injectable()
export class AuthMfaSaga extends BaseSaga {
  readonly name = 'AuthMfaSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  mfaEnabledSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is AuthMfaEnabledEvent => e instanceof AuthMfaEnabledEvent),
      mergeMap((event) => {
        const payload = event.payload as { authId: string; method: string };
        return [
          new NotifySecurityEventCommand(payload.authId, 'mfa.enabled', {
            method: payload.method,
          }),
        ];
      }),
    );
  };

  @Saga()
  mfaDisabledSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is AuthMfaDisabledEvent => e instanceof AuthMfaDisabledEvent),
      mergeMap((event) => {
        const payload = event.payload as { authId: string };
        return [new SendMfaDisabledAlertCommand(payload.authId, payload.authId)];
      }),
    );
  };
}
