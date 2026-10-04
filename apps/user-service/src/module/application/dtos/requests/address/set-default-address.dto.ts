/**
 * SetDefaultAddressRequestDTO
 */
export interface SetDefaultAddressRequestDTO {
  readonly userId: string;
  readonly addressId: string;
  readonly asShipping?: boolean;
  readonly asBilling?: boolean;
}
