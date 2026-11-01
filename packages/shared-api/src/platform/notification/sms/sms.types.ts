export interface SendSmsRequest {
  readonly to: string | readonly string[];
  readonly message: string;
  readonly templateId?: string;
}

export interface SendSmsResponse {
  readonly messageId: string;
  readonly accepted: boolean;
  readonly segments: number;
}
