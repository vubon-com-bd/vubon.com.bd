import { SetMetadata } from '@nestjs/common';

export const WAREHOUSE_ACTIVE_KEY = 'warehouseActive';
export const RequireWarehouseActive = (): MethodDecorator =>
  SetMetadata(WAREHOUSE_ACTIVE_KEY, true);
