export class TierResponseDto {
  vendorId!: string;
  currentTier!: string;
  score!: number;
  nextTier!: string | null;
  requirementsMet!: boolean;
}
