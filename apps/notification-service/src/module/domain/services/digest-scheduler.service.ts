import { DigestPeriodVO } from '../value-objects/primitives/digest-period.vo';

export class DigestSchedulerService {
  nextRun(from: Date, period: DigestPeriodVO): Date {
    const d = new Date(from.getTime());
    switch (period.value) {
      case 'daily':
        d.setDate(d.getDate() + 1);
        break;
      case 'weekly':
        d.setDate(d.getDate() + 7);
        break;
      case 'monthly':
        d.setMonth(d.getMonth() + 1);
        break;
      default:
        d.setDate(d.getDate() + 1);
    }
    return d;
  }
}
