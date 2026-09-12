export interface RecentlyViewedItem {
  viewedId: string;
  userId: string;
  productId: string;
  product: { id: string; name: string };
  type: string;
  viewedAt: Date;
  duration: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class RecentlyViewedTracker {
  private viewed: RecentlyViewedItem[] = [];

  addView(userId: string, product: { id: string; name: string }, duration: number): void {
    this.viewed.push({
      viewedId: crypto.randomUUID(),
      userId,
      productId: product.id,
      product,
      type: 'products',
      viewedAt: new Date(),
      duration,
      isActive: true,
      metadata: {},
    });
    this.cleanup();
  }

  getRecentlyViewed<T extends { id: string; name: string }>(userId: string): T[] {
    return this.viewed
      .filter((v) => v.userId === userId)
      .sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime())
      .slice(0, 50)
      .map((v) => v.product as T);
  }

  cleanup(): void {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    this.viewed = this.viewed.filter((v) => new Date(v.viewedAt) > cutoff);
  }
}
