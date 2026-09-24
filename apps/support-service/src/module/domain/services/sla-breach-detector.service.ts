import { SlaEntity } from '../entities/sla.entity';
import { SlaCalculationService } from './sla-calculation.service';

export class SlaBreachDetectorService {
  constructor(private readonly calculator: SlaCalculationService) {}

  isBreached(createdAt: Date, sla: SlaEntity, now: Date = new Date()): boolean {
    return this.calculator.calculate(createdAt, sla, now).breached;
  }

  isAtRisk(createdAt: Date, sla: SlaEntity, now: Date = new Date()): boolean {
    const status = this.calculator.calculate(createdAt, sla, now);
    if (status.breached) return false;
    return status.remainingMinutes <= sla.target.value * 0.2;
  }
}
