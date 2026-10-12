import {
  AddContactHandler,
  UpdateContactHandler,
  DeleteContactHandler,
  VerifyContactHandler,
} from '../../../application/commands/index.js';

export const USER_CONTACT_COMMAND_HANDLERS = [
  AddContactHandler,
  UpdateContactHandler,
  DeleteContactHandler,
  VerifyContactHandler,
] as const;
