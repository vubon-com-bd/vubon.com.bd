export interface PushProviderInput {
  readonly deviceToken: string;
  readonly title: string;
  readonly body: string;
  readonly icon?: string;
  readonly image?: string;
  readonly clickAction?: string;
  readonly data?: Readonly<Record<string, string>>;
  readonly badge?: number;
  readonly sound?: string;
}

export interface PushProviderResult {
  readonly success: boolean;
  readonly messageId: string | null;
  readonly error: string | null;
}
