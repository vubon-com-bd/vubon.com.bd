import { Injectable } from '@nestjs/common';
import type { NotificationResponseDTO as AppNotificationResponse } from '../../application/dtos/responses';
import type { NotificationResponseDTO as InterfaceNotificationResponse } from '../dtos/responses';

@Injectable()
export class NotificationControllerMapper {
  toResponse(dto: AppNotificationResponse): InterfaceNotificationResponse {
    return dto;
  }

  toResponseList(
    dtos: readonly AppNotificationResponse[],
  ): readonly InterfaceNotificationResponse[] {
    return dtos.map((d) => this.toResponse(d));
  }
}
