import type { NotificationResponseDTO } from './notification-response.dto';

export interface NotificationListResponseDTO {
  readonly items: readonly NotificationResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly hasNext: boolean;
}
