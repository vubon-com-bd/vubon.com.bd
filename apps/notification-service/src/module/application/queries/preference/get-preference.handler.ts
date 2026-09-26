import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPreferenceQuery } from './get-preference.query';
import type { PreferenceMatrixRepository } from '../../../domain/repositories/preference-matrix.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto';

@QueryHandler(GetPreferenceQuery)
export class GetPreferenceHandler
  extends BaseQueryHandler<GetPreferenceQuery, PreferenceResponseDTO | null>
  implements IQueryHandler<GetPreferenceQuery>
{
  readonly queryType = 'preference.get';

  constructor(private readonly matrixRepo: PreferenceMatrixRepository) {
    super();
  }

  async execute(query: GetPreferenceQuery): Promise<PreferenceResponseDTO | null> {
    const matrix = await this.matrixRepo.findByUser(UserIdVO.create(query.userId));
    if (!matrix) return null;
    return {
      userId: matrix.userId.value,
      emailOptIn: matrix.emailOptIn,
      smsOptIn: matrix.smsOptIn,
      pushOptIn: matrix.pushOptIn,
      inAppOptIn: matrix.inAppOptIn,
      webhookOptIn: matrix.webhookOptIn,
    };
  }
}
