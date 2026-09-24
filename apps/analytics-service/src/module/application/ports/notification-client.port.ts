export interface NotificationClient {
  send(payload: {
    readonly type: string;
    readonly recipientId: string;
    readonly title: string;
    readonly body: string;
    readonly metadata?: Readonly<Record<string, unknown>>;
  }): Promise<boolean>;
}
