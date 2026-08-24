import { Test, TestingModule } from '@nestjs/testing';
import { CreateTiendaDto, QueryTiendaDto, UpdateTiendaDto } from '../dtos';
import { EstadoCaptacion } from '../repositories/entities';
import { TiendaService } from '../services';
import { TiendaController } from './tienda.controller';

describe('TiendaController', () => {
  let controller: TiendaController;
  let service: jest.Mocked<TiendaService>;

  const baseResponse = {
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
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiendaController],
      providers: [
        {
          provide: TiendaService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TiendaController>(TiendaController);
    service = module.get(TiendaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with dto', async () => {
      const dto: CreateTiendaDto = {
        codigoInterno: 'TDA-001',
        nombreComercial: 'Tienda Don José',
        responsableNombre: 'José Pérez',
        paisId: 'pais-1',
        rut: '900123456-7',
        direccion: 'Calle 10 # 20-30',
        telefono: '3001234567',
      };

      service.create.mockResolvedValue(baseResponse);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(baseResponse);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with query', async () => {
      const query: QueryTiendaDto = { paisId: 'pais-1' };
      const response = [baseResponse];

      service.findAll.mockResolvedValue(response);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(response);
    });
  });

  describe('findById', () => {
    it('should call service.findById with id', async () => {
      service.findById.mockResolvedValue(baseResponse);

      const result = await controller.findById('tienda-1');

      expect(service.findById).toHaveBeenCalledWith('tienda-1');
      expect(result).toEqual(baseResponse);
    });
  });

  describe('update', () => {
    it('should call service.update with id and dto', async () => {
      const dto: UpdateTiendaDto = { telefono: '3009876543' };
      const response = { ...baseResponse, telefono: '3009876543' };

      service.update.mockResolvedValue(response);

      const result = await controller.update('tienda-1', dto);

      expect(service.update).toHaveBeenCalledWith('tienda-1', dto);
      expect(result).toEqual(response);
    });
  });

  describe('delete', () => {
    it('should call service.delete with id', async () => {
      service.delete.mockResolvedValue(undefined);

      await controller.delete('tienda-1');

      expect(service.delete).toHaveBeenCalledWith('tienda-1');
    });
  });
});
