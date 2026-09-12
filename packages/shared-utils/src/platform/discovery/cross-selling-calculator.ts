export interface CrossSellingData {
  crossSellingId: string;
  productId: string;
  product: { id: string };
  type: string;
  crossSellProducts: string[];
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export interface CrossSellingProductInput {
  id: string;
  categoryId?: string;
}

export const calculateCrossSelling = (
  productId: string,
  categoryId: string,
  products: CrossSellingProductInput[]
): CrossSellingData => {
  const crossSellProducts = products.filter((p) => p.categoryId !== categoryId).map((p) => p.id);
  return {
    crossSellingId: crypto.randomUUID(),
    productId,
    product: { id: productId },
    type: 'related',
    crossSellProducts,
    score: 0.5,
    isActive: true,
    metadata: {},
  };
};
