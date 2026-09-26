import { Injectable } from '@nestjs/common';
import type { EventResponseDTO as AppEventDTO } from '../../application/dtos/responses';
import type { EventResponseDTO } from '../dtos/responses';

@Injectable()
export class EventControllerMapper {
  /**
   * Map application-layer DTO → controller response.
   * Only public-safe fields.
   */
  toResponse(appDto: AppEventDTO): EventResponseDTO {
    return {
      eventId: appDto.eventId,
      name: appDto.name,
      source: appDto.source,
      timestamp: appDto.timestamp,
      payloadKeys: [...appDto.payloadKeys],
      payloadSize: appDto.payloadSize,
      processed: appDto.processed,
      createdAt: appDto.createdAt,
    };
  }

  toResponseList(appDtos: readonly AppEventDTO[]): readonly EventResponseDTO[] {
    return appDtos.map((dto) => this.toResponse(dto));
  }
}
