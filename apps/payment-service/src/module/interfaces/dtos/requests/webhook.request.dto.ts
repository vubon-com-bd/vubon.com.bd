export interface WebhookRequestDto {
  readonly rawBody: string;
  readonly signature: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly payload?: Readonly<Record<string, unknown>>;
}
