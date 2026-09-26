export class ApprovalResponseDto {
  id!: string;
  vendorId!: string;
  status!: string;
  reason!: string | null;
  reviewedBy!: string | null;
  reviewedAt!: string | null;
}
