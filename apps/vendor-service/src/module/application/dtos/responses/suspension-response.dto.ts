export class SuspensionResponseDto {
  id!: string;
  vendorId!: string;
  reason!: string;
  status!: string;
  suspendedBy!: string;
  suspendedAt!: string;
  reinstatedAt!: string | null;
}
