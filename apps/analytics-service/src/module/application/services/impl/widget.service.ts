import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { WidgetEntity } from '../../../domain/entities/widget.entity';
import { WidgetIdVO } from '../../../domain/value-objects/primitives/widget-id.vo';
import type { WidgetRepository } from '../../../domain/repositories/widget.repository.interface';
import type { WidgetServiceInterface } from '../interfaces/widget.service.interface';

@Injectable()
export class WidgetService
  extends BaseService<WidgetEntity, WidgetIdVO>
  implements WidgetServiceInterface
{
  readonly name = 'WidgetService';

  constructor(private readonly repo: WidgetRepository) {
    super();
  }

  async findByDashboardId(dashboardId: string): Promise<readonly WidgetEntity[]> {
    return this.repo.findByDashboardId(dashboardId);
  }
}
