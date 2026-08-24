import { Injectable } from '@nestjs/common';
import {
  CreateTiendaDto,
  QueryTiendaDto,
  TiendaResponseDto,
  UpdateTiendaDto,
} from '../dtos';
import { TiendaRepository } from '../repositories';
import { Tienda } from '../repositories/entities';

@Injectable()
export class TiendaService {
  constructor(private readonly tiendaRepository: TiendaRepository) {}

  async create(dto: CreateTiendaDto): Promise<TiendaResponseDto> {
    // TODO: implementar
    throw new Error('Not implemented');
  }

  async findAll(query: QueryTiendaDto): Promise<TiendaResponseDto[]> {
    // TODO: implementar
    throw new Error('Not implemented');
  }

  async findById(id: string): Promise<TiendaResponseDto> {
    // TODO: implementar
    throw new Error('Not implemented');
  }

  async update(id: string, dto: UpdateTiendaDto): Promise<TiendaResponseDto> {
    // TODO: implementar
    throw new Error('Not implemented');
  }

  async delete(id: string): Promise<void> {
    // TODO: implementar
    throw new Error('Not implemented');
  }

  private mapToResponse(tienda: Tienda): TiendaResponseDto {
    // TODO: implementar
    throw new Error('Not implemented');
  }
}
