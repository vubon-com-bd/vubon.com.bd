/**
 * Push Notification Provider Client Types
 * @module shared-kernel/infrastructure/external/push
 */

export interface PushMessageInput {
  readonly deviceToken: string;
  readonly title: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface PushSendResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly error?: string;
}
