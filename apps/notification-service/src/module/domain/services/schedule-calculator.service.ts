import { ScheduleFrequencyVO } from '../value-objects/primitives/schedule-frequency.vo';

export class ScheduleCalculatorService {
  next(from: Date, frequency: ScheduleFrequencyVO, interval: number = 1): Date {
    const d = new Date(from.getTime());
    switch (frequency.value) {
      case 'hourly':
        d.setHours(d.getHours() + interval);
        break;
      case 'daily':
        d.setDate(d.getDate() + interval);
        break;
      case 'weekly':
        d.setDate(d.getDate() + 7 * interval);
        break;
      case 'monthly':
        d.setMonth(d.getMonth() + interval);
        break;
      case 'yearly':
        d.setFullYear(d.getFullYear() + interval);
        break;
      case 'once':
      default:
        return d;
    }
    return d;
  }
}
