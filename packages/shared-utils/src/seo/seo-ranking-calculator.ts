export const calculateRankingChange = (current: number, previous: number): number => {
  return previous - current;
};

export type RankingStatus = 'top3' | 'top10' | 'top20' | 'top50' | 'top100' | 'none';

export const getRankingStatus = (position: number): RankingStatus => {
  if (position <= 3) return 'top3';
  if (position <= 10) return 'top10';
  if (position <= 20) return 'top20';
  if (position <= 50) return 'top50';
  if (position <= 100) return 'top100';
  return 'none';
};
