export interface LogisticsClient {
  getShipment(shipmentId: string): Promise<{
    readonly shipmentId: string;
    readonly status: string;
    readonly deliveredAt: string | null;
  } | null>;
}
