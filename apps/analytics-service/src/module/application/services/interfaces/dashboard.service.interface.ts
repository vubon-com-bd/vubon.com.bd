import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DashboardEntity } from '../../../domain/entities/dashboard.entity';
import type { DashboardIdVO } from '../../../domain/value-objects/primitives/dashboard-id.vo';
import type {
  CreateDashboardDTO,
  UpdateDashboardDTO,
  AddWidgetDTO,
  RemoveWidgetDTO,
} from '../../dtos/requests/dashboard';
import type { DashboardResponseDTO, WidgetResponseDTO } from '../../dtos/responses';

export interface DashboardServiceInterface
  extends BaseServiceInterface<DashboardEntity, DashboardIdVO> {
  create(input: CreateDashboardDTO): Promise<DashboardResponseDTO>;
  update(input: UpdateDashboardDTO): Promise<DashboardResponseDTO>;
  addWidget(input: AddWidgetDTO): Promise<WidgetResponseDTO>;
  removeWidget(input: RemoveWidgetDTO): Promise<void>;
}
