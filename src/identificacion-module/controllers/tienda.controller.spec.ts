import { Test, TestingModule } from '@nestjs/testing';
import { TiendaService } from '../services';
import { TiendaController } from './tienda.controller';

describe('TiendaController', () => {
  let controller: TiendaController;
  let service: jest.Mocked<TiendaService>;

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

  // TODO: describe('create', ...)
  // TODO: describe('findAll', ...)
  // TODO: describe('findById', ...)
  // TODO: describe('update', ...)
  // TODO: describe('delete', ...)
});
