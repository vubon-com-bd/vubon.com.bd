import { KpiEntity } from '../entities/kpi.entity';
import { KpiThresholdVO } from '../value-objects/primitives/kpi-threshold.vo';

export class KpiThresholdService {
  isBelowThreshold(kpi: KpiEntity, actual: number): boolean {
    return kpi.threshold.isBelow(actual, kpi.target.numeric);
  }

  isAtThreshold(kpi: KpiEntity, actual: number): boolean {
    return kpi.threshold.isAt(actual, kpi.target.numeric);
  }

  static default(): KpiThresholdVO {
    return KpiThresholdVO.create(80);
  }
}
