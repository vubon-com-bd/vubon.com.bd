/**
 * SubmitKycRequestDTO
 */
import type { SubmitKycRequestSchemaType } from '@vubon/shared-schemas/user';

export interface SubmitKycRequestDTO {
  readonly userId: string;
  readonly documents: readonly {
    readonly type: string;
    readonly number?: string;
    readonly frontUrl: string;
    readonly backUrl?: string;
    readonly selfieUrl?: string;
  }[];
  readonly acceptTerms: true;
}

export type SubmitKycRequestInput = SubmitKycRequestSchemaType;
