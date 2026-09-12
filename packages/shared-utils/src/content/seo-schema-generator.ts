export const generateArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  datePublished: Date;
  dateModified: Date;
}): Record<string, unknown> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.datePublished.toISOString(),
    dateModified: article.dateModified.toISOString(),
  };
};

export const generateProductSchema = (product: {
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
}): Record<string, unknown> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
    },
  };
};
