export class VerificationResponseDto {
  id!: string;
  vendorId!: string;
  status!: string;
  submittedAt!: string | null;
  verifiedAt!: string | null;
  documentCount!: number;
}
