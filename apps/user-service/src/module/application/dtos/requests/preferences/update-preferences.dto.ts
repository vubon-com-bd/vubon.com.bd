/**
 * UpdatePreferencesRequestDTO
 */
import type { UpdatePreferencesRequestSchemaType } from '@vubon/shared-schemas/user';

export interface UpdatePreferencesRequestDTO {
  readonly userId: string;
  readonly newsletter?: boolean;
  readonly promotions?: boolean;
  readonly orderUpdates?: boolean;
  readonly productRecommendations?: boolean;
  readonly securityAlerts?: boolean;
  readonly channels?: readonly {
    readonly channel: string;
    readonly enabled: boolean;
  }[];
}

export type UpdatePreferencesRequestInput = UpdatePreferencesRequestSchemaType;
