import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPreferenceMatrixQuery } from './get-preference-matrix.query';
import type { PreferenceMatrixRepository } from '../../../domain/repositories/preference-matrix.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto';

@QueryHandler(GetPreferenceMatrixQuery)
export class GetPreferenceMatrixHandler
  extends BaseQueryHandler<GetPreferenceMatrixQuery, PreferenceResponseDTO | null>
  implements IQueryHandler<GetPreferenceMatrixQuery>
{
  readonly queryType = 'preference.get-matrix';

  constructor(private readonly matrixRepo: PreferenceMatrixRepository) {
    super();
  }

  async execute(query: GetPreferenceMatrixQuery): Promise<PreferenceResponseDTO | null> {
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
