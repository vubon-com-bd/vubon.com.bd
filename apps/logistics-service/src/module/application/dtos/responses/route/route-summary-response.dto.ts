import type { RouteStatusValue } from '@domain/primitives/route-status.vo';
import type { RouteTypeValue } from '@domain/primitives/route-type.vo';

export interface RouteSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly type: RouteTypeValue;
  readonly status: RouteStatusValue;
  readonly stopCount: number;
  readonly completedStops: number;
  readonly scheduledDate: string;
  readonly createdAt: string;
}
