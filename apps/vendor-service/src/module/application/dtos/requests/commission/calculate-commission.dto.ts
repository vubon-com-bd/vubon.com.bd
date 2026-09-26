export class CalculateCommissionRequestDto {
  vendorId!: string;
  orderId!: string;
  orderAmount!: number;
  currency!: string;
}
