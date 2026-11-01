/**
 * ListMethodsHandler
 * @module payment-service/application/queries/method
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListMethodsQuery } from './list-methods.query.js';
import {
  PAYMENT_METHOD_SERVICE,
  type IPaymentMethodService,
} from '@application/services/interfaces/payment-method.service.interface.js';
import type { MethodListResponseDTO } from '@application/dtos/responses/method-response.dto.js';

@QueryHandler(ListMethodsQuery)
export class ListMethodsHandler
  implements IQueryHandler<ListMethodsQuery, MethodListResponseDTO>
{
  constructor(
    @Inject(PAYMENT_METHOD_SERVICE)
    private readonly service: IPaymentMethodService,
  ) {}
  async execute(q: ListMethodsQuery): Promise<MethodListResponseDTO> {
    return this.service.listByUser(q.userId, {
      page: q.page,
      limit: q.limit,
      filter: q.filter,
    });
  }
}
