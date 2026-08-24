import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QueryTiendaDto } from '../dtos';
import { Tienda } from './entities';

@Injectable()
export class TiendaRepository {
  constructor(
    @Inject('TIENDA_REPOSITORY')
    private repository: Repository<Tienda>,
  ) {}

  async create(tienda: Partial<Tienda>): Promise<Tienda> {
    // TODO: implementar
    throw new Error('Not implemented');
  }

  async findAll(query: QueryTiendaDto): Promise<Tienda[]> {
    // TODO: implementar
    throw new Error('Not implemented');
  }

  async findById(id: string): Promise<Tienda | null> {
    // TODO: implementar
    throw new Error('Not implemented');
  }

  async update(id: string, updates: Partial<Tienda>): Promise<Tienda | null> {
    // TODO: implementar
    throw new Error('Not implemented');
  }

  async delete(id: string): Promise<boolean> {
    // TODO: implementar
    throw new Error('Not implemented');
  }
}
