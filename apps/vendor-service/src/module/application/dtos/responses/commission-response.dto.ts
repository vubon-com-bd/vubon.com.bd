export class CommissionResponseDto {
  id!: string;
  vendorId!: string;
  orderId!: string;
  rate!: number;
  type!: string;
  orderAmount!: number;
  commissionAmount!: number;
  currency!: string;
  isSettled!: boolean;
  calculatedAt!: string;
}
