export interface SEOSchemaData {
  schemaId: string;
  seoId: string;
  type: string;
  properties: Record<string, unknown>;
  isActive: boolean;
  version: string;
  metadata: Record<string, unknown>;
}

export interface SEOProductSchemaInput {
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
}

export interface SEOArticleSchemaInput {
  headline: string;
  description: string;
  author: string;
  datePublished: Date;
  dateModified: Date;
}

export const generateSEOProductSchema = (product: SEOProductSchemaInput): SEOSchemaData => {
  return {
    schemaId: crypto.randomUUID(),
    seoId: '',
    type: 'product',
    properties: {
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
    },
    isActive: true,
    version: '1.0',
    metadata: {},
  };
};

export const generateSEOArticleSchema = (article: SEOArticleSchemaInput): SEOSchemaData => {
  return {
    schemaId: crypto.randomUUID(),
    seoId: '',
    type: 'article',
    properties: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      datePublished: article.datePublished.toISOString(),
      dateModified: article.dateModified.toISOString(),
    },
    isActive: true,
    version: '1.0',
    metadata: {},
  };
};
