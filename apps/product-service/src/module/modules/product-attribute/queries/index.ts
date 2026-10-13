/**
 * ProductAttribute Query Handlers Barrel
 * @module product-service/modules/product-attribute/queries
 */
import { GetAttributeHandler } from '../../../application/queries/attribute/get-attribute.handler.js';
import { ListAttributesByProductHandler } from '../../../application/queries/attribute/list-attributes-by-product.handler.js';
import { ListAttributesHandler } from '../../../application/queries/attribute/list-attributes.handler.js';

export const ATTRIBUTE_QUERY_HANDLERS = [
  GetAttributeHandler,
  ListAttributesByProductHandler,
  ListAttributesHandler,
] as const;

export { GetAttributeHandler, ListAttributesByProductHandler, ListAttributesHandler };
