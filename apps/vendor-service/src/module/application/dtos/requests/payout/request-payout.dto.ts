export class RequestPayoutRequestDto {
  vendorId!: string;
  bankAccountId!: string;
  amount!: number;
  currency!: string;
  notes?: string;
}
