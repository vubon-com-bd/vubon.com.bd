/**
 * Address Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface AddressResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly label?: string;
  readonly fullName: string;
  readonly phone: string;
  readonly addressLine1: string;
  readonly addressLine2?: string;
  readonly city: string;
  readonly division: string;
  readonly district: string;
  readonly postalCode: string;
  readonly country: string;
  readonly isDefault: boolean;
  readonly isDefaultShipping: boolean;
  readonly isDefaultBilling: boolean;
  readonly isVerified: boolean;
  readonly createdAt: string;
}
