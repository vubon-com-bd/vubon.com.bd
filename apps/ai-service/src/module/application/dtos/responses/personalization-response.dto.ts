export interface PersonalizationProfileResponseDTO {
  readonly userId: string;
  readonly interests: readonly string[];
  readonly categories: readonly string[];
  readonly brandAffinity: Readonly<Record<string, number>>;
  readonly priceRangeMin: number | null;
  readonly priceRangeMax: number | null;
}

export interface PersonalizationResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly status: string;
  readonly confidence: number;
  readonly profile: PersonalizationProfileResponseDTO | null;
}
