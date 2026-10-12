import {
  ListUserAddressesHandler,
  GetUserAddressHandler,
  ListAddressesQueryHandler,
} from '../../../application/queries/index.js';

export const USER_ADDRESS_QUERY_HANDLERS = [
  ListUserAddressesHandler,
  GetUserAddressHandler,
  ListAddressesQueryHandler,
] as const;
