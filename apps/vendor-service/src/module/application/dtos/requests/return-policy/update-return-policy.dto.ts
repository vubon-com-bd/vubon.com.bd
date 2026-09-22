export class UpdateReturnPolicyRequestDto {
  vendorId!: string;
  type!: string;
  returnWindowDays!: number;
  conditions?: string;
}
