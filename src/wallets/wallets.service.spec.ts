import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from './wallets.service';
import { getModelToken } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import { WalletAsset } from './entities/wallet-assets.entity';

describe('WalletsService', () => {
  let service: WalletsService;
  let walletModel: any;
  let walletAssetModel: any;

  const mockWalletModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
  };

  const mockWalletAssetModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        {
          provide: getModelToken(Wallet.name),
          useValue: mockWalletModel,
        },
        {
          provide: getModelToken(WalletAsset.name),
          useValue: mockWalletAssetModel,
        },
      ],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
    walletModel = module.get(getModelToken(Wallet.name));
    walletAssetModel = module.get(getModelToken(WalletAsset.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a wallet', async () => {
      const createWalletDto = {}; // Você pode adicionar dados de teste aqui
      await service.create(createWalletDto);
      expect(walletModel.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should find all wallets', async () => {
      await service.findAll();
      expect(walletModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find a wallet by id', async () => {
      const id = '123';
      await service.findOne(id);
      expect(walletModel.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('createWalletAsset', () => {
    it('should create a wallet asset', async () => {
      const data = { wallet: '123', asset: '456', shares: 10 };
      await service.createWalletAsset(data);
      expect(walletAssetModel.create).toHaveBeenCalledWith(data);
    });
  });

  // Adicione mais testes para cenários de erro e casos de uso específicos
});