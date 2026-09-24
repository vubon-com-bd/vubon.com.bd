export interface ProviderSendInput {
  readonly recipient: string;
  readonly subject?: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface ProviderSendResult {
  readonly success: boolean;
  readonly messageId: string | null;
  readonly providerName: string;
  readonly error: string | null;
  readonly raw?: unknown;
}

export interface ProviderConfig {
  readonly apiKey?: string;
  readonly apiSecret?: string;
  readonly region?: string;
  readonly endpoint?: string;
  readonly fromAddress?: string;
  readonly fromNumber?: string;
}
