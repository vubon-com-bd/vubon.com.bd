import { PaginationDTO, PaginatedResponseDTO } from '../../dtos/common';

export interface IBaseService<TEntity, TCreateDTO, TUpdateDTO> {
  create(dto: TCreateDTO): Promise<TEntity>;
  update(id: string, dto: TUpdateDTO): Promise<TEntity>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<TEntity | null>;
  findAll(pagination: PaginationDTO): Promise<PaginatedResponseDTO<TEntity>>;
  exists(id: string): Promise<boolean>;
  count(): Promise<number>;
}

export interface IBaseServiceWithSoftDelete<TEntity, TCreateDTO, TUpdateDTO> extends IBaseService<
  TEntity,
  TCreateDTO,
  TUpdateDTO
> {
  softDelete(id: string): Promise<void>;
  restore(id: string): Promise<void>;
  findDeleted(): Promise<TEntity[]>;
  permanentlyDelete(id: string): Promise<void>;
}

export interface IBaseServiceWithSearch<TEntity, TCreateDTO, TUpdateDTO> extends IBaseService<
  TEntity,
  TCreateDTO,
  TUpdateDTO
> {
  search(query: string): Promise<TEntity[]>;
  searchPaginated(query: string, pagination: PaginationDTO): Promise<PaginatedResponseDTO<TEntity>>;
}
