export interface LogisticsFormatData {
  totalShipments: number;
  totalDeliveries: number;
  totalWarehouses: number;
}

export const formatLogisticsSummary = (logistics: LogisticsFormatData): string => {
  return `Shipments: ${logistics.totalShipments} | Deliveries: ${logistics.totalDeliveries} | Warehouses: ${logistics.totalWarehouses}`;
};

export const formatLogisticsStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};
