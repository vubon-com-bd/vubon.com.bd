import { Injectable } from '@nestjs/common';
import type { WebhookResponseDTO as AppWebhookResponse } from '../../application/dtos/responses';

@Injectable()
export class WebhookControllerMapper {
  toResponse(dto: AppWebhookResponse): AppWebhookResponse {
    return dto;
  }

  toResponseList(
    dtos: readonly AppWebhookResponse[],
  ): readonly AppWebhookResponse[] {
    return dtos.map((d) => this.toResponse(d));
  }
}
