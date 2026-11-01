/**
 * INotificationService — contract
 * @module notification-service/application/services/interfaces
 *
 * Full contract: command + query.
 */
import type {
  SendNotificationRequestDTO,
  SendBulkNotificationRequestDTO,
  ResendNotificationRequestDTO,
  CancelNotificationRequestDTO,
} from '@application/dtos/requests/notification/index.js';
import type {
  NotificationResponseDTO,
  NotificationPublicResponseDTO,
  NotificationSummaryResponseDTO,
  NotificationListResponseDTO,
  NotificationStatsResponseDTO,
  NotificationSendResponseDTO,
  NotificationUserFeedResponseDTO,
} from '@application/dtos/responses/notification-response.dto.js';
import type { NotificationDetailResponseDTO } from '@application/dtos/responses/notification-detail-response.dto.js';

// ─── DI Token ─────────────────────────────
export const NOTIFICATION_SERVICE = Symbol('NOTIFICATION_SERVICE');

// ─── Filter / Options ─────────────────────
export interface NotificationListFilterDTO {
  readonly userId?: string;
  readonly type?: string;
  readonly category?: string;
  readonly channel?: string;
  readonly status?: string;
  readonly priority?: string;
  readonly isRead?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface NotificationListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: NotificationListFilterDTO;
}

// ─── Main Interface ───────────────────────
export interface INotificationService {
  // Commands
  send(
    dto: SendNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationSendResponseDTO>;

  sendBulk(
    dto: SendBulkNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationSendResponseDTO>;

  resend(
    dto: ResendNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationResponseDTO>;

  cancel(
    dto: CancelNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationResponseDTO>;

  // Queries
  getById(id: string): Promise<NotificationResponseDTO>;
  getPublic(id: string): Promise<NotificationPublicResponseDTO>;
  getDetail(id: string): Promise<NotificationDetailResponseDTO>;
  list(options: NotificationListOptionsDTO): Promise<NotificationListResponseDTO>;
  getUserFeed(
    userId: string,
    page: number,
    limit: number,
  ): Promise<NotificationUserFeedResponseDTO>;
  countUnread(userId: string): Promise<number>;
  getStats(userId?: string, fromDate?: string, toDate?: string): Promise<NotificationStatsResponseDTO>;
}
