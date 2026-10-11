/**
 * Channel-specific Response DTOs (Email / SMS / Push / In-App)
 * @module notification-service/application/dtos/responses
 */
import type {
  EmailStatusValue,
  EmailProviderValue,
  SmsStatusValue,
  SmsProviderValue,
  PushStatusValue,
  PushProviderValue,
  InAppStatusValue,
} from '@vubon/shared-types/platform/notification';

// ═══ Email ═══
export interface EmailResponseDTO {
  readonly id: string;
  readonly to: readonly string[];
  readonly cc?: readonly string[];
  readonly bcc?: readonly string[];
  readonly from?: string;
  readonly replyTo?: string;
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly templateId?: string;
  readonly provider?: EmailProviderValue;
  readonly status: EmailStatusValue;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly openedAt?: string;
  readonly clickedAt?: string;
  readonly bouncedAt?: string;
  readonly failureReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface EmailSendResponseDTO {
  readonly success: boolean;
  readonly messageId?: string;
  readonly status: EmailStatusValue;
  readonly error?: string;
}

export interface EmailListResponseDTO {
  readonly items: readonly EmailResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ═══ SMS ═══
export interface SmsResponseDTO {
  readonly id: string;
  readonly to: string;
  readonly from?: string;
  readonly message: string;
  readonly type: string;
  readonly provider?: SmsProviderValue;
  readonly status: SmsStatusValue;
  readonly segments: number;
  readonly encoding: 'gsm' | 'unicode';
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly failureReason?: string;
  readonly cost?: number;
  readonly currency?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SmsSendResponseDTO {
  readonly success: boolean;
  readonly messageId?: string;
  readonly status: SmsStatusValue;
  readonly segments: number;
  readonly error?: string;
}

export interface SmsListResponseDTO {
  readonly items: readonly SmsResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ═══ Push ═══
export interface PushResponseDTO {
  readonly id: string;
  readonly token: string;
  readonly platform: string;
  readonly provider?: PushProviderValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly priority: string;
  readonly silent: boolean;
  readonly status: PushStatusValue;
  readonly ttl?: number;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface PushSendResponseDTO {
  readonly success: boolean;
  readonly messageId?: string;
  readonly successCount: number;
  readonly failureCount: number;
  readonly error?: string;
}

export interface PushListResponseDTO {
  readonly items: readonly PushResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ═══ In-App ═══
export interface InAppResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly position?: string;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actions?: readonly {
    readonly id: string;
    readonly label: string;
    readonly url?: string;
    readonly action?: string;
  }[];
  readonly status: InAppStatusValue;
  readonly displayDurationSeconds?: number;
  readonly autoDismiss: boolean;
  readonly readAt?: string;
  readonly dismissedAt?: string;
  readonly clickedAt?: string;
  readonly createdAt: string;
  readonly expiresAt?: string;
}

export interface InAppSendResponseDTO {
  readonly success: boolean;
  readonly notificationId: string;
  readonly status: InAppStatusValue;
}

export interface InAppInboxResponseDTO {
  readonly userId: string;
  readonly unreadCount: number;
  readonly totalCount: number;
  readonly notifications: readonly InAppResponseDTO[];
}
