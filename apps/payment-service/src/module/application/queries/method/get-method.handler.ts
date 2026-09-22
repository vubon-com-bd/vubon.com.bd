import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetMethodQuery } from './get-method.query';
import type { PaymentMethodRepository } from '../../../domain/repositories/payment-method.repository.interface';
import { PaymentMethodIdVO } from '../../../domain/value-objects/primitives/payment-method-id.vo';
import type { MethodResponseDTO } from '../../dtos/responses/method-response.dto';
import { MethodOperationFailedError } from '../../errors/method.errors';

@QueryHandler(GetMethodQuery)
export class GetMethodHandler
  extends BaseQueryHandler<GetMethodQuery, MethodResponseDTO>
  implements IQueryHandler<GetMethodQuery>
{
  readonly queryType = 'method.get';

  constructor(
    @Inject('PaymentMethodRepository')
    private readonly methodRepo: PaymentMethodRepository,
  ) {
    super();
  }

  async execute(query: GetMethodQuery): Promise<MethodResponseDTO> {
    const entity = await this.methodRepo.findById(
      PaymentMethodIdVO.create(query.methodId),
    );
    if (!entity) {
      throw new MethodOperationFailedError('method not found');
    }
    return {
      id: entity.id.value,
      type: entity.type.value,
      provider: entity.provider?.value ?? null,
      cardLast4: entity.cardLast4,
      cardBrand: entity.cardBrand,
      isDefault: entity.isDefault,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    };
  }
}
