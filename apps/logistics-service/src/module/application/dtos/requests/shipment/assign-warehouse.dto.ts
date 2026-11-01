/**
 * AssignWarehouseRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface AssignWarehouseRequestDTO {
  readonly shipmentId: string;
  readonly warehouseId: string;
}

export interface AssignWarehouseContextDTO {
  readonly request: AssignWarehouseRequestDTO;
  readonly actorId: string;
}
