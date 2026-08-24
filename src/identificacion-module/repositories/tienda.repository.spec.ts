import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Tienda } from './entities';
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

  // TODO: describe('create', ...)
  // TODO: describe('findAll', ...)
  // TODO: describe('findById', ...)
  // TODO: describe('update', ...)
  // TODO: describe('delete', ...)
});
