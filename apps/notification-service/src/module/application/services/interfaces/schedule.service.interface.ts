/**
 * IScheduleService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  CreateScheduleRequestDTO,
  UpdateScheduleRequestDTO,
  GetScheduleRequestDTO,
  ListSchedulesRequestDTO,
  TriggerScheduleRequestDTO,
  PauseScheduleRequestDTO,
  ResumeScheduleRequestDTO,
  CancelScheduleRequestDTO,
} from '../../dtos/requests/schedule/index.js';
import type {
  ScheduleResponseDTO,
  ScheduleListResponseDTO,
  ScheduleTriggerResponseDTO,
} from '../../dtos/responses/schedule-response.dto.js';

export const SCHEDULE_SERVICE = Symbol('SCHEDULE_SERVICE');

export interface IScheduleService {
  create(dto: CreateScheduleRequestDTO, actorId?: string): Promise<ScheduleResponseDTO>;
  update(dto: UpdateScheduleRequestDTO, actorId?: string): Promise<ScheduleResponseDTO>;
  activate(scheduleId: string, actorId?: string): Promise<ScheduleResponseDTO>;
  pause(dto: PauseScheduleRequestDTO, actorId?: string): Promise<ScheduleResponseDTO>;
  resume(dto: ResumeScheduleRequestDTO, actorId?: string): Promise<ScheduleResponseDTO>;
  cancel(dto: CancelScheduleRequestDTO, actorId?: string): Promise<ScheduleResponseDTO>;
  trigger(dto: TriggerScheduleRequestDTO, actorId?: string): Promise<ScheduleTriggerResponseDTO>;
  getById(dto: GetScheduleRequestDTO): Promise<ScheduleResponseDTO>;
  list(dto: ListSchedulesRequestDTO): Promise<ScheduleListResponseDTO>;
  getDue(at?: Date): Promise<readonly ScheduleResponseDTO[]>;
}
