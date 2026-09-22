import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCheckoutQuery } from './get-checkout.query';
import type { CheckoutServiceInterface } from '../../services/interfaces/checkout.service.interface';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto';

@QueryHandler(GetCheckoutQuery)
export class GetCheckoutHandler
  extends BaseQueryHandler<GetCheckoutQuery, CheckoutResponseDTO | null>
  implements IQueryHandler<GetCheckoutQuery>
{
  readonly queryType = 'checkout.get';

  constructor(private readonly checkoutService: CheckoutServiceInterface) {
    super();
  }

  async execute(query: GetCheckoutQuery): Promise<CheckoutResponseDTO | null> {
    return this.checkoutService.findById(query.checkoutId);
  }
}
