/**
 * In-App Provider Types
 * @module notification-service/infrastructure/providers/in-app
 */
export type InAppProviderName = 'websocket' | 'sse';

export interface InAppProviderConfig {
  readonly name: InAppProviderName;
  readonly enabled: boolean;
  readonly priority: number;
}

export interface InAppConnection {
  readonly userId: string;
  readonly connectionId: string;
  readonly transport: InAppProviderName;
  readonly connectedAt: string;
  readonly lastPingAt: string;
}
