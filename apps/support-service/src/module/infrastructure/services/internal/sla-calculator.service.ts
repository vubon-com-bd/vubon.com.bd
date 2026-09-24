import { Injectable } from '@nestjs/common';
import { SlaEntity } from '../../../domain/entities/sla.entity';

export interface SlaStatusResult {
  readonly breached: boolean;
  readonly remainingMinutes: number;
  readonly elapsedMinutes: number;
}

@Injectable()
export class SlaCalculatorService {
  calculate(
    createdAt: Date,
    sla: SlaEntity,
    now: Date = new Date(),
  ): SlaStatusResult {
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
