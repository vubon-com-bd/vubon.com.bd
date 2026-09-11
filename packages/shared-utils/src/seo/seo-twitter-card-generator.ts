export interface SEOTwitterCardData {
  twitterCardId: string;
  seoId: string;
  type: string;
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
  creator: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export interface SEOTwitterCardInput {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
  creator?: string;
}

export const generateSEOTwitterCardTags = (data: SEOTwitterCardInput): SEOTwitterCardData => {
  return {
    twitterCardId: crypto.randomUUID(),
    seoId: '',
    type: data.card,
    card: data.card,
    site: data.site,
    title: data.title,
    description: data.description,
    image: data.image,
    creator: data.creator || data.site,
    isActive: true,
    metadata: {},
  };
};
