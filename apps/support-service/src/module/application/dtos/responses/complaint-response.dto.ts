import type { Complaint } from '@vubon/shared-types/support';

export interface ComplaintResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly severity: string;
  readonly status: string;
  readonly content: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type ComplaintResponseShape = Complaint;
