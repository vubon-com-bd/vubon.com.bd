/**
 * IScheduleService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  CreateScheduleRequestDTO,
  UpdateScheduleRequestDTO,
  CancelScheduleRequestDTO,
} from '@application/dtos/requests/schedule/index.js';
import type {
  ScheduleResponseDTO,
  ScheduleSummaryResponseDTO,
  ScheduleListResponseDTO,
} from '@application/dtos/responses/schedule-response.dto.js';

export const SCHEDULE_SERVICE = Symbol('SCHEDULE_SERVICE');

export interface ScheduleListFilterDTO {
  readonly type?: string;
  readonly status?: string;
  readonly frequency?: string;
  readonly createdBy?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface ScheduleListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'nextRunAt' | 'runCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ScheduleListFilterDTO;
}

export interface IScheduleService {
  // Commands
  create(
    dto: CreateScheduleRequestDTO,
    actorId?: string,
  ): Promise<ScheduleResponseDTO>;

  update(
    dto: UpdateScheduleRequestDTO,
    actorId?: string,
  ): Promise<ScheduleResponseDTO>;

  cancel(
    dto: CancelScheduleRequestDTO,
    actorId?: string,
  ): Promise<ScheduleResponseDTO>;

  // Queries
  getById(id: string): Promise<ScheduleResponseDTO>;
  list(options: ScheduleListOptionsDTO): Promise<ScheduleListResponseDTO>;
}
