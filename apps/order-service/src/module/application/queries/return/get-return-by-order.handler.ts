import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetReturnByOrderQuery } from './get-return-by-order.query';
import type { ReturnServiceInterface } from '../../services/interfaces/return.service.interface';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto';

@QueryHandler(GetReturnByOrderQuery)
export class GetReturnByOrderHandler
  extends BaseQueryHandler<GetReturnByOrderQuery, ReturnResponseDTO | null>
  implements IQueryHandler<GetReturnByOrderQuery>
{
  readonly queryType = 'order.return.get-by-order';

  constructor(private readonly returnService: ReturnServiceInterface) {
    super();
  }

  async execute(query: GetReturnByOrderQuery): Promise<ReturnResponseDTO | null> {
    return this.returnService.findByOrder(query.orderId);
  }
}
