import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetInventoryLocationByBarcodeQuery extends BaseQuery {
  readonly type = 'logistics.inventory_location.by_barcode';
  constructor(public readonly barcode: string) { super(); }
}
