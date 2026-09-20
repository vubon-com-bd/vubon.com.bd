import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { Auth2FaController } from '../../interfaces/controllers/rest/auth-2fa.controller';
import { Auth2FaService } from '../../application/services/impl/auth-2fa.service';
import { Auth2FaPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-2fa.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [Auth2FaController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'Auth2FaRepository', useExisting: Auth2FaPrismaRepository },
    { provide: 'Auth2FaService', useExisting: Auth2FaService },

    Auth2FaPrismaRepository,
    Auth2FaService,
  ],
  exports: [Auth2FaService, Auth2FaPrismaRepository],
})
export class Auth2FaModule {}
