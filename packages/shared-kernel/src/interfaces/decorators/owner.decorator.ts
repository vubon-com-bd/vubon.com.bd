import { SetMetadata } from '@nestjs/common';

export const OWNER_KEY = 'owner';
export const Owner = (paramField: string = 'id', userIdField: string = 'id') =>
  SetMetadata(OWNER_KEY, { paramField, userIdField });
