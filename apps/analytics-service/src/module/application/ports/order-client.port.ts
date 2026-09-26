export interface OrderClient {
  getById(orderId: string): Promise<{
    readonly id: string;
    readonly userId: string;
    readonly amount: number;
    readonly status: string;
  } | null>;
}
