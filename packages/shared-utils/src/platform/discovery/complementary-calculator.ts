export interface ComplementaryData {
  complementaryId: string;
  productId: string;
  product: { id: string };
  type: string;
  complementaryProducts: string[];
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export interface ComplementaryProductInput {
  id: string;
  categoryId?: string;
}

export const calculateComplementary = (
  productId: string,
  categories: string[],
  products: ComplementaryProductInput[]
): ComplementaryData => {
  const complementary = products
    .filter((p) => p.categoryId && categories.includes(p.categoryId))
    .map((p) => p.id);
  return {
    complementaryId: crypto.randomUUID(),
    productId,
    product: { id: productId },
    type: 'accessory',
    complementaryProducts: complementary,
    score: 0.5,
    isActive: true,
    metadata: {},
  };
};
