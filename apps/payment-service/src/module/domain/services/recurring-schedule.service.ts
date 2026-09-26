export type Frequency =
  | 'daily' | 'weekly' | 'biweekly' | 'monthly'
  | 'quarterly' | 'semiannually' | 'yearly';

const DAYS: Record<Frequency, number> = {
  daily: 1,
  weekly: 7,
  biweekly: 14,
  monthly: 30,
  quarterly: 90,
  semiannually: 180,
  yearly: 365,
};

export class RecurringScheduleService {
  nextDate(from: Date, frequency: Frequency): Date {
    const days = DAYS[frequency];
    return new Date(from.getTime() + days * 86_400_000);
  }
}
