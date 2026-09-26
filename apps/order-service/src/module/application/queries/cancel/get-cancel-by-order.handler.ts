import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCancelByOrderQuery } from './get-cancel-by-order.query';
import type { CancelServiceInterface } from '../../services/interfaces/cancel.service.interface';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto';

@QueryHandler(GetCancelByOrderQuery)
export class GetCancelByOrderHandler
  extends BaseQueryHandler<GetCancelByOrderQuery, CancelResponseDTO | null>
  implements IQueryHandler<GetCancelByOrderQuery>
{
  readonly queryType = 'order.cancel.get-by-order';

  constructor(private readonly cancelService: CancelServiceInterface) {
    super();
  }

  async execute(query: GetCancelByOrderQuery): Promise<CancelResponseDTO | null> {
    return this.cancelService.findByOrder(query.orderId);
  }
}
