export const formatShipmentDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-GB');
};

export const formatShipmentPrice = (amount: number, currency = 'BDT'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export interface ShipmentFormatData {
  shipmentNumber: string;
  status: string;
  estimatedDeliveryDate: Date;
  totalCost?: { amount: number };
}

export const formatShipmentSummary = (shipment: ShipmentFormatData): string => {
  return `#${shipment.shipmentNumber} | ${shipment.status} | ${formatShipmentDate(shipment.estimatedDeliveryDate)}`;
};

export const formatShipmentStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatShipmentCost = (shipment: ShipmentFormatData): string => {
  return formatShipmentPrice(shipment.totalCost?.amount || 0);
};
