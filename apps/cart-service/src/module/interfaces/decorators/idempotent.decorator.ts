import { SetMetadata } from '@nestjs/common';

export const IDEMPOTENT_META_KEY = 'idempotent';
export const Idempotent = (): MethodDecorator => SetMetadata(IDEMPOTENT_META_KEY, true);
