export const generateSeoTitle = (title: string, siteName: string): string => {
  const maxLength = 60;
  const fullTitle = `${title} | ${siteName}`;
  if (fullTitle.length <= maxLength) return fullTitle;
  return `${title.slice(0, maxLength - 4)}...`;
};

export const generateSeoDescription = (content: string, maxLength: number = 160): string => {
  const plainText = content.replace(/<[^>]*>/g, '').trim();
  if (plainText.length <= maxLength) return plainText;
  return `${plainText.slice(0, maxLength - 3)}...`;
};

export const generateSeoKeywords = (tags: string[]): string => {
  return tags.slice(0, 10).join(', ');
};
