/**
 * UpdateVisibilityRequestDTO
 */
import type { ProfileVisibilitySchemaType } from '@vubon/shared-schemas/user';

export interface UpdateVisibilityRequestDTO {
  readonly userId: string;
  readonly visibility: ProfileVisibilitySchemaType;
}
