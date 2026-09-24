import { Injectable } from '@nestjs/common';
import { DashboardEntity } from '../../domain/entities/dashboard.entity';
import { WidgetEntity } from '../../domain/entities/widget.entity';
import type { DashboardResponseDTO, WidgetResponseDTO } from '../dtos/responses';
import { toDashboardResponse, toWidgetResponse } from '../dtos/responses';

@Injectable()
export class DashboardMapper {
  toResponse(entity: DashboardEntity): DashboardResponseDTO {
    return toDashboardResponse(entity);
  }

  toResponseList(entities: readonly DashboardEntity[]): readonly DashboardResponseDTO[] {
    return entities.map((e) => toDashboardResponse(e));
  }

  widgetToResponse(entity: WidgetEntity): WidgetResponseDTO {
    return toWidgetResponse(entity);
  }
}
