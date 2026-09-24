import { Injectable } from '@nestjs/common';

@Injectable()
export class SatisfactionTrackerService {
  private readonly scores: number[] = [];

  record(score: number): void {
    if (score >= 1 && score <= 5) {
      this.scores.push(score);
    }
  }

  getAverage(): number {
    if (this.scores.length === 0) return 0;
    const total = this.scores.reduce((s, x) => s + x, 0);
    return total / this.scores.length;
  }

  getPositivePercent(): number {
    if (this.scores.length === 0) return 0;
    const positive = this.scores.filter((s) => s >= 4).length;
    return (positive / this.scores.length) * 100;
  }

  reset(): void {
    this.scores.length = 0;
  }
}
