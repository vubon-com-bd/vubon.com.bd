import { Injectable } from '@nestjs/common';
import { Saga } from '@nestjs/cqrs';
import { Observable, EMPTY } from 'rxjs';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';

@Injectable()
export class NotificationRetrySaga extends BaseSaga {
  readonly name = 'NotificationRetrySaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  onFailure = (): Observable<never> => EMPTY;
}
