import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseTimeTrackerService {
  private readonly responses: number[] = [];

  record(durationMinutes: number): void {
    this.responses.push(durationMinutes);
  }

  getAverage(): number {
    if (this.responses.length === 0) return 0;
    const total = this.responses.reduce((s, x) => s + x, 0);
    return total / this.responses.length;
  }

  reset(): void {
    this.responses.length = 0;
  }
}
