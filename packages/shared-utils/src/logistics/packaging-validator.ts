import { PACKAGING } from '@vubon/shared-constants/src/logistics/packaging.constants';

export interface PackagingInput {
  type: string;
  material: string;
  weight: number;
}

export const validatePackaging = (
  packaging: Partial<PackagingInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!packaging.type) errors.push('Packaging type is required');
  if (packaging.type && !Object.keys(PACKAGING.TYPES).includes(packaging.type)) {
    errors.push('Invalid packaging type');
  }
  if (
    packaging.material &&
    !Object.keys(PACKAGING.PACKAGING_MATERIALS).includes(packaging.material)
  ) {
    errors.push('Invalid packaging material');
  }
  if (packaging.weight !== undefined && packaging.weight < 0) {
    errors.push('Weight cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};
