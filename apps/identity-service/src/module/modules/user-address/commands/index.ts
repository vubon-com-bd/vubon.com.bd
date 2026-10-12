import {
  AddAddressHandler,
  UpdateAddressHandler,
  DeleteAddressHandler,
  SetDefaultAddressHandler,
} from '../../../application/commands/index.js';

export const USER_ADDRESS_COMMAND_HANDLERS = [
  AddAddressHandler,
  UpdateAddressHandler,
  DeleteAddressHandler,
  SetDefaultAddressHandler,
] as const;
