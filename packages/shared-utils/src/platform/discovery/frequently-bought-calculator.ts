export interface FrequentlyBoughtData {
  frequentlyBoughtId: string;
  productId: string;
  product: { id: string };
  type: string;
  association: string[];
  support: number;
  confidence: number;
  lift: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export const calculateFrequentlyBought = (
  orders: { productId: string }[][]
): FrequentlyBoughtData[] => {
  const associations: Record<string, Record<string, number>> = {};

  for (const order of orders) {
    for (let i = 0; i < order.length; i++) {
      for (let j = i + 1; j < order.length; j++) {
        const key = `${order[i].productId}-${order[j].productId}`;
        if (!associations[key]) associations[key] = {};
        associations[key][order[j].productId] = (associations[key][order[j].productId] || 0) + 1;
      }
    }
  }

  return Object.entries(associations).map(([key, value]) => ({
    frequentlyBoughtId: crypto.randomUUID(),
    productId: key.split('-')[0],
    product: { id: key.split('-')[0] },
    type: 'together',
    association: Object.keys(value),
    support: Object.values(value).reduce((a, b) => a + b, 0) / orders.length,
    confidence: 0.5,
    lift: 0.5,
    isActive: true,
    metadata: {},
  }));
};
