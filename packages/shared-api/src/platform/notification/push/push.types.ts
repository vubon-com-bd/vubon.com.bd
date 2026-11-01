export interface SendPushRequest {
  readonly userIds: readonly string[];
  readonly title: string;
  readonly body: string;
  readonly data?: Record<string, string>;
}

export interface SendPushResponse {
  readonly messageId: string;
  readonly accepted: boolean;
  readonly deliveredCount: number;
}

export interface PushSubscribeRequest {
  readonly token: string;
  readonly platform: 'web' | 'ios' | 'android';
}
