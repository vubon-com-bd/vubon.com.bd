export class AddBankAccountRequestDto {
  vendorId!: string;
  accountNumber!: string;
  bankName!: string;
  accountHolderName!: string;
  branchName?: string;
  routingNumber?: string;
  isDefault?: boolean;
}
