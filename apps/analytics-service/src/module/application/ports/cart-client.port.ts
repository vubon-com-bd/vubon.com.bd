export interface CartClient {
  getSummary(cartId: string): Promise<{
    readonly cartId: string;
    readonly userId: string;
    readonly itemCount: number;
    readonly abandoned: boolean;
  } | null>;
}
