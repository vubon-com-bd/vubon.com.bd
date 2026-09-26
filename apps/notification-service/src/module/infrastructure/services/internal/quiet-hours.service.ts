import { Injectable } from '@nestjs/common';

export interface QuietHoursWindow {
  readonly startHour: number;
  readonly endHour: number;
  readonly timezone: string;
}

@Injectable()
export class QuietHoursService {
  isQuietHour(window: QuietHoursWindow, now: Date = new Date()): boolean {
    const hour = now.getHours();
    if (window.startHour < window.endHour) {
      return hour >= window.startHour && hour < window.endHour;
    }
    return hour >= window.startHour || hour < window.endHour;
  }

  deferUntil(window: QuietHoursWindow, now: Date = new Date()): Date {
    const d = new Date(now.getTime());
    d.setHours(window.endHour, 0, 0, 0);
    if (d.getTime() <= now.getTime()) {
      d.setDate(d.getDate() + 1);
    }
    return d;
  }
}
