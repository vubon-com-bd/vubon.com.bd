export const formatRating = (rating: number): string => {
  return `${rating.toFixed(1)} ★`;
};

export const formatRatingStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? '½' : '';
  const emptyStars = 5 - Math.ceil(rating);
  return '★'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars);
};
