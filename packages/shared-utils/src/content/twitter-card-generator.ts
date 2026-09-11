export interface TwitterCardData {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
  creator?: string;
}

export const generateTwitterCardTags = (data: TwitterCardData): Record<string, string> => {
  const tags: Record<string, string> = {
    'twitter:card': data.card,
    'twitter:site': data.site,
    'twitter:title': data.title,
    'twitter:description': data.description,
    'twitter:image': data.image,
  };
  if (data.creator) {
    tags['twitter:creator'] = data.creator;
  }
  return tags;
};
