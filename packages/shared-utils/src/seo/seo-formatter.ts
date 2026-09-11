export interface SEOFormatData {
  contentId: string;
  score?: { value: number };
  isIndexed: boolean;
}

export const formatSEOSummary = (seo: SEOFormatData): string => {
  return `Content: ${seo.contentId} | Score: ${seo.score?.value || 0} | Indexed: ${seo.isIndexed}`;
};

export const formatSEOStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatSEOScore = (score: number): string => {
  return `${score.toFixed(1)}/100`;
};

export const formatRankingPosition = (position: number): string => {
  if (position === 0) return 'Not ranked';
  return `#${position}`;
};
