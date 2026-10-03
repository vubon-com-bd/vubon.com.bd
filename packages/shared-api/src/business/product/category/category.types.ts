export interface Category {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly parentId?: string;
  readonly imageUrl?: string;
}

export interface CategoryListResponse {
  readonly categories: readonly Category[];
}
