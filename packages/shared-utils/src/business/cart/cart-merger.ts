export interface MergeableCartItem {
  productId: string;
  variantId?: string;
  quantity: { value: number };
}

export interface MergeableCart {
  updatedAt: Date;
  items: MergeableCartItem[];
}

export const mergeCartItems = (
  items1: MergeableCartItem[],
  items2: MergeableCartItem[]
): MergeableCartItem[] => {
  const allItems = [...items1, ...items2];
  return allItems.reduce((acc, item) => {
    const existing = acc.find(
      (i) => i.productId === item.productId && i.variantId === item.variantId
    );
    if (existing) {
      existing.quantity.value += item.quantity.value;
    } else {
      acc.push({ ...item, quantity: { value: item.quantity.value } });
    }
    return acc;
  }, [] as MergeableCartItem[]);
};

export const mergeCarts = <T extends MergeableCart>(
  source: T,
  target: T,
  strategy: 'keep_latest' | 'keep_oldest' | 'merge_all'
): T => {
  if (strategy === 'keep_latest') {
    return new Date(source.updatedAt) > new Date(target.updatedAt) ? source : target;
  }
  if (strategy === 'keep_oldest') {
    return new Date(source.updatedAt) < new Date(target.updatedAt) ? source : target;
  }
  const mergedItems = mergeCartItems(source.items, target.items);
  return { ...source, items: mergedItems };
};
