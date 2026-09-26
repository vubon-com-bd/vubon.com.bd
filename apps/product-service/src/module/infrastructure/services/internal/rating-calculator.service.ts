import { Injectable } from '@nestjs/common';

@Injectable()
export class RatingCalculatorService {
  average(ratings: readonly number[]): number {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return Math.round((sum / ratings.length) * 10) / 10;
  }

  distribution(ratings: readonly number[]): Readonly<Record<number, number>> {
    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of ratings) {
      dist[r] = (dist[r] ?? 0) + 1;
    }
    return Object.freeze(dist);
  }
}
