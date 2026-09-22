export class UpdateWarrantyRequestDto {
  vendorId!: string;
  type!: string;
  durationDays!: number;
  terms?: string;
}
