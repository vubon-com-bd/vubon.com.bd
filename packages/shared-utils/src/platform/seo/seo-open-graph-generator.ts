export interface SEOOpenGraphData {
  openGraphId: string;
  seoId: string;
  type: string;
  title: string;
  description: string;
  url: string;
  image: string;
  siteName: string;
  locale: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export const generateSEOOpenGraphTags = (data: {
  title: string;
  description: string;
  url: string;
  image: string;
  type: string;
  siteName: string;
}): SEOOpenGraphData => {
  return {
    openGraphId: crypto.randomUUID(),
    seoId: '',
    type: data.type,
    title: data.title,
    description: data.description,
    url: data.url,
    image: data.image,
    siteName: data.siteName,
    locale: 'en_BD',
    isActive: true,
    metadata: {},
  };
};
