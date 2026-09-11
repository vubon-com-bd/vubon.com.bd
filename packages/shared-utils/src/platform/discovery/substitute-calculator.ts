export interface SubstituteData {
  substituteId: string;
  productId: string;
  product: { id: string };
  type: string;
  substituteProducts: string[];
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export interface SubstituteProductInput {
  id: string;
  categoryId?: string;
}

export const calculateSubstitutes = (
  productId: string,
  categoryId: string,
  products: SubstituteProductInput[]
): SubstituteData => {
  const substitutes = products
    .filter((p) => p.categoryId === categoryId && p.id !== productId)
    .map((p) => p.id);
  return {
    substituteId: crypto.randomUUID(),
    productId,
    product: { id: productId },
    type: 'similar',
    substituteProducts: substitutes,
    score: 0.5,
    isActive: true,
    metadata: {},
  };
};
