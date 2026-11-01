export interface UpdateDriverRequestDTO {
  readonly driverId: string;
  readonly name?: string;
  readonly email?: string;
  readonly address?: string;
  readonly warehouseId?: string;
  readonly cashLimit?: number;
}
