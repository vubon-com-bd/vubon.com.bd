import { Injectable } from '@nestjs/common';
import { Saga } from '@nestjs/cqrs';
import { Observable, EMPTY } from 'rxjs';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';

@Injectable()
export class DigestGenerationSaga extends BaseSaga {
  readonly name = 'DigestGenerationSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  onDigestGenerated = (): Observable<never> => EMPTY;
}
