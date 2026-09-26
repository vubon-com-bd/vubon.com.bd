import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListMethodsQuery } from './list-methods.query';
import type { PaymentMethodRepository } from '../../../domain/repositories/payment-method.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { MethodResponseDTO } from '../../dtos/responses/method-response.dto';

@QueryHandler(ListMethodsQuery)
export class ListMethodsHandler
  extends BaseQueryHandler<ListMethodsQuery, readonly MethodResponseDTO[]>
  implements IQueryHandler<ListMethodsQuery>
{
  readonly queryType = 'method.list';

  constructor(
    @Inject('PaymentMethodRepository')
    private readonly methodRepo: PaymentMethodRepository,
  ) {
    super();
  }

  async execute(query: ListMethodsQuery): Promise<readonly MethodResponseDTO[]> {
    const entities = await this.methodRepo.findByUserId(UserIdVO.create(query.userId));
    return entities.map((e) => ({
      id: e.id.value,
      type: e.type.value,
      provider: e.provider?.value ?? null,
      cardLast4: e.cardLast4,
      cardBrand: e.cardBrand,
      isDefault: e.isDefault,
      isActive: e.isActive,
      createdAt: e.createdAt,
    }));
  }
}
