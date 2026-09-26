export class FulfillmentAllocationService {
  static allocateByVendor(
    items: ReadonlyArray<{ vendorId: string | null; itemId: string }>,
  ): ReadonlyMap<string, readonly string[]> {
    const map = new Map<string, string[]>();
    for (const item of items) {
      const key = item.vendorId ?? 'default';
      const list = map.get(key) ?? [];
      list.push(item.itemId);
      map.set(key, list);
    }
    return map;
  }
}
