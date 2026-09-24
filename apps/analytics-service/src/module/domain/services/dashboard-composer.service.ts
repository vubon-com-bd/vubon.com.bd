import { DashboardEntity } from '../entities/dashboard.entity';
import { DashboardNameVO } from '../value-objects/primitives/dashboard-name.vo';
import { DashboardLayoutVO } from '../value-objects/primitives/dashboard-layout.vo';

export class DashboardComposerService {
  compose(input: {
    name: string;
    layout?: string;
    ownerId: string;
  }): DashboardEntity {
    const name = DashboardNameVO.create(input.name);
    const layout = input.layout
      ? DashboardLayoutVO.create(input.layout)
      : DashboardLayoutVO.grid();

    return DashboardEntity.create({
      name,
      layout,
      ownerId: input.ownerId,
      widgetIds: [],
    });
  }
}
