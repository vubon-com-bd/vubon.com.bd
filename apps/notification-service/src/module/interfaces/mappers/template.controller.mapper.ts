import { Injectable } from '@nestjs/common';
import type { TemplateResponseDTO as AppTemplateResponse } from '../../application/dtos/responses';
import type { TemplateResponseDTO as InterfaceTemplateResponse } from '../dtos/responses';

@Injectable()
export class TemplateControllerMapper {
  toResponse(dto: AppTemplateResponse): InterfaceTemplateResponse {
    return dto;
  }

  toResponseList(
    dtos: readonly AppTemplateResponse[],
  ): readonly InterfaceTemplateResponse[] {
    return dtos.map((d) => this.toResponse(d));
  }
}
