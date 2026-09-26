export interface Warehouse {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly address: string;
  readonly city: string;
  readonly country: string;
  readonly capacity?: number;
  readonly active: boolean;
}

export interface WarehouseListResponse {
  readonly warehouses: readonly Warehouse[];
  readonly total: number;
}
