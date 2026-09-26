export class DeliverySchedulingService {
  static calculateScheduledAt(
    type: string,
    now: Date = new Date(),
  ): Date {
    const offsetMs =
      type === 'same_day'
        ? 4 * 60 * 60 * 1000
        : type === 'next_day'
          ? 24 * 60 * 60 * 1000
          : type === 'express'
            ? 2 * 60 * 60 * 1000
            : 3 * 24 * 60 * 60 * 1000;
    return new Date(now.getTime() + offsetMs);
  }
}
