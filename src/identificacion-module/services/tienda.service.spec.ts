import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTiendaDto, QueryTiendaDto, UpdateTiendaDto } from '../dtos';
import { TiendaRepository } from '../repositories';
import { EstadoCaptacion } from '../repositories/entities';
import { TiendaService } from './tienda.service';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: jest.Mocked<TiendaRepository>;

  const baseEntity = {
    id: 'tienda-1',
    codigoInterno: 'TDA-001',
    nombreComercial: 'Tienda Don José',
    responsableNombre: 'José Pérez',
    paisId: 'pais-1',
    rut: '900123456-7',
    direccion: 'Calle 10 # 20-30',
    telefono: '3001234567',
    estadoCaptacion: EstadoCaptacion.PROSPECTO_CREADO,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TiendaService,
        {
          provide: TiendaRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get(TiendaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create tienda', async () => {
      const dto: CreateTiendaDto = {
        codigoInterno: 'TDA-001',
        nombreComercial: 'Tienda Don José',
        responsableNombre: 'José Pérez',
        paisId: 'pais-1',
        rut: '900123456-7',
        direccion: 'Calle 10 # 20-30',
        telefono: '3001234567',
      };

      repository.create.mockResolvedValue(baseEntity as any);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(result.id).toBe('tienda-1');
      expect(result.estadoCaptacion).toBe(EstadoCaptacion.PROSPECTO_CREADO);
    });
  });

  describe('findAll', () => {
    it('should return mapped tiendas', async () => {
      const query: QueryTiendaDto = { paisId: 'pais-1' };

      repository.findAll.mockResolvedValue([baseEntity] as any);

      const result = await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(query);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('tienda-1');
    });
  });

  describe('findById', () => {
    it('should return tienda when found', async () => {
      repository.findById.mockResolvedValue(baseEntity as any);

      const result = await service.findById('tienda-1');

      expect(repository.findById).toHaveBeenCalledWith('tienda-1');
      expect(result.id).toBe('tienda-1');
    });

    it('should throw NotFoundException when tienda not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return tienda', async () => {
      const dto: UpdateTiendaDto = { telefono: '3009876543' };
      const updatedEntity = { ...baseEntity, telefono: '3009876543' };

      repository.findById.mockResolvedValue(baseEntity as any);
      repository.update.mockResolvedValue(updatedEntity as any);

      const result = await service.update('tienda-1', dto);

      expect(repository.update).toHaveBeenCalledWith('tienda-1', dto);
      expect(result.telefono).toBe('3009876543');
    });

    it('should throw NotFoundException when tienda not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update('non-existent', {})).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete tienda', async () => {
      repository.findById.mockResolvedValue(baseEntity as any);
      repository.delete.mockResolvedValue(true);

      await service.delete('tienda-1');

      expect(repository.delete).toHaveBeenCalledWith('tienda-1');
    });

    it('should throw NotFoundException when tienda not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('non-existent')).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
