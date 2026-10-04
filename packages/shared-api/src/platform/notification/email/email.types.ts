export interface SendEmailRequest {
  readonly to: string | readonly string[];
  readonly subject: string;
  readonly template?: string;
  readonly body?: string;
  readonly variables?: Record<string, string>;
}

export interface SendEmailResponse {
  readonly messageId: string;
  readonly accepted: boolean;
}

export interface EmailTemplate {
  readonly id: string;
  readonly name: string;
  readonly subject: string;
  readonly variables: readonly string[];
}
