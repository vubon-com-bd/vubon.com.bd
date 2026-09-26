export class ProcessPayoutRequestDto {
  payoutId!: string;
  status!: string;
  transactionRef?: string;
  failureReason?: string;
}
