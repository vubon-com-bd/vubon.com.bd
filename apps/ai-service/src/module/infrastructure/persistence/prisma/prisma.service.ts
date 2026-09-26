import { Injectable } from '@nestjs/common';
import { PrismaService as KernelPrismaService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class PrismaService extends KernelPrismaService {}
