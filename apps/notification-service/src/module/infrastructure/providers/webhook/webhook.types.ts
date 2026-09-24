export interface WebhookProviderInput {
  readonly url: string;
  readonly event: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly signature?: string;
  readonly headers?: Readonly<Record<string, string>>;
}

export interface WebhookProviderResult {
  readonly success: boolean;
  readonly statusCode: number | null;
  readonly error: string | null;
}
