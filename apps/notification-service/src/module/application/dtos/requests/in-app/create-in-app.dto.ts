/**
 * Create In-App Notification Request DTO
 * @module notification-service/application/dtos/requests/in-app
 */
export interface CreateInAppRequestDTO {
  readonly userId: string;
  readonly title: string;
  readonly body: string;
  readonly type?: string;
  readonly position?: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actions?: readonly {
    readonly id: string;
    readonly label: string;
    readonly url?: string;
    readonly action?: string;
  }[];
  readonly displayDurationSeconds?: number;
  readonly autoDismiss?: boolean;
}

export interface CreateInAppCommandDTO extends CreateInAppRequestDTO {
  readonly actorId?: string;
}
