import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { QueryTiendaDto } from '../dtos';
import { EstadoCaptacion, Tienda } from './entities';
import { TiendaRepository } from './tienda.repository';

describe('TiendaRepository', () => {
  let repository: TiendaRepository;
  let typeormRepo: jest.Mocked<Repository<Tienda>>;

  beforeEach(async () => {
    const mockTypeormRepo = {
      create: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TiendaRepository,
        {
          provide: 'TIENDA_REPOSITORY',
          useValue: mockTypeormRepo,
        },
      ],
    }).compile();

    repository = module.get<TiendaRepository>(TiendaRepository);
    typeormRepo = module.get('TIENDA_REPOSITORY');
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create and save tienda', async () => {
      const tiendaData = {
        codigoInterno: 'TDA-001',
        nombreComercial: 'Tienda Don José',
        responsableNombre: 'José Pérez',
        paisId: 'pais-1',
        rut: '900123456-7',
        direccion: 'Calle 10 # 20-30',
        telefono: '3001234567',
      };
      const createdTienda = { id: 'tienda-1', ...tiendaData };
      const savedTienda = {
        ...createdTienda,
        estadoCaptacion: EstadoCaptacion.PROSPECTO_CREADO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      typeormRepo.create.mockReturnValue(createdTienda as any);
      typeormRepo.save.mockResolvedValue(savedTienda as any);

      const result = await repository.create(tiendaData);

      expect(typeormRepo.create).toHaveBeenCalledWith(tiendaData);
      expect(typeormRepo.save).toHaveBeenCalledWith(createdTienda);
      expect(result).toEqual(savedTienda);
    });
  });

  describe('findAll', () => {
    it('should filter by paisId when provided', async () => {
      const query: QueryTiendaDto = { paisId: 'pais-1' };
      const queryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };

      typeormRepo.createQueryBuilder.mockReturnValue(queryBuilder as any);

      const result = await repository.findAll(query);

      expect(typeormRepo.createQueryBuilder).toHaveBeenCalledWith('tienda');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'tienda.paisId = :paisId',
        { paisId: 'pais-1' },
      );
      expect(result).toEqual([]);
    });

    it('should filter by estadoCaptacion when provided', async () => {
      const query: QueryTiendaDto = {
        estadoCaptacion: EstadoCaptacion.HABILITADO_BASICO,
      };
      const queryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };

      typeormRepo.createQueryBuilder.mockReturnValue(queryBuilder as any);

      await repository.findAll(query);

      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'tienda.estadoCaptacion = :estadoCaptacion',
        { estadoCaptacion: EstadoCaptacion.HABILITADO_BASICO },
      );
    });

    it('should not filter when query is empty', async () => {
      const queryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };

      typeormRepo.createQueryBuilder.mockReturnValue(queryBuilder as any);

      await repository.findAll({});

      expect(queryBuilder.andWhere).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return tienda when found', async () => {
      const tienda = {
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

      typeormRepo.findOne.mockResolvedValue(tienda as any);

      const result = await repository.findById('tienda-1');

      expect(typeormRepo.findOne).toHaveBeenCalledWith({
        where: { id: 'tienda-1' },
      });
      expect(result).toEqual(tienda);
    });

    it('should return null when tienda not found', async () => {
      typeormRepo.findOne.mockResolvedValue(null);

      const result = await repository.findById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update and return updated tienda', async () => {
      const updates = { telefono: '3009876543' };
      const updatedTienda = {
        id: 'tienda-1',
        codigoInterno: 'TDA-001',
        nombreComercial: 'Tienda Don José',
        responsableNombre: 'José Pérez',
        paisId: 'pais-1',
        rut: '900123456-7',
        direccion: 'Calle 10 # 20-30',
        telefono: '3009876543',
        estadoCaptacion: EstadoCaptacion.PROSPECTO_CREADO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      typeormRepo.update.mockResolvedValue({ affected: 1 } as any);
      typeormRepo.findOne.mockResolvedValue(updatedTienda as any);

      const result = await repository.update('tienda-1', updates);

      expect(typeormRepo.update).toHaveBeenCalledWith('tienda-1', updates);
      expect(typeormRepo.findOne).toHaveBeenCalledWith({
        where: { id: 'tienda-1' },
      });
      expect(result).toEqual(updatedTienda);
    });
  });

  describe('delete', () => {
    it('should delete tienda and return true', async () => {
      typeormRepo.delete.mockResolvedValue({ affected: 1 } as any);

      const result = await repository.delete('tienda-1');

      expect(typeormRepo.delete).toHaveBeenCalledWith('tienda-1');
      expect(result).toBe(true);
    });

    it('should return false when tienda not found', async () => {
      typeormRepo.delete.mockResolvedValue({ affected: 0 } as any);

      const result = await repository.delete('non-existent');

      expect(result).toBe(false);
    });
  });
});
