/**
 * ProductInventory Sagas Barrel
 * @module product-service/modules/product-inventory/sagas
 */
import { InventoryAlertSaga } from '../../../application/sagas/inventory-alert.saga.js';

export const INVENTORY_SAGAS = [InventoryAlertSaga] as const;

export { InventoryAlertSaga };
