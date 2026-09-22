export class UpdateBankAccountRequestDto {
  accountId!: string;
  accountHolderName?: string;
  branchName?: string;
  routingNumber?: string;
}
