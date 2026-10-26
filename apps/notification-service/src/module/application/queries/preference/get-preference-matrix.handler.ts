import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPreferenceMatrixQuery } from './get-preference-matrix.query.js';
import {
  PREFERENCE_SERVICE,
  type IPreferenceService,
} from '@application/services/interfaces/preference.service.interface.js';
import type { PreferenceMatrixResponseDTO } from '@application/dtos/responses/preference-response.dto.js';

@QueryHandler(GetPreferenceMatrixQuery)
export class GetPreferenceMatrixHandler
  implements IQueryHandler<GetPreferenceMatrixQuery, PreferenceMatrixResponseDTO>
{
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(q: GetPreferenceMatrixQuery): Promise<PreferenceMatrixResponseDTO> {
    return this.service.getMatrix(q.userId);
  }
}
