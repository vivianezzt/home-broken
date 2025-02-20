import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { CreateAssetDto } from 'src/assets/dto/create-asset.dto';

describe('WalletsController', () => {
  let controller: WalletsController;
  let service: WalletsService;

  const mockWalletsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    createWalletAsset: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [
        {
          provide: WalletsService,
          useValue: mockWalletsService,
        },
      ],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
    service = module.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call walletsService.create with the provided data', () => {
      const createAssetDto: CreateAssetDto = { /* seus dados de teste aqui */ } as CreateAssetDto;
      controller.create(createAssetDto);
      expect(service.create).toHaveBeenCalledWith(createAssetDto);
    });
  });

  describe('findAll', () => {
    it('should call walletsService.findAll', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call walletsService.findOne with the provided id', () => {
      const id = '123';
      controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('createWalletAsset', () => {
    it('should call walletsService.createWalletAsset with the provided data', () => {
      const id = '123';
      const body = { assetId: '456', shares: 10 };
      controller.createWalletAsset(id, body);
      expect(service.createWalletAsset).toHaveBeenCalledWith({
        wallet: id,
        asset: body.assetId,
        shares: body.shares,
      });
    });
  });
});