export class PayoutResponseDto {
  id!: string;
  vendorId!: string;
  bankAccountId!: string;
  amount!: number;
  currency!: string;
  status!: string;
  requestedAt!: string;
  processedAt!: string | null;
  failureReason!: string | null;
}
