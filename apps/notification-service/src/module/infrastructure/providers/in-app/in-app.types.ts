export interface InAppProviderInput {
  readonly userId: string;
  readonly title: string;
  readonly body: string;
  readonly position?: 'top' | 'bottom' | 'center' | 'toast';
  readonly actionUrl?: string;
  readonly autoDismissMs?: number;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface InAppProviderResult {
  readonly success: boolean;
  readonly notificationId: string | null;
  readonly error: string | null;
}
