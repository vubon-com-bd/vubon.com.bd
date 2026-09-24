import { Injectable } from '@nestjs/common';
import { Saga } from '@nestjs/cqrs';
import { Observable, EMPTY } from 'rxjs';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';

@Injectable()
export class ScheduleTriggerSaga extends BaseSaga {
  readonly name = 'ScheduleTriggerSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  onScheduleTriggered = (): Observable<never> => EMPTY;
}
