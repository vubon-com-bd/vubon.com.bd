/**
 * UserAddressResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface UserAddressResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly label: string;
  readonly line1: string;
  readonly line2?: string;
  readonly division: string;
  readonly district: string;
  readonly upazila: string;
  readonly postalCode: string;
  readonly isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
