import { KpiEntity } from '../entities/kpi.entity';
import { KpiResultVO } from '../value-objects/composites/kpi-result.vo';
import { KpiIdVO } from '../value-objects/primitives/kpi-id.vo';
import { KpiTargetVO } from '../value-objects/primitives/kpi-target.vo';

export class KpiEvaluatorService {
  /**
   * Evaluate KPI against actual and return a KpiResultVO.
   */
  evaluate(kpi: KpiEntity, actual: number): KpiResultVO {
    const { status } = kpi.evaluate(actual);
    return KpiResultVO.create({
      kpiId: kpi.id,
      actual,
      target: kpi.target,
      status,
      evaluatedAt: new Date(),
    });
  }

  evaluateMany(
    kpis: readonly KpiEntity[],
    actuals: ReadonlyMap<string, number>,
  ): readonly KpiResultVO[] {
    return kpis.map((kpi) => {
      const actual = actuals.get(kpi.name.value) ?? 0;
      return this.evaluate(kpi, actual);
    });
  }
}
