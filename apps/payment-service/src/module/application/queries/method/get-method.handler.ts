/**
 * GetMethodHandler
 * @module payment-service/application/queries/method
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetMethodQuery } from './get-method.query.js';
import {
  PAYMENT_METHOD_SERVICE,
  type IPaymentMethodService,
} from '@application/services/interfaces/payment-method.service.interface.js';
import type { MethodResponseDTO } from '@application/dtos/responses/method-response.dto.js';

@QueryHandler(GetMethodQuery)
export class GetMethodHandler
  implements IQueryHandler<GetMethodQuery, MethodResponseDTO>
{
  constructor(
    @Inject(PAYMENT_METHOD_SERVICE)
    private readonly service: IPaymentMethodService,
  ) {}
  async execute(q: GetMethodQuery): Promise<MethodResponseDTO> {
    return this.service.getById(q.methodId);
  }
}
