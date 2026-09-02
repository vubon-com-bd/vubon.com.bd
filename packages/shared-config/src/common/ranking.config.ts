/**
 * Ranking Configuration
 * র‍্যাঙ্কিং কনফিগারেশন
 */
export interface RankingConfig {
  enabled: boolean;
  factors: {
    popularity: number;
    rating: number;
    sales: number;
    views: number;
    age: number;
    relevance: number;
  };
  weights: {
    popularity: number;
    rating: number;
    sales: number;
    views: number;
    age: number;
    relevance: number;
  };
  updateFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  algorithms: {
    base: 'linear' | 'exponential' | 'logarithmic' | 'custom';
    decay: 'linear' | 'exponential' | 'none';
  };
}

export const createRankingConfig = (): RankingConfig => ({
  enabled: true,
  factors: {
    popularity: 1,
    rating: 1,
    sales: 1,
    views: 1,
    age: 1,
    relevance: 1,
  },
  weights: {
    popularity: 30,
    rating: 25,
    sales: 20,
    views: 15,
    age: 5,
    relevance: 5,
  },
  updateFrequency: 'daily',
  algorithms: {
    base: 'linear',
    decay: 'exponential',
  },
});
