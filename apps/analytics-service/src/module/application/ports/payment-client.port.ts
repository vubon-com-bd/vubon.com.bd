export interface PaymentClient {
  getById(paymentId: string): Promise<{
    readonly id: string;
    readonly amount: number;
    readonly status: string;
  } | null>;
}
