export class SettlementResponseDto {
  id!: string;
  vendorId!: string;
  status!: string;
  totalAmount!: number;
  commissionAmount!: number;
  netAmount!: number;
  currency!: string;
  periodStart!: string;
  periodEnd!: string;
  settledAt!: string | null;
}
