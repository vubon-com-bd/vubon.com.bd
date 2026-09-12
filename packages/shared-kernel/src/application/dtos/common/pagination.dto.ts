import { BaseDTO } from './common.dto';

export class PaginationDTO extends BaseDTO {
  page: number = 1;
  limit: number = 10;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;

  constructor(data?: Partial<PaginationDTO>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  validate(): void {
    this.validatePositiveNumber(this.page, 'Page');
    this.validatePositiveNumber(this.limit, 'Limit');
    if (this.limit > 100) {
      throw new Error('Limit cannot exceed 100');
    }
    if (this.sortOrder && !['asc', 'desc'].includes(this.sortOrder)) {
      throw new Error('Sort order must be either asc or desc');
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      page: this.page,
      limit: this.limit,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      search: this.search,
    };
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  get take(): number {
    return this.limit;
  }
}
