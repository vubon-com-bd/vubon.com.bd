/**
 * INotificationService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  SendNotificationRequestDTO,
  SendNotificationToManyRequestDTO,
  ScheduleNotificationRequestDTO,
  ListNotificationsByUserRequestDTO,
  GetNotificationRequestDTO,
  GetNotificationStatsRequestDTO,
  MarkNotificationReadRequestDTO,
  MarkNotificationsReadRequestDTO,
  MarkAllReadRequestDTO,
  ArchiveNotificationRequestDTO,
  SnoozeNotificationRequestDTO,
  StarNotificationRequestDTO,
  UpdateNotificationRequestDTO,
  CancelNotificationRequestDTO,
  DeleteNotificationRequestDTO,
  RetryNotificationRequestDTO,
  NotificationListOptionsDTO,
} from '../../dtos/requests/notification/index.js';
import type {
  NotificationResponseDTO,
  NotificationPublicResponseDTO,
  NotificationSummaryResponseDTO,
  NotificationListResponseDTO,
  NotificationSendResponseDTO,
  NotificationDetailResponseDTO,
  NotificationStatsResponseDTO,
  NotificationUnreadCountResponseDTO,
} from '../../dtos/responses/notification-response.dto.js';

export const NOTIFICATION_SERVICE = Symbol('NOTIFICATION_SERVICE');

export interface INotificationService {
  /** Send a notification via one or more channels (fan-out). */
  send(
    dto: SendNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationSendResponseDTO>;

  /** Send a batch (same content to many users). */
  sendToMany(
    dto: SendNotificationToManyRequestDTO,
    actorId?: string,
  ): Promise<readonly NotificationSendResponseDTO[]>;

  /** Schedule a notification for the future. */
  schedule(
    dto: ScheduleNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationSendResponseDTO>;

  /** Cancel a pending/scheduled notification. */
  cancel(dto: CancelNotificationRequestDTO, actorId?: string): Promise<NotificationResponseDTO>;

  /** Update mutable fields (only before send). */
  update(dto: UpdateNotificationRequestDTO, actorId?: string): Promise<NotificationResponseDTO>;

  /** Soft-delete a notification. */
  delete(dto: DeleteNotificationRequestDTO, actorId?: string): Promise<void>;

  /** Retry a failed notification. */
  retry(dto: RetryNotificationRequestDTO, actorId?: string): Promise<NotificationResponseDTO>;

  // ═══ Read ═══
  getById(dto: GetNotificationRequestDTO): Promise<NotificationResponseDTO>;
  getPublic(dto: GetNotificationRequestDTO): Promise<NotificationPublicResponseDTO>;
  getDetail(dto: GetNotificationRequestDTO): Promise<NotificationDetailResponseDTO>;
  list(dto: ListNotificationsByUserRequestDTO): Promise<NotificationListResponseDTO>;
  getStats(dto: GetNotificationStatsRequestDTO): Promise<NotificationStatsResponseDTO>;
  getUnreadCount(userId: string): Promise<NotificationUnreadCountResponseDTO>;

  // ═══ Read-state mutations ═══
  markRead(dto: MarkNotificationReadRequestDTO): Promise<NotificationResponseDTO>;
  markManyRead(dto: MarkNotificationsReadRequestDTO): Promise<number>;
  markAllRead(dto: MarkAllReadRequestDTO): Promise<number>;
  archive(dto: ArchiveNotificationRequestDTO): Promise<NotificationResponseDTO>;
  snooze(dto: SnoozeNotificationRequestDTO): Promise<NotificationResponseDTO>;
  star(dto: StarNotificationRequestDTO): Promise<NotificationResponseDTO>;
}
