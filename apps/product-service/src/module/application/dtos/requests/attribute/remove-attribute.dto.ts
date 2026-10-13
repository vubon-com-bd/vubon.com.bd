/**
 * Remove Attribute Request DTO
 * @module product-service/application/dtos/requests/attribute
 */
export interface RemoveAttributeRequestDTO {
  readonly attributeId: string;
  readonly productId: string;
  readonly reason?: string;
  readonly actorId?: string;
}
