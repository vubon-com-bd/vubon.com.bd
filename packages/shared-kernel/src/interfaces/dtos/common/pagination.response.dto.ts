export class PaginationResponseDto<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;

  constructor(items: T[], total: number, page: number, limit: number) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
    this.hasNext = page < this.totalPages;
    this.hasPrev = page > 1;
  }

  static fromItems<T>(
    items: T[],
    total: number,
    page: number,
    limit: number
  ): PaginationResponseDto<T> {
    return new PaginationResponseDto(items, total, page, limit);
  }
}
