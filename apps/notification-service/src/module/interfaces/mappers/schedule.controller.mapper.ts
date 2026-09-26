import { Injectable } from '@nestjs/common';
import type { ScheduleResponseDTO as AppScheduleResponse } from '../../application/dtos/responses';

@Injectable()
export class ScheduleControllerMapper {
  toResponse(dto: AppScheduleResponse): AppScheduleResponse {
    return dto;
  }

  toResponseList(
    dtos: readonly AppScheduleResponse[],
  ): readonly AppScheduleResponse[] {
    return dtos.map((d) => this.toResponse(d));
  }
}
