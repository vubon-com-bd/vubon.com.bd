/**
 * Format Rating
 * রেটিং ফরম্যাট করা
 */
export const formatRating = (rating: number, maxRating: number = 5): string => {
  if (rating < 0) rating = 0;
  if (rating > maxRating) rating = maxRating;

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = maxRating - fullStars - halfStar;

  return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
};

/**
 * Format Rating with Label
 * লেবেল সহ রেটিং ফরম্যাট করা
 */
export const formatRatingWithLabel = (
  rating: number,
  maxRating: number = 5
): { stars: string; label: string; percentage: number } => {
  const stars = formatRating(rating, maxRating);
  const percentage = (rating / maxRating) * 100;

  let label = '';
  if (percentage >= 90) label = 'Excellent';
  else if (percentage >= 70) label = 'Very Good';
  else if (percentage >= 50) label = 'Good';
  else if (percentage >= 30) label = 'Fair';
  else label = 'Poor';

  return {
    stars,
    label,
    percentage: Math.round(percentage),
  };
};

/**
 * Format Average Rating
 * গড় রেটিং ফরম্যাট করা
 */
export const formatAverageRating = (
  totalStars: number,
  totalReviews: number,
  _maxRating: number = 5
): { average: number; formatted: string; total: number } => {
  if (totalReviews === 0) {
    return {
      average: 0,
      formatted: 'No reviews',
      total: 0,
    };
  }

  const average = totalStars / totalReviews;
  const formatted = `${average.toFixed(1)} (${totalReviews} reviews)`;

  return {
    average: Math.round(average * 10) / 10,
    formatted,
    total: totalReviews,
  };
};

/**
 * Format Rating Distribution
 * রেটিং ডিস্ট্রিবিউশন ফরম্যাট করা
 */
export const formatRatingDistribution = (
  ratings: number[],
  maxRating: number = 5
): { stars: number; count: number; percentage: number }[] => {
  const total = ratings.length;
  if (total === 0) {
    return Array.from({ length: maxRating }, (_, i) => ({
      stars: i + 1,
      count: 0,
      percentage: 0,
    }));
  }

  const distribution: { [key: number]: number } = {};
  ratings.forEach((rating) => {
    const key = Math.floor(rating);
    distribution[key] = (distribution[key] || 0) + 1;
  });

  return Array.from({ length: maxRating }, (_, i) => {
    const stars = i + 1;
    const count = distribution[stars] || 0;
    return {
      stars,
      count,
      percentage: Math.round((count / total) * 100),
    };
  });
};
