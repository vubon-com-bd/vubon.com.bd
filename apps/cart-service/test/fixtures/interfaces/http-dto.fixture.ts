/**
 * HTTP DTO Fixtures
 * @module test/fixtures/interfaces
 */
import {
  CreateCartHttpDTO,
  UpdateCartHttpDTO,
  ClearCartHttpDTO,
  ListCartsHttpQueryDTO,
} from '../../../src/module/interfaces/dtos/requests/cart.request.dto.js';
import {
  AddItemHttpDTO,
  UpdateItemHttpDTO,
  UpdateQuantityHttpDTO,
  SelectItemsHttpDTO,
} from '../../../src/module/interfaces/dtos/requests/cart-item.request.dto.js';
import {
  ApplyCouponHttpDTO,
  ValidateCouponHttpDTO,
} from '../../../src/module/interfaces/dtos/requests/coupon.request.dto.js';

export const CART_ID = '11111111-1111-1111-1111-111111111111';
export const ITEM_ID = '22222222-2222-2222-2222-222222222222';
export const USER_ID = '33333333-3333-3333-3333-333333333333';
export const PRODUCT_ID = '44444444-4444-4444-4444-444444444444';
export const VARIANT_ID = '55555555-5555-5555-5555-555555555555';

export const makeCreateCartDto = (
  overrides: Partial<CreateCartHttpDTO> = {},
): CreateCartHttpDTO => {
  const dto = new CreateCartHttpDTO();
  Object.assign(dto, {
    type: 'user',
    currency: 'BDT',
    ...overrides,
  });
  return dto;
};

export const makeUpdateCartDto = (
  overrides: Partial<UpdateCartHttpDTO> = {},
): UpdateCartHttpDTO => {
  const dto = new UpdateCartHttpDTO();
  Object.assign(dto, { notes: 'Updated notes', ...overrides });
  return dto;
};

export const makeClearCartDto = (): ClearCartHttpDTO => {
  const dto = new ClearCartHttpDTO();
  Object.assign(dto, { reason: 'User requested' });
  return dto;
};

export const makeListCartsQuery = (
  overrides: Partial<ListCartsHttpQueryDTO> = {},
): ListCartsHttpQueryDTO => {
  const dto = new ListCartsHttpQueryDTO();
  Object.assign(dto, { page: 1, limit: 20, ...overrides });
  return dto;
};

export const makeAddItemDto = (
  overrides: Partial<AddItemHttpDTO> = {},
): AddItemHttpDTO => {
  const dto = new AddItemHttpDTO();
  Object.assign(dto, {
    productId: PRODUCT_ID,
    variantId: VARIANT_ID,
    quantity: 2,
    ...overrides,
  });
  return dto;
};

export const makeUpdateItemDto = (): UpdateItemHttpDTO => {
  const dto = new UpdateItemHttpDTO();
  Object.assign(dto, { quantity: 3 });
  return dto;
};

export const makeUpdateQuantityDto = (): UpdateQuantityHttpDTO => {
  const dto = new UpdateQuantityHttpDTO();
  Object.assign(dto, { quantity: 5 });
  return dto;
};

export const makeSelectItemsDto = (): SelectItemsHttpDTO => {
  const dto = new SelectItemsHttpDTO();
  Object.assign(dto, { itemIds: [ITEM_ID], selected: true });
  return dto;
};

export const makeApplyCouponDto = (): ApplyCouponHttpDTO => {
  const dto = new ApplyCouponHttpDTO();
  Object.assign(dto, { code: 'SAVE10' });
  return dto;
};

export const makeValidateCouponDto = (): ValidateCouponHttpDTO => {
  const dto = new ValidateCouponHttpDTO();
  Object.assign(dto, { code: 'SAVE10' });
  return dto;
};
