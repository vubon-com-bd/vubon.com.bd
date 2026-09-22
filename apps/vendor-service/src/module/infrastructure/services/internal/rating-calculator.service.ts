import { Injectable } from '@nestjs/common';

@Injectable()
export class RatingCalculatorService {
  average(ratings: readonly number[]): number {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r, 0);
    return Math.round((total / ratings.length) * 100) / 100;
  }

  distribution(ratings: readonly number[]): Record<number, number> {
    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of ratings) {
      const star = Math.round(r);
      if (star >= 1 && star <= 5) dist[star] += 1;
    }
    return dist;
  }
}
