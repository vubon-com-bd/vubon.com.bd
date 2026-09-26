import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetVerificationQuery } from './get-verification.query';
import type { VerificationRepository } from '../../../domain/repositories/verification.repository.interface';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';
import { VerificationOperationFailedError } from '../../errors/verification.errors';

@QueryHandler(GetVerificationQuery)
export class GetVerificationHandler
  extends BaseQueryHandler<GetVerificationQuery, Readonly<Record<string, unknown>> | null>
  implements IQueryHandler<GetVerificationQuery>
{
  readonly queryType = 'verification.get';
  constructor(
    @Inject('VerificationRepository')
    private readonly repo: VerificationRepository,
  ) { super(); }

  async execute(query: GetVerificationQuery): Promise<Readonly<Record<string, unknown>> | null> {
    const entity = await this.repo.findByPaymentId(PaymentIdVO.create(query.paymentId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      paymentId: entity.paymentId.value,
      status: entity.status.value,
      method: entity.method.value,
    };
  }
}
