/**
 * UserService PrismaService
 * @module user-service/infrastructure/persistence/prisma
 *
 * Extends shared-kernel PrismaService — the same client but we add
 * user-service-specific health signals if needed later.
 */
import { Injectable } from '@nestjs/common';
import { PrismaService as KernelPrismaService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class PrismaService extends KernelPrismaService {}
