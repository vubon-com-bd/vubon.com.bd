export interface ContentSort {
  field: string;
  order: 'asc' | 'desc';
}

export class ContentSortBuilder {
  private sorts: ContentSort[] = [];

  byDate(): this {
    this.sorts.push({ field: 'createdAt', order: 'desc' });
    return this;
  }

  byTitle(): this {
    this.sorts.push({ field: 'title', order: 'asc' });
    return this;
  }

  byViews(): this {
    this.sorts.push({ field: 'viewCount', order: 'desc' });
    return this;
  }

  byLikes(): this {
    this.sorts.push({ field: 'likeCount', order: 'desc' });
    return this;
  }

  byShares(): this {
    this.sorts.push({ field: 'shareCount', order: 'desc' });
    return this;
  }

  byComments(): this {
    this.sorts.push({ field: 'commentCount', order: 'desc' });
    return this;
  }

  byPopularity(): this {
    this.sorts.push({ field: 'viewCount', order: 'desc' });
    this.sorts.push({ field: 'likeCount', order: 'desc' });
    return this;
  }

  build(): ContentSort[] {
    return this.sorts;
  }
}
