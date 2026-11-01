/**
 * NotificationPrismaService — thin wrapper over Kernel PrismaService
 * @module notification-service/infrastructure/persistence/prisma
 *
 * Kernel PrismaService extends PrismaClient, so all model delegates
 * (prisma.notification, prisma.notificationTemplate, etc.) are available directly.
 *
 * Adds:
 *  - Convenience health-check (delegates to kernel)
 *  - isEngineAvailable() passthrough
 */
import { Injectable } from '@nestjs/common';
import { PrismaService as KernelPrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

@Injectable()
export class NotificationPrismaService extends KernelPrismaService {}

export { KernelPrismaService };
