export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  image: string;
  type: string;
  siteName: string;
}

export const generateOpenGraphTags = (data: OpenGraphData): Record<string, string> => {
  return {
    'og:title': data.title,
    'og:description': data.description,
    'og:url': data.url,
    'og:image': data.image,
    'og:type': data.type,
    'og:site_name': data.siteName,
  };
};
