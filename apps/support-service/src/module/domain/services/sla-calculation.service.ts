import { SlaEntity } from '../entities/sla.entity';

export interface SlaStatus {
  readonly breached: boolean;
  readonly remainingMinutes: number;
  readonly elapsedMinutes: number;
}

export class SlaCalculationService {
  calculate(
    createdAt: Date,
    sla: SlaEntity,
    now: Date = new Date(),
  ): SlaStatus {
    const elapsedMinutes = Math.floor(
      (now.getTime() - createdAt.getTime()) / 60000,
    );
    const targetMinutes = sla.target.value;
    const remainingMinutes = targetMinutes - elapsedMinutes;
    return {
      breached: remainingMinutes < 0,
      remainingMinutes,
      elapsedMinutes,
    };
  }
}
