import type { ActivityHttpResponseDTO } from '../dtos/responses/activity.response.dto.js';

export class ActivityControllerMapper {
  static toHttpList(items: readonly unknown[]): readonly ActivityHttpResponseDTO[] {
    return items as readonly ActivityHttpResponseDTO[];
  }
}
