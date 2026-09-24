export interface PreferenceResponseDTO {
  readonly userId: string;
  readonly emailOptIn: boolean;
  readonly smsOptIn: boolean;
  readonly pushOptIn: boolean;
  readonly inAppOptIn: boolean;
  readonly webhookOptIn: boolean;
}
