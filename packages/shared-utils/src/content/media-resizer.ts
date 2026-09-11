export const resizeImage = (url: string, width: number, height: number): string => {
  return `${url}?w=${width}&h=${height}&fit=cover`;
};

export const getThumbnailUrl = (url: string, size: 'small' | 'medium' | 'large'): string => {
  const sizes = { small: 100, medium: 300, large: 600 };
  return resizeImage(url, sizes[size], sizes[size]);
};
