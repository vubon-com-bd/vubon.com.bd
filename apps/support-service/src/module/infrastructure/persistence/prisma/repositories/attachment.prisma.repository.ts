/**
 * AttachmentPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { AttachmentRepository } from '../../../../domain/repositories/attachment.repository.interface';
import { AttachmentEntity } from '../../../../domain/entities/attachment.entity';
import { AttachmentIdVO } from '../../../../domain/value-objects/primitives/attachment-id.vo';
import { MessageIdVO } from '../../../../domain/value-objects/primitives/message-id.vo';
import { AttachmentMapper } from '../mappers/attachment.mapper';

@Injectable()
export class AttachmentPrismaRepository implements AttachmentRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: AttachmentMapper,
  ) {}

  async findById(id: AttachmentIdVO): Promise<AttachmentEntity | null> {
    const raw = await this.prisma.supportAttachment.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AttachmentEntity[]> {
    const rows = await this.prisma.supportAttachment.findMany();
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: AttachmentEntity): Promise<AttachmentEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.supportAttachment.upsert({
      where: { id: data.id },
      create: { ...data },
      update: { size: data.size, updatedAt: new Date() },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: AttachmentIdVO): Promise<void> {
    await this.prisma.supportAttachment.delete({ where: { id: id.value } });
  }

  async exists(id: AttachmentIdVO): Promise<boolean> {
    const count = await this.prisma.supportAttachment.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findByMessage(messageId: MessageIdVO): Promise<readonly AttachmentEntity[]> {
    const rows = await this.prisma.supportAttachment.findMany({
      where: { messageId: messageId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async countByMessage(messageId: MessageIdVO): Promise<number> {
    return this.prisma.supportAttachment.count({
      where: { messageId: messageId.value },
    });
  }
}
