export interface UpsellingData {
  upsellingId: string;
  productId: string;
  product: { id: string };
  type: string;
  upsellProducts: string[];
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export interface UpsellingProductInput {
  id: string;
  price: number;
  categoryId?: string;
}

export const calculateUpselling = (
  productId: string,
  price: number,
  products: UpsellingProductInput[]
): UpsellingData => {
  const upsellProducts = products.filter((p) => p.price > price && p.categoryId).map((p) => p.id);
  return {
    upsellingId: crypto.randomUUID(),
    productId,
    product: { id: productId },
    type: 'premium',
    upsellProducts,
    score: 0.5,
    isActive: true,
    metadata: {},
  };
};
