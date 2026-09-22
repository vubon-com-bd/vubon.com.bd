export class BankAccountResponseDto {
  id!: string;
  vendorId!: string;
  maskedAccountNumber!: string;
  bankName!: string;
  accountHolderName!: string;
  branchName!: string | null;
  isDefault!: boolean;
}
